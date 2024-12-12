'use client';

import { OverviewCard } from '@/shared/chakra/components/overview';
import { LineGraphCard } from '@/shared';
import { CURRENT_MONTH, MONTHS } from '@/utils';
import { Box, Button, Flex, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { MdDownload, MdEmojiEmotions, MdLocalShipping, MdVolunteerActivism } from 'react-icons/md';

const VendorsReportsDashboard = () => {
  return (
    <Box>
      <Tabs variant="unstyled">
        <TabList>
          <Tab>
            <Text variant="Body2Semibold">Overview</Text>
          </Tab>
          <Tab>
            <Text variant="Body2Semibold">Disbursement</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Select size="small" defaultValue={CURRENT_MONTH} fontWeight="600" w="max-content">
                  {MONTHS.map((month) => (
                    <option key={month.value}>{month.label}</option>
                  ))}
                </Select>
                <Button leftIcon={<MdDownload size="1.25rem" />} variant="primary" size="default">
                  Download Report
                </Button>
              </Flex>
              <Flex gap="1rem">
                <Box w="265px" flex="1">
                  <OverviewCard title="Total Orders" number={5000} icon={MdLocalShipping} />
                </Box>
                <Box w="265px" flex="1">
                  <OverviewCard title="New Orders" number={5000} icon={MdLocalShipping} />
                </Box>
                <Box w="265px" flex="1">
                  <OverviewCard title="Completed Orders" number={5000} icon={MdLocalShipping} />
                </Box>
                <Box w="265px" flex="1">
                  <OverviewCard title="Failed Orders" number={5000} icon={MdLocalShipping} iconColor="red" />
                </Box>
              </Flex>
              <Box bg="primary.50" borderRadius="12px" p="4" w="60%" minW="648px">
                <LineGraphCard />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Select size="small" defaultValue={CURRENT_MONTH} fontWeight="600" w="max-content">
                  {MONTHS.map((month) => (
                    <option key={month.value}>{month.label}</option>
                  ))}
                </Select>
                <Button leftIcon={<MdDownload size="1.25rem" />} variant="primary" size="default">
                  Download Report
                </Button>
              </Flex>
              <Flex gap="1rem">
                <Box w="265px">
                  <OverviewCard title="Total Amount Disbursed" number={37500000} icon={MdVolunteerActivism} />
                </Box>
                <Box w="265px">
                  <OverviewCard title="Beneficiary Disbursed" number={15000} icon={MdEmojiEmotions} />
                </Box>
                <Box w="265px">
                  <OverviewCard title="Orders Pending" number={5000} icon={MdLocalShipping} />
                </Box>
              </Flex>
              <Box bg="primary.50" borderRadius="12px" p="4" w="60%" minW="648px">
                <LineGraphCard />
              </Box>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default VendorsReportsDashboard;
