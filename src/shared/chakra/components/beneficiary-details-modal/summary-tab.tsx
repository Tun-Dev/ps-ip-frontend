'use client';

import type { ProgressLog } from '@/types';
import { Avatar, Box, Flex, Grid, Stack, Text } from '@chakra-ui/react';
import { MdCancel, MdCheckCircle, MdOutlineRotateRight } from 'react-icons/md';

type Props = {
  progressLog?: ProgressLog[];
};

export function SummaryTab({ progressLog = [] }: Props) {
  const shouldSplit = progressLog.length > 4;
  const midPoint = shouldSplit ? Math.ceil(progressLog.length / 2) : progressLog.length;
  const firstColumn = progressLog.slice(0, midPoint);
  const secondColumn = progressLog.slice(midPoint);

  return (
    <Box bgColor="primary.100" rounded="0.75rem">
      <Grid templateColumns="1fr auto 1fr">
        <SummaryColumn logs={firstColumn} withHeading />
        <Box bgColor="primary.200" w="1px" />
        <SummaryColumn logs={secondColumn} />
      </Grid>
    </Box>
  );
}

const SummaryColumn = ({ logs, withHeading }: { logs: ProgressLog[]; withHeading?: boolean }) => (
  <Box p="6">
    {withHeading && (
      <Text variant="Body2Semibold" color="grey.400" mb="4">
        Program Summary
      </Text>
    )}
    {logs.map((log, index) => (
      <Box key={log.moduleName + index}>
        <Flex gap="4" align="center" mb="1">
          <Text variant="Body2Semibold" color="primary.500" minW="90px">
            {log.moduleName}
          </Text>
          {log.status === 'APPROVED' ? (
            <Text
              variant="Body3Regular"
              px="2"
              py="1"
              bgColor="primary.200"
              rounded="6px"
              color="primary.500"
              border="1px solid"
              borderColor="primary.400"
              display="inline-flex"
              alignItems="center"
              gap="2px"
            >
              Completed
              <MdCheckCircle color="var(--chakra-colors-primary-500)" size="0.75rem" />
            </Text>
          ) : log.status === 'DISAPPROVED' ? (
            <Text
              variant="Body3Regular"
              px="2"
              py="1"
              bgColor="red/10"
              rounded="6px"
              color="red"
              border="1px solid"
              borderColor="red/10"
              display="inline-flex"
              alignItems="center"
              gap="2px"
            >
              Rejected
              <MdCancel color="var(--chakra-colors-red)" size="0.75rem" />
            </Text>
          ) : log.status === 'WHITELISTED' ? (
            <Text
              variant="Body3Regular"
              px="2"
              py="1"
              bgColor="primary.200"
              rounded="6px"
              color="primary.500"
              border="1px solid"
              borderColor="primary.400"
              display="inline-flex"
              alignItems="center"
              gap="2px"
            >
              Whitelisted
              <MdCheckCircle color="var(--chakra-colors-primary-500)" size="0.75rem" />
            </Text>
          ) : log.status === 'DISBURSED' ? (
            <Text
              variant="Body3Regular"
              px="2"
              py="1"
              bgColor="primary.200"
              rounded="6px"
              color="primary.500"
              border="1px solid"
              borderColor="primary.400"
              display="inline-flex"
              alignItems="center"
              gap="2px"
            >
              Disbursed
              <MdCheckCircle color="var(--chakra-colors-primary-500)" size="0.75rem" />
            </Text>
          ) : (
            <Text
              variant="Body3Regular"
              px="2"
              py="1"
              bgColor="white"
              rounded="6px"
              color="grey.500"
              border="1px solid"
              borderColor="grey.300"
              display="inline-flex"
              alignItems="center"
              gap="2px"
            >
              Pending
              <MdOutlineRotateRight color="var(--chakra-colors-grey-500)" size="0.75rem" />
            </Text>
          )}
        </Flex>
        {log.status !== 'PENDING' && (
          <Flex gap="6">
            {log.agentName && (
              <Box>
                <Text variant="Body3Semibold" color="grey.500" mb="1">
                  Enumerated by
                </Text>
                <Flex display="inline-flex" gap="1" align="center" py="1" px="2" bgColor="primary.50" rounded="0.5rem">
                  <Avatar name={log.agentName} size="sm" boxSize="1.5rem" />
                  <Text variant="Body2Semibold" color="text">
                    {log.agentName}
                  </Text>
                </Flex>
              </Box>
            )}
            <Box>
              <Text variant="Body3Semibold" color="grey.500" mb="1">
                Date
              </Text>
              <Text variant="Body2Semibold" color="text" py="1" px="2" bgColor="primary.50" rounded="0.5rem">
                {Intl.DateTimeFormat('en-GB', {
                  dateStyle: 'short',
                  timeStyle: 'short',
                }).format(new Date(log.date))}
              </Text>
            </Box>
          </Flex>
        )}
        {index < logs.length - 1 && (
          <Stack my="1" spacing="1" align="center" w="fit-content">
            <Box bgColor="primary.200" boxSize="1" rounded="full" />
            <Box bgColor="primary.200" boxSize="1.5" rounded="full" />
            <Box bgColor="primary.200" boxSize="1" rounded="full" />
            <Box bgColor="primary.200" boxSize="1.5" rounded="full" />
            <Box bgColor="primary.200" boxSize="1" rounded="full" />
            <Box bgColor="primary.200" boxSize="1.5" rounded="full" />
            <Box bgColor="primary.200" boxSize="1" rounded="full" />
          </Stack>
        )}
      </Box>
    ))}
  </Box>
);
