'use client';

import { Box, Button, Checkbox, Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { formatErrorMessage } from '@/utils';

const BeneficiaryDashboard = () => {
  const router = useRouter();
  const { programId } = useParams();
  const [isChecked, setIsChecked] = useState(false);

  const { data: programForm, isLoading, error } = useGetProgramForm(programId.toString());

  if (isLoading)
    return (
      <Grid boxSize="full" placeItems="center">
        <Spinner />
      </Grid>
    );

  if (error) {
    return (
      <Grid boxSize="full" placeItems="center">
        <Text variant="Body2Semibold" align="center">
          {formatErrorMessage(error)}
        </Text>
      </Grid>
    );
  }

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
        <Text variant="Header1Bold" color="white" zIndex={2}>
          {programForm?.body.programName}
        </Text>
      </Flex>
      <Flex flexDir="column" gap="16px" padding="24px">
        <Text variant="Body1Regular" color="#343434">
          {programForm?.body.description}
        </Text>

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

        {/* <Tabs variant="unstyled">
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
        </Tabs> */}

        <Flex justify="end" mt="1.5rem">
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
      </Flex>
    </Flex>
  );
};

export default BeneficiaryDashboard;
