import { Center, Icon as ChakraIcon, Flex, Link, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { MdOpenInNew } from 'react-icons/md';

interface NotificationCardProps {
  title: string;
  time: string;
  desc: string;
  Icon: IconType;
  boldWord?: string;
}

const NotificationCard = ({ title, time, desc, Icon, boldWord }: NotificationCardProps) => {
  const parts = boldWord ? desc.split(boldWord) : [desc];

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      h="7rem"
      boxShadow="card"
      borderRadius="12px"
      padding="10px 12px"
    >
      <Flex gap="4">
        <Center h="2rem" w="2rem" bg="grey.100" padding="8px" borderRadius="10px">
          <Icon color="var(--chakra-colors-primary-600)" />
        </Center>
        <Flex flexDir="column" gap="2">
          <Text display="flex" alignItems="center" gap="2" color="grey.500" variant="Body2Semibold">
            {title}{' '}
            <Text as="span" color="grey.400" variant="Body3Semibold">
              {time}
            </Text>
          </Text>
          <Text variant="Body2Regular">
            {parts[0]}
            {boldWord && (
              <Text as="span" variant="Body2Bold">
                {boldWord}
              </Text>
            )}
            {parts[1]}
          </Text>
        </Flex>
      </Flex>
      <Flex justifyContent="flex-end" color="primary.500">
        <Link>
          <Text display="flex" alignItems="center" gap="1" variant="Body3Semibold">
            View details <ChakraIcon as={MdOpenInNew} />
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export { NotificationCard };
