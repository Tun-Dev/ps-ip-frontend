'use client';

import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useUploadFile } from '@/hooks/useUploadFile';
import { useProgramForm } from '@/providers/form-provider';
import { Avatar, Icon, Spinner, Text } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';

export const ProgramImage = ({ hasError }: { hasError: boolean }) => {
  const { setValue } = useProgramForm();
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending } = useUploadFile();
  const { programID } = useParams();
  const { response } = useGetProgramById(programID?.toString());

  useEffect(() => {
    if (response) setPreview(response.body.logo);
  }, [response]);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
    e.target.value = '';

    uploadFile({ files: [file], type: 'programLogo' }, { onSuccess: (data) => setValue('logo', data.body[0].id) });
  };

  return (
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
      boxSize="3rem"
      outlineColor="transparent"
      _focusVisible={{ boxShadow: 'outline' }}
      onClick={() => inputRef.current?.click()}
      bg="transparent"
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
        <Icon as={MdAddCircle} color="primary.600" boxSize="1.5rem" pos="absolute" right="-0.25rem" bottom="-0.25rem" />
      )}
      {isPending && <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />}
    </Avatar>
  );
};
