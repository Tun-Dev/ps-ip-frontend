import { useGetAgentDetails } from '@/hooks/useGetAgentDetails';
import { useRemoveAgentProgram } from '@/hooks/useRemoveAgentProgram';
import type { Agent, AgentDetails } from '@/types';
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
  agent: Agent;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

export const AgentProgramList = ({ onClose, agent, setScreen }: Props) => {
  const { data, isPending, isError, error } = useGetAgentDetails(agent.id);

  return (
    <ModalContent maxW="42.375rem">
      <ModalHeader>
        <Text as="span" variant="Body1Semibold">
          Manage Agent
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
            data.body.map((item, index) => <Item key={index} agentId={agent.id} item={item} />)
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

const Item = ({ agentId, item }: { agentId: string; item: AgentDetails }) => {
  const { mutate, isPending } = useRemoveAgentProgram();
  return (
    <Stack border="1px solid" borderColor="grey.200" borderRadius="12px" p="4">
      <Flex pb="8px" justifyContent="space-between" borderBottom="1px solid" borderBottomColor="grey.200">
        <Text variant="Body1Semibold">{item.programName}</Text>
        <Text variant="Body2Semibold" color="#006430">
          {item.programType}
        </Text>
      </Flex>
      <Flex align="flex-start" justify="space-between" gap="4">
        <SimpleGrid columns={2} gap="4" flex="1">
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              LGA
            </Text>
            <Text variant="Body1Semibold">{item.lga || 'N/A'}</Text>
          </Stack>
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              Objective
            </Text>
            <Text variant="Body1Semibold">{item.objective || 'N/A'}</Text>
          </Stack>
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              Activation Starts
            </Text>
            <Text variant="Body1Semibold">
              {item.activation ? formatDateTime(item.activation.startDate, item.activation.startTime) : 'N/A'}
            </Text>
          </Stack>
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              Activation Ends
            </Text>
            <Text variant="Body1Semibold">
              {item.activation ? formatDateTime(item.activation.endDate, item.activation.endTime) : 'N/A'}
            </Text>
          </Stack>
        </SimpleGrid>
        <Button
          w="156px"
          h="2rem"
          variant="cancel"
          fontSize="10px"
          fontWeight="600"
          isLoading={isPending}
          onClick={() => mutate({ agentId, programId: item.programId })}
        >
          Remove Program
        </Button>
      </Flex>
    </Stack>
  );
};

// Helper function to format date and time in a readable format
const formatDateTime = (dateString?: string, timeString?: string) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);

  // Add ordinal suffix to day
  const day = date.getDate();
  const getOrdinalSuffix = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let formattedDate = `${monthNames[date.getMonth()]} ${day}${getOrdinalSuffix(day)}, ${date.getFullYear()}`;

  // Add time if provided
  if (timeString) {
    const timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];
    const period = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    formattedDate += ` ${hours}:${minutes}${period}`;
  }

  return formattedDate;
};
