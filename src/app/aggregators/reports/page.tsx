'use client';

import { OverviewCard } from '@/components/overview';
import { LineGraphCard } from '@/shared';
import { CURRENT_MONTH, MONTHS } from '@/utils';
import { Box, Button, Flex, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import { MdCancel, MdCheckCircle, MdDownload, MdGroups, MdQuestionAnswer, MdRefresh, MdViewList } from 'react-icons/md';

const AggregatorsReportsDashboard = () => {
  return (
    <Box>
      <Tabs variant="unstyled">
        <TabList>
          <Tab>
            <Text variant="Body2Semibold">Overview</Text>
          </Tab>
          <Tab>
            <Text variant="Body2Semibold">Enumerations</Text>
          </Tab>
          <Tab>
            <Text variant="Body2Semibold">Agents</Text>
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
                <OverviewCard title="Total Responses Reviewed" number={20} icon={MdQuestionAnswer} stat={15.23} />

                <OverviewCard title="Total Completed Enumerations" number={500000} icon={MdViewList} stat={20.5} />
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
                <OverviewCard title="Enumerations Approved" number={20} icon={MdCheckCircle} />

                <OverviewCard title="Enumerations Denied" number={500000} icon={MdCancel} />

                <OverviewCard title="Enumerations Pending" number={500000} icon={MdRefresh} />
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
                <OverviewCard title="Total Agents" number={20} icon={MdGroups} />

                <OverviewCard title="New Agents" number={500000} icon={MdGroups} />

                <OverviewCard title="Total Completed Objectives" number={500000} icon={MdRefresh} />
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

export default AggregatorsReportsDashboard;
