'use client';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconButton, Input, InputGroup, type InputProps, InputRightElement } from '@chakra-ui/react';
import { forwardRef, useState } from 'react';

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input ref={ref} type={show ? 'text' : 'password'} variant="primary" {...props} />
      <InputRightElement>
        <IconButton
          aria-label={show ? 'Hide password' : 'Show password'}
          icon={show ? <ViewOffIcon /> : <ViewIcon />}
          onClick={handleClick}
          variant="unstyled"
        />
      </InputRightElement>
    </InputGroup>
  );
});

PasswordInput.displayName = 'PasswordInput';
