import { Button, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

import { useVettingModal } from '@/providers/vetting-modal-provider';

import '@cyntler/react-doc-viewer/dist/index.css';

export function MediaViewer() {
  const { media, setMedia } = useVettingModal();

  if (!media)
    return (
      <Text variant="Body2Semibold" textAlign="center">
        No media found
      </Text>
    );

  const uri = `/api/file?url=${encodeURIComponent(media.value)}`;

  return (
    <Stack spacing="1.75rem">
      <DocViewer
        documents={[{ uri }]}
        pluginRenderers={DocViewerRenderers}
        config={{ header: { disableHeader: true, disableFileName: true } }}
      />
      <SimpleGrid
        columns={2}
        gap="6"
        pos="sticky"
        left="0"
        right="0"
        bottom="0"
        bgColor="white"
        zIndex={3}
        pt="1rem"
        pb="2.5rem"
      >
        <Button variant="secondary" size="default" w="full" onClick={() => setMedia(null)}>
          Go back to questions
        </Button>
        <Button
          as="a"
          variant="primary"
          size="default"
          w="full"
          href={uri}
          target="_blank"
          download={media.value.split('/').pop()}
        >
          Download {media.question.type === 'FILE_UPLOAD' ? 'file' : 'image'}
        </Button>
      </SimpleGrid>
    </Stack>
  );
}
