// import { useDeleteAggregatorFromProgram } from '@/hooks/useDeleteAggregatorFromProgram';
import { useDeleteClientFromProgram } from '@/hooks/useDeleteClientFromProgram';
import { useGetClientByID } from '@/hooks/useGetClientByID';
import type { Client, ClientDetails } from '@/types';
import { formatCurrency, formatErrorMessage } from '@/utils';
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
  client: Client;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

export const ClientProgramList = ({ onClose, client, setScreen }: Props) => {
  const { data, isPending, isError, error } = useGetClientByID(client.id);

  console.log(data);

  return (
    <ModalContent maxW="42.375rem">
      <ModalHeader>
        <Text as="span" variant="Body1Semibold">
          Manage Client
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
            data.body.map((item) => <Item key={item.programId} item={item} />)
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

const Item = ({ item }: { item: ClientDetails }) => {
  const { mutate, isPending } = useDeleteClientFromProgram(item?.programId);
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
              No. of Beneficiaries
            </Text>
            <Text variant="Body1Semibold">{item.totalBeneficiaries}</Text>
          </Stack>
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              Amount Disbursable
            </Text>
            <Text variant="Body1Semibold">{formatCurrency(Number(item.amountDisbursed ?? '0'))}</Text>
          </Stack>
        </SimpleGrid>
        <Button
          w="156px"
          h="2rem"
          variant="cancel"
          fontSize="10px"
          fontWeight="600"
          isLoading={isPending}
          onClick={() => mutate(item.programId)}
        >
          Unassign Program
        </Button>
      </Flex>
    </Stack>
  );
};
