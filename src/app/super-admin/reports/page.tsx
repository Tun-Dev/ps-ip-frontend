'use client';

import { OverviewCard } from '@/components/overview';
import { LineGraphCard } from '@/shared';
import { CURRENT_MONTH, formatCurrency, MONTHS } from '@/utils';
import { Box, Button, Flex, Grid, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react';
import {
  MdAccountBalanceWallet,
  MdCancel,
  MdCheckCircle,
  MdDownload,
  MdEmojiEmotions,
  MdGroups,
  MdLocalShipping,
  MdQuestionAnswer,
  MdRefresh,
  MdVolunteerActivism,
} from 'react-icons/md';

const ReportsPage = () => {
  return (
    <Box>
      <Tabs variant="unstyled">
        <TabList>
          <Tab>
            <Text variant="Body2Semibold">Overview</Text>
          </Tab>
          <Tab>
            <Text variant="Body2Semibold">Modules</Text>
          </Tab>
          <Tab>
            <Text variant="Body2Semibold">Agents/Aggregators</Text>
          </Tab>
          <Tab>
            <Text variant="Body2Semibold">Vendors/Orders</Text>
          </Tab>
          <Tab>
            <Text variant="Body2Semibold">Partners</Text>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Flex gap="6" align="center">
                  <Select size="small" defaultValue={CURRENT_MONTH} fontWeight="600" w="max-content" flexShrink={0}>
                    {MONTHS.map((month) => (
                      <option key={month.value}>{month.label}</option>
                    ))}
                  </Select>
                  <Select
                    size="medium"
                    defaultValue={'Investment in digital Creative Enterprises Program'}
                    variant="white"
                    maxW="28.125rem"
                  >
                    <option value="Investment in digital Creative Enterprises Program">
                      Investment in digital Creative Enterprises Program
                    </option>
                  </Select>
                </Flex>
                <Button leftIcon={<MdDownload size="1.25rem" />} variant="primary" size="default">
                  Download Report
                </Button>
              </Flex>
              <Flex gap="1rem">
                <OverviewCard title="Total Responses" number={20} icon={MdQuestionAnswer} stat={15.23} />
                <OverviewCard title="Beneficiaries Approved" number={500000} icon={MdCheckCircle} stat={20.5} />
                <OverviewCard
                  title="Beneficiaries Denied"
                  number={500000}
                  icon={MdCancel}
                  iconColor="red/50"
                  stat={20.5}
                />
              </Flex>
              <Box bg="primary.50" borderRadius="12px" p="4" w="60%" minW="648px">
                <LineGraphCard />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Flex gap="6" align="center">
                  <Select size="small" defaultValue={CURRENT_MONTH} fontWeight="600" w="max-content" flexShrink={0}>
                    {MONTHS.map((month) => (
                      <option key={month.value}>{month.label}</option>
                    ))}
                  </Select>
                  <Select
                    size="medium"
                    defaultValue={'Investment in digital Creative Enterprises Program'}
                    variant="white"
                    maxW="28.125rem"
                  >
                    <option value="Investment in digital Creative Enterprises Program">
                      Investment in digital Creative Enterprises Program
                    </option>
                  </Select>
                </Flex>
                <Button leftIcon={<MdDownload size="1.25rem" />} variant="primary" size="default">
                  Download Report
                </Button>
              </Flex>
              <Flex gap="1rem"></Flex>
              <Box bg="primary.50" borderRadius="12px" p="4" w="60%" minW="648px">
                <LineGraphCard />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Flex gap="6" align="center">
                  <Select size="small" defaultValue={CURRENT_MONTH} fontWeight="600" w="max-content" flexShrink={0}>
                    {MONTHS.map((month) => (
                      <option key={month.value}>{month.label}</option>
                    ))}
                  </Select>
                  <Select
                    size="medium"
                    defaultValue={'Investment in digital Creative Enterprises Program'}
                    variant="white"
                    maxW="28.125rem"
                  >
                    <option value="Investment in digital Creative Enterprises Program">
                      Investment in digital Creative Enterprises Program
                    </option>
                  </Select>
                </Flex>
                <Button leftIcon={<MdDownload size="1.25rem" />} variant="primary" size="default">
                  Download Report
                </Button>
              </Flex>
              <Flex gap="1rem">
                <Box w="265px">
                  <OverviewCard title="Total Agents" number={20} icon={MdGroups} />
                </Box>
                <Box w="265px">
                  <OverviewCard title="New Agents" number={500000} icon={MdGroups} />
                </Box>
                <Box w="265px">
                  <OverviewCard title="Total Completed Objectives" number={500000} icon={MdRefresh} />
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
                <Flex gap="6" align="center">
                  <Select size="small" defaultValue={CURRENT_MONTH} fontWeight="600" w="max-content" flexShrink={0}>
                    {MONTHS.map((month) => (
                      <option key={month.value}>{month.label}</option>
                    ))}
                  </Select>
                  <Select
                    size="medium"
                    defaultValue={'Investment in digital Creative Enterprises Program'}
                    variant="white"
                    maxW="28.125rem"
                  >
                    <option value="Investment in digital Creative Enterprises Program">
                      Investment in digital Creative Enterprises Program
                    </option>
                  </Select>
                </Flex>
                <Button leftIcon={<MdDownload size="1.25rem" />} variant="primary" size="default">
                  Download Report
                </Button>
              </Flex>
              <Grid gap="1rem" templateColumns="repeat(4, minmax(0, 1fr))" mb="2">
                <OverviewCard title="Total Vendors" number={10} icon={MdLocalShipping} />
                <OverviewCard title="Total Orders" number={150000} icon={MdLocalShipping} />
                <OverviewCard title="New Orders" number={150000} icon={MdLocalShipping} />
                <OverviewCard title="Beneficiaries Disbursed" number={150000} icon={MdEmojiEmotions} />
                <OverviewCard title="Amount Disbursed" number={formatCurrency(37500000)} icon={MdVolunteerActivism} />
                <OverviewCard
                  title="Amount Disbursable"
                  number={formatCurrency(12500000)}
                  icon={MdAccountBalanceWallet}
                />
              </Grid>
              <Box bg="primary.50" borderRadius="12px" p="4" w="60%" minW="648px">
                <LineGraphCard />
              </Box>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex flexDir="column" gap="1.5rem" w="100%">
              <Flex justifyContent="space-between">
                <Flex gap="6" align="center">
                  <Select size="small" defaultValue={CURRENT_MONTH} fontWeight="600" w="max-content" flexShrink={0}>
                    {MONTHS.map((month) => (
                      <option key={month.value}>{month.label}</option>
                    ))}
                  </Select>
                </Flex>
                <Button leftIcon={<MdDownload size="1.25rem" />} variant="primary" size="default">
                  Download Report
                </Button>
              </Flex>
              <Grid gap="1rem" templateColumns="repeat(4, minmax(0, 1fr))" mb="2">
                <OverviewCard title="Total Partners" number={30} icon={MdVolunteerActivism} />
              </Grid>
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

export default ReportsPage;
