'use client';

import { useProgramForm } from '@/providers/form-provider';
import { Avatar, Icon, Text } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';

export const ProgramImage = () => {
  const { setValue } = useProgramForm();
  const [preview, setPreview] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setValue('programImage', file.name);
    setPreview(URL.createObjectURL(file));
    e.target.value = '';
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
      borderColor="grey.300"
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
    >
      <input type="file" name="programImage" accept="image/*" hidden onChange={handleFile} ref={inputRef} />
      {preview ? null : (
        <Icon as={MdAddCircle} color="primary.600" boxSize="1.5rem" pos="absolute" right="-0.25rem" bottom="-0.25rem" />
      )}
    </Avatar>
  );
};
