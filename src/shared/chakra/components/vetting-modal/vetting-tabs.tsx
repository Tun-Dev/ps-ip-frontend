import { Grid, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import { useGetBeneficiaryDetails } from '@/hooks/useGetBeneficiaryDetails';
import { useVettingModal } from '@/providers/vetting-modal-provider';
import { ProfileTab } from './profile-tab';
import { QuestionsTab } from './questions-tab';

export function VettingTabs() {
  const { beneficiary, tabIndex, setTabIndex } = useVettingModal();
  const { isLoading } = useGetBeneficiaryDetails(beneficiary.id);

  if (isLoading)
    return (
      <Grid placeItems="center" h="30rem">
        <Spinner />
      </Grid>
    );

  return (
    <Tabs index={tabIndex} onChange={setTabIndex} variant="unstyled" flex="1">
      <TabList>
        <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
          Profile
        </Tab>
        <Tab fontSize="0.8125rem" p="0.25rem 1rem" color="grey.400">
          Questions
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel px="0" py="5">
          <ProfileTab />
        </TabPanel>
        <TabPanel px="0" py="5">
          <QuestionsTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
