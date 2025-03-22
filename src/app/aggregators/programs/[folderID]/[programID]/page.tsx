'use client';

import { useGetAggregatorAnalytics } from '@/hooks/useGetAggregatorAnalytics';
import { BeneficiaryTable } from '@/shared/chakra/components/beneficiary-table';
import { OverviewCard } from '@/shared/chakra/components/overview';
import { Divider, SimpleGrid, Stack } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { MdAccessTimeFilled, MdCancel, MdCheckCircle, MdRefresh, MdViewList } from 'react-icons/md';

const AggregatorsEnumerationDashboard = () => {
  const { programID } = useParams();
  const { isPending, data, isError } = useGetAggregatorAnalytics(programID.toString());
  return (
    <Stack gap="6" boxSize="full">
      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="4">
        <OverviewCard
          title="Completed Objectives"
          number={isPending || isError ? '...' : data.body.completedObjectives}
          icon={MdCheckCircle}
          iconColor="green"
        />
        <OverviewCard
          title="Objectives Pending"
          number={isPending || isError ? '...' : data.body.pendingObjectives}
          icon={MdRefresh}
        />
        <OverviewCard
          title="Pending Reviews"
          number={isPending || isError ? '...' : data.body.pendingReviews}
          icon={MdRefresh}
        />
      </SimpleGrid>
      <Divider borderColor="grey.200" opacity="1" />
      <SimpleGrid columns={{ base: 3, sm: 4 }} gap="4">
        <OverviewCard
          title="Total Responses"
          number={isPending || isError ? '...' : data.body.totalResponses}
          icon={MdViewList}
          size="small"
        />
        <OverviewCard
          title="Approved Enumeration"
          number={isPending || isError ? '...' : data.body.approvedEnumerations}
          icon={MdCheckCircle}
          size="small"
          colorScheme="green"
        />
        <OverviewCard
          title="Denied Enumeration"
          number={isPending || isError ? '...' : data.body.deniedEnumerations}
          icon={MdCancel}
          size="small"
          colorScheme="red"
        />
        <OverviewCard
          title="Completion Time"
          number={
            isPending || isError
              ? '...'
              : data.body.completionTime
                ? new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })
                : 'Ongoing'
          }
          icon={MdAccessTimeFilled}
          size="small"
        />
      </SimpleGrid>
      <BeneficiaryTable moduleName="Enumeration" />
    </Stack>
  );
};
export default AggregatorsEnumerationDashboard;
