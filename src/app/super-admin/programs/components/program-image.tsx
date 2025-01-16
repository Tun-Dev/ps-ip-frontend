'use client';

import { useUploadFile } from '@/hooks/useUploadFile';
import { useProgramForm } from '@/providers/form-provider';
import { Avatar, Icon, Spinner, Text, Flex, Button } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import { MdAddCircle } from 'react-icons/md';

export const ProgramImage = ({ hasError, isReadOnly }: { hasError: boolean; isReadOnly?: boolean }) => {
  const { setValue, getValues } = useProgramForm();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending } = useUploadFile();
  const preview = getValues('logoFile');

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    e.target.value = '';

    setValue('logoFile', URL.createObjectURL(file));

    uploadFile({ files: [file], type: 'programLogo' }, { onSuccess: (data) => setValue('logo', data.body[0].id) });
  };

  return (
    <Flex alignItems="center" gap="20px">
      <Avatar
        as="button"
        type="button"
        display="grid"
        placeItems="center"
        pos="relative"
        color="grey.300"
        border="1px dashed"
        borderColor={hasError ? 'red !important' : 'grey.300 !important'}
        rounded="full"
        boxSize={isReadOnly ? '3rem' : '4.5rem'}
        outlineColor="transparent"
        _focusVisible={{ boxShadow: 'outline' }}
        bg="transparent"
        cursor="default"
        src={preview}
        icon={
          <Text variant="Body3Semibold" color="grey.400" textTransform="capitalize">
            Logo
          </Text>
        }
        overflow={preview ? 'hidden' : 'visible'}
        disabled={isPending}
        opacity={isPending ? 0.5 : 1}
      >
        <input
          type="file"
          name="logo"
          accept="image/*"
          hidden
          onChange={handleFile}
          ref={inputRef}
          disabled={isPending}
        />
        {preview ? null : (
          <Icon
            as={MdAddCircle}
            color="primary.600"
            boxSize="1.5rem"
            pos="absolute"
            right="-0.25rem"
            bottom="-0.25rem"
          />
        )}
        {isPending && <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />}
      </Avatar>
      {isReadOnly ? null : (
        <Button variant="tertiary" bg="secondary.200" size="sm" onClick={() => inputRef.current?.click()}>
          Upload Photo
        </Button>
      )}
    </Flex>
  );
};
