// import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Flex,
  Circle,
  Box,
  // IconButton,
} from '@chakra-ui/react';
// import { MdNotifications } from 'react-icons/md';

const NotificationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  // const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    {
      text: [
        { content: '500 beneficiaries', fontWeight: 'bold' },
        { content: ' have been whitelisted for the ' },
        { content: 'iDICE Program', fontWeight: 'bold' },
      ],
      color: 'green.500',
      time: '5 mins ago',
    },
    {
      text: [
        { content: '50 agents', fontWeight: 'bold' },
        { content: ' have reached their enumeration objective for the ' },
        { content: 'iDICE Program', fontWeight: 'bold' },
      ],
      color: 'green.500',
      time: '5 mins ago',
    },
    {
      text: [
        { content: 'SovaLabs', fontWeight: 'bold' },
        { content: ' has completed all orders for the ' },
        { content: 'Tech intervention program', fontWeight: 'bold' },
      ],
      color: 'red.500',
      time: '5 mins ago',
    },
  ];

  return (
    <>
      {/* <Flex align="center" padding="10px" gap="10px" cursor="pointer">
        <IconButton
          icon={<MdNotifications />}
          aria-label="Notifications"
          variant="ghost"
          color="green.500"
          fontSize="20px"
        />

        <Text fontSize="md" fontWeight="bold" color="green.500">
          Notifications
        </Text>

        <Circle bg="red.500" size="16px" color="white" fontSize="12px" marginLeft={16}>
          3
        </Circle>
      </Flex> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth="606px" borderRadius="12px" padding="0" gap="10px">
          <ModalHeader
            fontSize="md"
            padding="20px 24px"
            gap="10px"
            borderRadius="12px 12px 0 0"
            // borderBottom="1px solid"
            // borderColor="gray.100"
            color="gray.500"
            boxShadow="0px 4px 6px -1px #0330000A"
          >
            Notifications
          </ModalHeader>
          <ModalBody padding="0">
            {notifications.map((item, index) => (
              <Flex
                key={index}
                width="100%"
                height="114px"
                padding="16px 24px"
                gap="12px"
                borderBottom={index !== notifications.length - 1 ? '1px solid' : 'none'}
                borderColor="gray.100"
                justify="space-between"
                align="center"
              >
                <Box flex="1">
                  <Text fontSize="md" lineHeight="1.5">
                    {item.text.map((part, partIndex) => (
                      <Text as="span" key={partIndex} fontWeight={part.fontWeight || 'normal'}>
                        {part.content}
                      </Text>
                    ))}
                  </Text>
                </Box>

                <Box textAlign="right" position="relative">
                  <Circle size="12px" bg={item.color} position="absolute" top="-8px" right="0" />
                  <Text fontSize="sm" color="gray.500" mt="10">
                    {item.time}
                  </Text>
                </Box>
              </Flex>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotificationModal;
