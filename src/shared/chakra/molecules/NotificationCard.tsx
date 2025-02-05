import { Center, Icon as ChakraIcon, Flex, Link, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { MdOpenInNew } from 'react-icons/md';

interface NotificationCardProps {
  title: string;
  time: string;
  desc: string;
  Icon: IconType;
  boldWord?: string;
  iconSize?: string;
}

const NotificationCard = ({ title, time, desc, Icon, boldWord, iconSize = '1rem' }: NotificationCardProps) => {
  const parts = boldWord ? desc.split(boldWord) : [desc];

  return (
    <Flex
      flexDir="column"
      justifyContent="space-between"
      h="7rem"
      boxShadow="card"
      borderRadius="12px"
      padding="10px 12px"
      bg="primary.100"
    >
      <Flex gap="4">
        <Center boxSize="8" bg="primary.200" borderRadius="10px" flexShrink={0}>
          <Icon color="var(--chakra-colors-primary-500)" size={iconSize} />
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
      <Flex justifyContent="flex-end" color="secondary.500">
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
