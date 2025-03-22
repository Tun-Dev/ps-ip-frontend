'use client';

import { useUploadFile } from '@/hooks/useUploadFile';
import { useProgramForm } from '@/providers/form-provider';
import { Button, Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';

export const ProgramCover = ({ hasError }: { hasError: boolean }) => {
  const {
    form: { setValue, getValues },
  } = useProgramForm();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending } = useUploadFile();
  const preview = getValues('coverPhotoFile');

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    e.target.value = '';

    setValue('coverPhotoFile', URL.createObjectURL(file));

    uploadFile(
      { files: [file], type: 'programLogo' },
      { onSuccess: (data) => setValue('coverPhotoID', data.body[0].id) }
    );
  };

  return (
    <Flex
      alignItems="center"
      gap="20px"
      border="1px dashed"
      h="144px"
      w="100%"
      maxW="554px"
      borderRadius="8px"
      justifyContent="center"
      borderColor={hasError ? 'red !important' : 'grey.300 !important'}
      overflow="hidden"
      pos="relative"
    >
      <input
        type="file"
        name="logo"
        accept="image/*"
        hidden
        onChange={handleFile}
        ref={inputRef}
        disabled={isPending}
        style={{ position: 'absolute' }}
      />
      {preview && <Image src={preview} alt="" w="100%" h="100%" pos="absolute" top="0" left="0" objectFit="cover" />}
      {isPending ? (
        <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />
      ) : (
        <Flex flexDir="column" gap="8px" alignItems="center" zIndex="2">
          <Text variant="Body2Regular" color="#7D7D7D">
            Cover Photo
          </Text>
          <Button variant="tertiary" bg="secondary.200" size="sm" onClick={() => inputRef.current?.click()}>
            Upload Photo
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
