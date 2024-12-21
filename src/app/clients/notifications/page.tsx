import { Flex, Box, Text, Circle } from '@chakra-ui/react';
import React from 'react';

const ClientsNotificationPage = () => {
  const notifications = [
    {
      text: [
        { content: '500 beneficiaries', fontWeight: 'bold' },
        { content: ' have been whitelisted for the ' },
        { content: 'iDICE Program', fontWeight: 'bold' },
      ],
      color: '#14AE5C',
      time: '5 mins ago',
    },
    {
      text: [
        { content: '50 agents', fontWeight: 'bold' },
        { content: ' have reached their enumeration objective for the ' },
        { content: 'iDICE Program', fontWeight: 'bold' },
      ],
      color: '#14AE5C',
      time: '5 mins ago',
    },
    {
      text: [
        { content: 'SovaLabs', fontWeight: 'bold' },
        { content: ' has completed all orders for the ' },
        { content: 'Tech intervention program', fontWeight: 'bold' },
      ],
      color: 'transparent',
      time: '5 mins ago',
    },
  ];
  return (
    <Flex flexDir="column" gap="20px">
      <Flex pb="24px" borderBottom="1px solid" borderColor="grey.200">
        <Text variant="Body1Semibold" color="grey.500">
          Notifications
        </Text>
      </Flex>
      <Flex flexDir="column" gap="24px">
        {notifications.map((item, index) => (
          <Flex
            key={index}
            width="100%"
            height="40px"
            // padding="16px 24px"
            gap="12px"
            borderBottom={index !== notifications.length - 1 ? '1px solid' : 'none'}
            borderColor="grey.200"
            justify="space-between"
            align="center"
            pb="16px"
          >
            <Flex flex="1" alignItems="center" gap="12px">
              <Circle size="10px" bg={item.color} />
              <Text fontSize="md" lineHeight="1.5">
                {item.text.map((part, partIndex) => (
                  <Text as="span" key={partIndex} fontWeight={part.fontWeight || 'normal'}>
                    {part.content}
                  </Text>
                ))}
              </Text>
            </Flex>

            <Box textAlign="right" position="relative">
              <Text fontSize="sm" color="grey.400" fontWeight="600">
                {item.time}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default ClientsNotificationPage;
