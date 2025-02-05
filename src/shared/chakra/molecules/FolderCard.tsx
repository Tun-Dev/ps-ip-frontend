import { Flex, FlexProps, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { MdFolder, MdMoreVert } from 'react-icons/md';

type FolderCardProps = {
  name: string;
  count: number;
  onDelete?: () => void;
  onAdd?: () => void;
  onEdit?: () => void;
} & FlexProps;

const FolderCard = ({ name, count, onDelete, onAdd, onEdit, ...rest }: FolderCardProps) => {
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
        {(onEdit || onDelete || onAdd) && (
          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              _hover={{ bgColor: 'primary.200' }}
              aria-label="Actions"
              icon={<Icon as={MdMoreVert} boxSize="1.5rem" color="primary.500" />}
              minW="0"
              h="fit-content"
              p="0"
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              {!!onAdd && (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
                >
                  <Text as="span" variant="Body2Regular" w="full">
                    Add New Program
                  </Text>
                </MenuItem>
              )}
              {!!onDelete && (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  <Text as="span" variant="Body2Regular" w="full">
                    Delete Folder
                  </Text>
                </MenuItem>
              )}
              {!!onEdit && (
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                >
                  <Text as="span" variant="Body2Regular" w="full">
                    Edit Name
                  </Text>
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        )}
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
