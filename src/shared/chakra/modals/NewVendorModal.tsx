import {
  Text,
  Input,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputLeftElement,
  Grid,
} from '@chakra-ui/react';
import React from 'react';
import { Dropdown } from '@/shared/chakra/components';
import { useGetPrograms } from '@/hooks/useGetPrograms';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NewVendorModal = ({ isOpen, onClose }: ModalProps) => {
  const { data: programs } = useGetPrograms({ page: 1, pageSize: 999 });
  const options = programs?.body.data.map((program) => ({ label: program.name, value: program.id }));

  const offers = [
    { label: 'Loan', value: 'Loan' },
    { label: 'Tech Skills', value: 'Tech Skills' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent width="498px" height="756px" borderRadius="12px">
        <ModalHeader>
          <Text variant="Body1Semibold">Add New Vendor</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={3}>
            <Flex direction="column" gap={1}>
              <Text variant="Body2Semibold" color="gray.500">
                Aggregator Name
              </Text>
              <Input variant="primary" height="40px" placeholder="NURTW" />
            </Flex>
            <Flex direction="column" gap={1}>
              <Text variant="Body2Semibold" color="gray.500">
                Set Maximum Agent
              </Text>
              <Input type="number" variant="primary" height="40px" placeholder="300" />
            </Flex>
            <Flex direction="column" gap={1}>
              <Text variant="Body2Semibold" color="gray.500">
                Assign Program
              </Text>
              <Dropdown
                variant="whiteDropdown"
                placeholder="INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM"
                options={options}
              />
            </Flex>
            <Flex direction="column" gap={1}>
              <Text variant="Body2Semibold" color="gray.500">
                Assign Program
              </Text>
              <Dropdown variant="whiteDropdown" placeholder="Loan" options={offers} />
            </Flex>
            <Flex direction="column" gap={1}>
              <Text variant="Body2Semibold" color="gray.500">
                Amount Disbursable
              </Text>
              <InputGroup>
                <InputLeftElement>
                  <Text>₦</Text>
                </InputLeftElement>
                <Input type="number" placeholder="50,000,000"></Input>
              </InputGroup>
            </Flex>
            <Flex direction="column" gap={1}>
              <Text variant="Body2Semibold" color="gray.500">
                Number of Beneficiaries
              </Text>
              <Input type="number" placeholder="50,000"></Input>
            </Flex>
            <Grid templateColumns="repeat(2,1fr)" gap={4}>
              <Flex direction="column" gap={1}>
                <Text variant="Body2Semibold" color="gray.500">
                  Schedule Date
                </Text>
                <Input type="date" />
              </Flex>
              <Flex direction="column" gap={1}>
                <Text variant="Body2Semibold" color="gray.500">
                  End Date
                </Text>
                <Input type="date" />
              </Flex>
            </Grid>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="primary"
            width="402px"
            height="48px"
            onClick={() => {
              // console.log('Aggregator added');
              onClose();
            }}
          >
            Add New Vendor
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export { NewVendorModal };
