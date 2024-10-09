'use client';

import { Button, Flex, Image, Stack, StackProps, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';
import { MdArrowForward, MdCheckCircle, MdEdit, MdRefresh } from 'react-icons/md';

import { ModuleProps } from '@/utils';

type ModuleCardProps = {
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
} & ModuleProps &
  Omit<StackProps, 'id'>;

const ModuleCard = ({ id, name, status, icon, isDisabled, active, onRemove, ...rest }: ModuleCardProps) => {
  const router = useRouter();
  return (
    <Stack spacing="3" w="full" {...rest}>
      <Flex
        h="156px"
        bg={isDisabled ? 'grey.100' : active ? 'primary.100' : 'primary.50'}
        boxShadow="card"
        borderRadius="16px"
        p="12px"
        flexDir="column"
        gap="8px"
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        onClick={!isDisabled ? () => router.push(`/super-admin/programs/${id}/${name.toLowerCase()}`) : undefined}
      >
        <Flex justifyContent="space-between" w="full">
          <Flex gap="4px">
            <Flex
              boxSize="20px"
              bg={isDisabled ? 'grey.400' : active ? 'white' : 'primary.100'}
              borderRadius="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text variant={active ? 'Body2Bold' : 'Body2Semibold'} color={isDisabled ? 'white' : 'primary.500'}>
                {id}
              </Text>
            </Flex>
            <Text variant={active ? 'Body2Bold' : 'Body2Semibold'} color={isDisabled ? 'grey.500' : 'primary.500'}>
              {name}
            </Text>
          </Flex>
          <Flex
            boxSize="20px"
            bg={isDisabled ? 'grey.400' : 'primary.100'}
            borderRadius="100%"
            alignItems="center"
            justifyContent="center"
          >
            <MdArrowForward color={isDisabled ? 'white' : '#077D00'} />
          </Flex>
        </Flex>
        <Flex flex="1 1 0%" justifyContent="center">
          <Image src={icon} alt="" filter={isDisabled ? 'grayscale(90%)' : ''} />
        </Flex>
        <Flex justifyContent="flex-end" align="center" gap="2px">
          {status === 'Edit' && <MdEdit color="#077D00" size="0.75rem" />}
          <Text variant={active ? 'Body3Bold' : 'Body3Semibold'} color={isDisabled ? 'grey.500' : 'primary.500'}>
            {status}
          </Text>
          {status === 'Completed' ? (
            <MdCheckCircle color="#077D00" />
          ) : status === 'Pending' || status === 'In progress' ? (
            <MdRefresh color={isDisabled ? '#7D7D7D' : '#077D00'} />
          ) : null}
        </Flex>
      </Flex>
      {status === 'Edit' && (
        <Button variant="secondary" w="full" size="medium" onClick={onRemove}>
          Remove
        </Button>
      )}
    </Stack>
  );
};

export { ModuleCard };
