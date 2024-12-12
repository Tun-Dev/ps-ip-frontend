'use client';

import { Flex, Text } from '@chakra-ui/react';
import { MdCheckCircle, MdOutlineRotateRight, MdRefresh } from 'react-icons/md';

type Props = {
  name: string;
  number: number;
  status: 'Completed' | 'In Progress' | 'Pending';
};

export const ModuleProgressCard = ({ name, number, status }: Props) => {
  return (
    <Flex
      bgColor={status === 'Pending' ? 'grey.200' : 'primary.100'}
      align="center"
      rounded="1rem"
      p="3"
      gap="3rem"
      justify="space-between"
      minW="255px"
    >
      <Flex gap="1" align="center">
        <Text
          variant="Body2Semibold"
          color={status === 'Pending' ? 'white' : 'primary.500'}
          bgColor={status === 'Pending' ? 'grey.400' : 'transparent'}
          rounded="6.25rem"
          px="0.4375rem"
        >
          {number}
        </Text>
        <Text variant="Body2Semibold" color={status === 'Pending' ? 'grey.500' : 'primary.500'}>
          {name}
        </Text>
      </Flex>
      <Flex align="center" gap="0.125rem">
        <Text
          variant="Body3Regular"
          color={status === 'Pending' ? 'grey.500' : status === 'In Progress' ? 'secondary.500' : 'primary.500'}
          whiteSpace="nowrap"
        >
          {status}
        </Text>
        {status === 'Completed' ? (
          <MdCheckCircle color="var(--chakra-colors-primary-500)" size="0.75rem" />
        ) : status === 'In Progress' ? (
          <MdRefresh color="var(--chakra-colors-secondary-500)" size="0.75rem" />
        ) : status === 'Pending' ? (
          <MdOutlineRotateRight color="var(--chakra-colors-grey-500)" size="0.75rem" />
        ) : null}
      </Flex>
    </Flex>
  );
};
