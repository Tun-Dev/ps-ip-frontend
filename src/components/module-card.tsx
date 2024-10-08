import { Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { MdArrowForward, MdCheckCircle, MdRefresh } from 'react-icons/md';
import { useRouter } from 'next/navigation';
// import EnumerationIcon from '../../public/icons/undraw_interview.svg';

interface ModuleCardProps {
  id: number;
  name: string;
  status: 'Completed' | 'In progress' | 'Pending';
  icon: string;
  isDisabled: boolean;
  active: boolean;
}

const ModuleCard = ({ id, name, status, icon, isDisabled }: ModuleCardProps) => {
  const router = useRouter();
  return (
    <Flex
      h="156px"
      w="full"
      bg={isDisabled ? 'grey.100' : 'primary.50'}
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
            bg={isDisabled ? 'grey.400' : 'primary.100'}
            borderRadius="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="Body2Semibold" color={isDisabled ? 'white' : 'primary.500'}>
              {id}
            </Text>
          </Flex>
          <Text variant="Body2Semibold" color={isDisabled ? 'grey.500' : 'primary.500'}>
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
      <Flex justifyContent="flex-end" gap="2px">
        <Text variant="Body3Bold" color={isDisabled ? 'grey.500' : 'primary.500'}>
          {status}
        </Text>
        {status === 'Completed' ? (
          <MdCheckCircle color="#077D00" />
        ) : (
          <MdRefresh color={isDisabled ? '#7D7D7D' : '#077D00'} />
        )}
      </Flex>
    </Flex>
  );
};

export { ModuleCard };
