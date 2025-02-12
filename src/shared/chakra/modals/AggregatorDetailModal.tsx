import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Flex,
  Grid,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { Aggregator } from '@/types';
import { useGetAggregatorsByID } from '@/hooks/useGetAggregatorByID';
import { useEffect } from 'react';
import AssignNewProgram from './AssignNewProgram';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  aggregator?: Aggregator;
};

const AggregatorDetailsModal = ({ isOpen, onClose, aggregator }: ModalProps) => {
  const { response, isLoading } = useGetAggregatorsByID(`${aggregator?.id}`);
  console.log('response', response);

  const data = response?.body ? response.body : [];

  useEffect(() => {
    if (!response?.body || !isOpen) return;
  }, [response, isOpen]);

  const { onClose: onCloseAssign, onOpen: onOpenAssign, isOpen: isOpenAssign } = useDisclosure();

  return (
    <>
      <AssignNewProgram isOpen={isOpenAssign} onClose={onCloseAssign} aggregator={aggregator} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          // onSubmit={handleSubmit(onSubmit)}
          minH="45rem"
          maxH="calc(100vh - 10rem)"
          borderRadius="12px"
          maxW="42.375rem"
        >
          {/* <ModalHeader>
          <Text variant="Body1Semibold">Add New Aggregator</Text>
        </ModalHeader> */}
          <ModalCloseButton />
          <ModalBody overflowY="auto" display="flex">
            <Flex flexDir="column" gap="16px" flex="1 1 0%" mt="48px">
              {isLoading ? (
                <Grid placeItems="center" h="30rem">
                  <Spinner />
                </Grid>
              ) : (
                data &&
                data?.map((item, index) => (
                  <Item
                    key={index}
                    programName={item.programName}
                    programType={item.programType}
                    aggregator={item.name}
                    agents={item.agents}
                  />
                ))
              )}
              {}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex width="100%" gap="16px">
              <Button type="submit" variant="cancel" width="402px" height="48px" onClick={onClose}>
                Close
              </Button>{' '}
              <Button
                type="submit"
                variant="primary"
                width="402px"
                height="48px"
                onClick={() => {
                  onOpenAssign();
                  // onClose();
                }}
                // isDisabled={hasErrors}
                // isLoading={isPending}
              >
                Assign Program
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { AggregatorDetailsModal };

interface ItemProps {
  programName: string;
  programType: string;
  aggregator: string;
  agents: number;
}

const Item = ({ programName, programType, aggregator, agents }: ItemProps) => {
  return (
    <Flex border="1px solid" borderColor="grey.200" borderRadius="12px" p="16px" flexDir="column">
      <Flex pb="8px" justifyContent="space-between" borderBottom="1px solid" borderBottomColor="grey.200">
        <Text variant="Body1Semibold">{programName}</Text>
        <Text variant="Body2Semibold" color="#006430">
          {programType}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" mt="8px" alignItems="center">
        <Flex gap="60px">
          <Flex flexDir="column" gap="12px">
            <Text variant="Body2Semibold" color="grey.500">
              Aggregator
            </Text>
            <Text variant="Body1Semibold">{aggregator}</Text>
          </Flex>
          <Flex flexDir="column" gap="12px">
            <Text variant="Body2Semibold" color="grey.500">
              Agents
            </Text>
            <Text variant="Body1Semibold">{agents}</Text>
          </Flex>
        </Flex>
        <Button w="156px" h="32px" variant="cancel">
          <Text fontSize="10px" fontWeight="600">
            Remove Program
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};
