import {
  Button,
  Flex,
  FlexProps,
  Icon,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdFolder, MdMoreVert } from 'react-icons/md';

const FolderCard = ({
  name,
  count,
  onDelete,
  onAdd,
  onEdit,
  ...rest
}: { name: string; count: number; onDelete: () => void; onAdd: () => void; onEdit: () => void } & FlexProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex p="16px" borderRadius="16px" bg="primary.100" flexDir="column" gap="12px" cursor="pointer" {...rest}>
      <Flex justifyContent="space-between">
        <Flex
          width="60px"
          height="56px"
          bg="primary.200"
          borderRadius="8px"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={MdFolder} color="primary.500" boxSize="48px" />
        </Flex>
        <Flex boxSize="24px" cursor="pointer" onClick={(e) => e.stopPropagation()}>
          <Popover placement="bottom-end" isOpen={isOpen} onClose={onClose}>
            <PopoverTrigger>
              <Button margin="0 auto" bg="transparent" boxSize="24px" minW={0} h="auto" p="0" onClick={onOpen}>
                <Icon as={MdMoreVert} color="primary.500" boxSize="100%" />
              </Button>
            </PopoverTrigger>
            <PopoverContent w="129px" p="8px">
              <PopoverArrow />
              <PopoverBody p="0">
                <Flex flexDir="column">
                  <Button w="100%" bg="transparent" size="small" p="0" fontSize="13px" fontWeight="400" onClick={onAdd}>
                    Add New Program
                  </Button>
                  <Button
                    w="100%"
                    bg="transparent"
                    size="small"
                    p="0"
                    fontSize="13px"
                    fontWeight="400"
                    onClick={() => {
                      onDelete();
                      onClose();
                    }}
                  >
                    Delete Folder
                  </Button>
                  <Button
                    w="100%"
                    bg="transparent"
                    size="small"
                    p="0"
                    fontSize="13px"
                    fontWeight="400"
                    onClick={() => {
                      onEdit();
                      onClose();
                    }}
                  >
                    Edit Name
                  </Button>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="6px">
        <Text variant="Body2Semibold">{name}</Text>

        <Text color="#338359" variant="Body2Semibold">
          Program Types - {count}
        </Text>
      </Flex>
    </Flex>
  );
};

export { FolderCard };
