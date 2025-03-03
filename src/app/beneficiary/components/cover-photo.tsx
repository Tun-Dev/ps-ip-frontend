'use client';

import { Image } from '@chakra-ui/next-js';
import { Stack, StackProps, Text } from '@chakra-ui/react';
import { useParams, useSearchParams } from 'next/navigation';

import { useGetBeneficiaryStatus } from '@/hooks/useGetBeneficiaryStatus';
import { useGetProgramForm } from '@/hooks/useGetProgramForm';

export function CoverPhoto(props: StackProps) {
  const { programId } = useParams();
  const code = useSearchParams().get('code') || '';
  const { data: programForm } = useGetProgramForm(`${programId}`);
  const { data: beneficiaryStatus } = useGetBeneficiaryStatus(code);

  const coverPhoto = beneficiaryStatus ? null : programForm?.body.coverPhoto; // TODO: add cover photo from beneficiary status
  const programName = beneficiaryStatus?.body.programName ?? programForm?.body.programName ?? '...';

  return (
    <Stack
      minH={{ base: '9rem', xs: '17rem' }}
      pos="relative"
      overflow="hidden"
      bgColor="primary.500"
      justify="flex-end"
      _before={
        coverPhoto
          ? {
              content: "''",
              pos: 'absolute',
              boxSize: 'full',
              bgColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1,
            }
          : undefined
      }
      {...props}
    >
      {coverPhoto && <Image src={coverPhoto} alt={programName} sx={{ objectFit: 'cover' }} fill />}
      <Stack gap={{ base: '1.25rem', xs: '3.5rem' }} p={{ base: '0.75rem', xs: '1.375rem 1.5rem' }} zIndex="1">
        {!coverPhoto && (
          <Image
            src="/images/BOI_LOGO_INVERTED.png"
            alt="Bank of Industry Logo"
            width={3508}
            height={2481}
            h="3.75rem"
            alignSelf="center"
            sx={{ objectFit: 'cover' }}
          />
        )}
        <Text as="h1" variant={{ base: 'Body2Semibold', xs: 'Header1Bold' }} color="white" pos="relative">
          {programName}
        </Text>
      </Stack>
    </Stack>
  );
}
