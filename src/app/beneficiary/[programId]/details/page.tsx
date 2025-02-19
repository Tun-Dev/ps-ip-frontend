'use client';

import {
  Button,
  Checkbox,
  Flex,
  Grid,
  ListItem,
  Spinner,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';

const BeneficiaryDashboard = () => {
  const router = useRouter();
  const { programId } = useParams();
  const [isChecked, setIsChecked] = useState(false);

  const { data: programForm, isPending, error, isError } = useGetProgramForm(`${programId}`);

  if (isPending)
    return (
      <Grid flex="1" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (isError) {
    return (
      <Grid flex="1" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );
  }

  return (
    <Stack gap="3rem" p="6" flex="1">
      <Stack gap="6">
        <Text variant="Body1Regular" color="#343434">
          {programForm.body.description}
        </Text>
        <Tabs variant="unstyled">
          <TabList>
            <Tab px="4" py="1">
              <Text variant="Body2Semibold">Eligibility Criteria</Text>
            </Tab>
            {/* <Tab px="4"py="1">
            <Text variant="Body2Semibold">Loan Documentation Required</Text>
          </Tab>
          <Tab px="4"py="1">
            <Text variant="Body2Semibold">Features</Text>
          </Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel p="0" pt="3">
              <UnorderedList>
                {programForm.body.eligibilityCriteria.map((criteria, index) => (
                  <ListItem key={index}>
                    <Text variant="Body1Regular">{criteria}</Text>
                  </ListItem>
                ))}
              </UnorderedList>
            </TabPanel>
            {/* <TabPanel p="0" pt="3">
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
          <TabPanel p="0" pt="3">
            <Flex flexDir="column">
              <UnorderedList>
                <ListItem>
                  <Text variant="Body1Regular">
                    Applicants must belong to a cooperative society/group registered at the state level
                  </Text>
                </ListItem>
              </UnorderedList>
            </Flex>
          </TabPanel> */}
          </TabPanels>
        </Tabs>
        <Checkbox
          mb="16px"
          sx={{ 'span:first-of-type': { alignSelf: 'start', mt: '1' } }}
          isChecked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        >
          <Text as="span" variant="Body1Regular">
            By proceeding, you consent to the collection, processing, and use of your data as outlined in our{' '}
            <Text
              as={Link}
              href="https://www.boi.ng/privacy-policy/"
              target="_blank"
              variant="Body1Bold"
              color="primary.500"
              textDecor="underline"
            >
              Privacy Policy.
            </Text>
          </Text>
        </Checkbox>
      </Stack>
      <Flex justify="end">
        <Button
          w="full"
          maxW="15rem"
          h="3rem"
          variant="primary"
          isDisabled={!isChecked}
          onClick={() => router.push(`/beneficiary/${programId}/fill`)}
        >
          Apply
        </Button>
      </Flex>
    </Stack>
  );
};

export default BeneficiaryDashboard;
