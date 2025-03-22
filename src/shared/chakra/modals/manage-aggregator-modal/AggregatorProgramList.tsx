import { useDeleteAggregatorFromProgram } from '@/hooks/useDeleteAggregatorFromProgram';
import { useGetAggregatorsByID } from '@/hooks/useGetAggregatorByID';
import type { Aggregator, AggregatorDetails } from '@/types';
import { formatErrorMessage } from '@/utils';
import {
  Button,
  Flex,
  Grid,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  onClose: () => void;
  aggregator: Aggregator;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

export const AggregatorProgramList = ({ onClose, aggregator, setScreen }: Props) => {
  const { data, isPending, isError, error } = useGetAggregatorsByID(aggregator.id);

  return (
    <ModalContent maxW="42.375rem">
      <ModalHeader>
        <Text as="span" variant="Body1Semibold">
          Manage Aggregator
        </Text>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody>
        <Stack gap="4">
          {isPending ? (
            <Grid placeItems="center" h="10rem">
              <Spinner />
            </Grid>
          ) : isError ? (
            <Text>{formatErrorMessage(error)}</Text>
          ) : (
            data.body.map((item) => <Item key={item.aggregatorProgramId} item={item} />)
          )}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <SimpleGrid w="full" gap="4" columns={2}>
          <Button variant="cancel" height="3rem" w="full" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" height="3rem" w="full" onClick={() => setScreen('assign')}>
            Assign Program
          </Button>
        </SimpleGrid>
      </ModalFooter>
    </ModalContent>
  );
};

const Item = ({ item }: { item: AggregatorDetails }) => {
  const { mutate, isPending } = useDeleteAggregatorFromProgram();
  return (
    <Stack border="1px solid" borderColor="grey.200" borderRadius="12px" p="4">
      <Flex pb="8px" justifyContent="space-between" borderBottom="1px solid" borderBottomColor="grey.200">
        <Text variant="Body1Semibold">{item.programName}</Text>
        <Text variant="Body2Semibold" color="#006430">
          {item.programType}
        </Text>
      </Flex>
      <Flex align="center" justify="space-between" gap="4" alignItems="center">
        <SimpleGrid columns={3} gap="4" flex="1">
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              Agents
            </Text>
            <Text variant="Body1Semibold">{item.agents}</Text>
          </Stack>
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              Max Agents
            </Text>
            <Text variant="Body1Semibold">{item.maxAgents}</Text>
          </Stack>
        </SimpleGrid>
        <Button
          w="156px"
          h="2rem"
          variant="cancel"
          fontSize="10px"
          fontWeight="600"
          isLoading={isPending}
          onClick={() => mutate(item.aggregatorProgramId)}
        >
          Remove Program
        </Button>
      </Flex>
    </Stack>
  );
};
