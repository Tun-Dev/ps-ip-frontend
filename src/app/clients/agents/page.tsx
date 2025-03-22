'use client';

import { useGetAggregatorsOverview } from '@/hooks/useGetAggregatorsOverview';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { MdGroupAdd, MdGroups } from 'react-icons/md';
import AgentsTab from './tabs/agentTab';
import AggregatorTab from './tabs/aggregatorTab';

const AgentsPage = () => {
  const [selected, setSelected] = useState<'agents' | 'aggregators'>('aggregators');

  const { isLoading, data } = useGetAggregatorsOverview();

  return (
    <Flex flexDir="column" gap="1.5rem" w="100%" h="100%">
      {/* <AggregatorModal isOpen={isOpen} onClose={onClose} />
      <AddNewAgentModal isOpen={isOpen} onClose={onClose} /> */}
      <Flex flexDir="column" gap="12px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text variant="Body1Semibold" color="grey.400">
            Overview
          </Text>
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
