'use client';

import {
  Flex,
  Text,
  Tabs,
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Checkbox,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/navigation';

const BeneficiaryDashboard = () => {
  const router = useRouter();
  return (
    <Flex flexDir="column" h="full" borderRadius="12px" overflow="hidden">
      <Flex h="272px" bg="url(/images/benHeader1.png)" p="12px 24px" pos="relative" alignItems="flex-end">
        <Box
          bg="linear-gradient(0deg, rgba(7, 125, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)"
          pos="absolute"
          w="full"
          h="full"
          top="0"
          left="0"
        />
        <Flex justifyContent="space-between" alignItems="center" h="fit-content" w="full" zIndex={2}>
          <Text variant="Header1Bold" color="white">
            Investment in digital Creative Enterprises Program (IDICE)
          </Text>
          <Button variant="primary" h="48px" w="212px" onClick={() => router.push('/beneficiary/application')}>
            Apply
          </Button>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="16px" padding="24px">
        <Text variant="Body1Regular" color="#343434">
          iDICE is an initiative of the Federal Government of Nigeria, executed by the Bank of Industry,  to promote
          investment in technology and creative ecosystems in the country. As part of the Government’s effort to create
          more sustainable jobs in these industries, iDICE is set up to build capacity and upskill Nigerian youth (from
          ages 15-35), in technology and creativity to increase their employability, foster innovation, and support the
          emergence of more entrepreneurs. iDICE is co-funded by the African Development Bank (AFDB), Agence française
          de développement (AFD), Islamic Development Bank (IsDB),and other private investors.
        </Text>

        <Checkbox mb="16px" alignItems="flex-start">
          <Text
            variant="Body1Regular"
            mt="-5px"
            sx={{
              span: {
                fontSize: '16px',
                lineHeight: '24px',
                fontWeight: 700,
                textDecor: 'underline',
                color: 'primary.500',
              },
            }}
          >
            By proceeding, you consent to the collection, processing, and use of your data as outlined in our{' '}
            <span>Privacy Policy.</span>
          </Text>
        </Checkbox>

        <Tabs variant="unstyled">
          <TabList>
            <Tab>
              <Text variant="Body2Semibold">Eligibility Criteria</Text>
            </Tab>
            <Tab>
              <Text variant="Body2Semibold">Loan Documentation Required</Text>
            </Tab>
            <Tab>
              <Text variant="Body2Semibold">Features</Text>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex flexDir="column">
                <UnorderedList>
                  <ListItem>
                    <Text variant="Body1Regular">
                      Applicants must belong to a cooperative society/group registered at the state level
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text variant="Body1Regular">
                      Must be recommended for a loan by the local leadership of the cooperative society/group
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text variant="Body1Regular">Must provide a valid BVN</Text>
                  </ListItem>
                  <ListItem>
                    <Text variant="Body1Regular">Must have a verified trade/farming location</Text>
                  </ListItem>
                  <ListItem>
                    <Text variant="Body1Regular">Must provide valid bank account information</Text>
                  </ListItem>
                </UnorderedList>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDir="column">
                <UnorderedList>
                  <ListItem>
                    <Text variant="Body1Regular">
                      Applicants must belong to a cooperative society/group registered at the state level
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text variant="Body1Regular">
                      Must be recommended for a loan by the local leadership of the cooperative society/group
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text variant="Body1Regular">Must provide valid bank account information</Text>
                  </ListItem>
                </UnorderedList>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex flexDir="column">
                <UnorderedList>
                  <ListItem>
                    <Text variant="Body1Regular">
                      Applicants must belong to a cooperative society/group registered at the state level
                    </Text>
                  </ListItem>
                </UnorderedList>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default BeneficiaryDashboard;
