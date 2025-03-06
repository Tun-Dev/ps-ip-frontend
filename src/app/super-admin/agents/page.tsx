'use client';

import { useGetAggregatorsOverview } from '@/hooks/useGetAggregatorsOverview';
import { AggregatorModal, AddNewAgentModalSuperAdmin } from '@/shared';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { MdAddCircle, MdGroupAdd, MdGroups } from 'react-icons/md';
import AgentsTab from './tabs/agentTab';
import AggregatorTab from './tabs/aggregatorTab';

const AgentsPage = () => {
  const [selected, setSelected] = useState<'agents' | 'aggregators'>('aggregators');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, data } = useGetAggregatorsOverview();

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      {selected === 'aggregators' ? (
        <AggregatorModal isOpen={isOpen} onClose={onClose} />
      ) : (
        <AddNewAgentModalSuperAdmin isOpen={isOpen} onClose={onClose} />
      )}
      {/* <AggregatorModal isOpen={isOpen} onClose={onClose} />
      <AddNewAgentModal isOpen={isOpen} onClose={onClose} /> */}
      <Flex flexDir="column" gap="12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>

          <Button variant="primary" gap="8px" onClick={onOpen}>
            <MdAddCircle />
            <Text> Add New {selected === 'aggregators' ? 'Aggregator' : 'Agents'}</Text>
          </Button>
        </Flex>
        <Flex gap="1rem">
          <Box w="265px" onClick={() => setSelected('aggregators')} cursor="pointer">
            <OverviewCard
              title="Total Aggregators"
              number={isLoading ? '...' : (data?.body.totalAggregators ?? 0)}
              icon={MdGroupAdd}
              active={selected === 'aggregators'}
            />
          </Box>
          <Box w="265px" onClick={() => setSelected('agents')} cursor="pointer">
            <OverviewCard
              title="Total Agents"
              number={isLoading ? '...' : (data?.body.totalAgents ?? 0)}
              icon={MdGroups}
              active={selected === 'agents'}
            />
          </Box>
        </Flex>
      </Flex>
      {selected === 'agents' ? <AgentsTab /> : <AggregatorTab />}
    </Flex>
  );
};

export default AgentsPage;
