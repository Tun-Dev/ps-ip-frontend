import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) return NextResponse.json({ error: 'File URL is required' }, { status: 400 });

  try {
    const response = await fetch(url);

    if (!response.ok) return NextResponse.json({ error: 'Network response was not ok' }, { status: 500 });

    // Get the headers from the original response
    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const contentDisposition = response.headers.get('content-disposition');

    // Create headers for our response
    const headers = new Headers();
    headers.set('content-type', contentType);

    if (contentDisposition) headers.set('content-disposition', contentDisposition);

    // Return the file directly, not as JSON
    return new NextResponse(response.body, { status: 200, headers });
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
