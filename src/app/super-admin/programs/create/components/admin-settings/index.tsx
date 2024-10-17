import { Box, Button, ButtonGroup, Heading, Stack, StackProps } from '@chakra-ui/react';
import Link from 'next/link';

import { ModulesData } from '@/utils';
import { SettingsForm } from './settings-form';

type Props = {
  step: number;
  moduleId: number;
} & StackProps;

const AdminSettings = ({ step, moduleId, ...props }: Props) => {
  const moduleName = ModulesData.find((module) => module.id === moduleId)?.name;
  return (
    <Stack py="6" spacing="2.94rem" minH="31.375rem" {...props}>
      <Box flex="1">
        <Heading variant="Body2Semibold" color="primary.500" mb="6" textTransform="capitalize">
          <Box as="span" display="inline-block" rounded="full" px="0.4375rem" bgColor="primary.100">
            {moduleId}
          </Box>{' '}
          {moduleName}
        </Heading>
        {settings.map((setting) => (
          <SettingsForm
            key={setting.id}
            defaultValues={setting.defaultValues}
            display={moduleId === setting.id ? 'flex' : 'none'}
          />
        ))}
      </Box>
      <ButtonGroup size="default" spacing="4" alignSelf="end" w="full" maxW="31.25rem">
        <Button as={Link} href={`/super-admin/programs/create?step=${step - 1}`} variant="secondary" flex="1">
          Back
        </Button>
        <Button as={Link} href={`/super-admin/programs/create?step=${step + 1}`} variant="primary" flex="1">
          Next
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const settings = [
  {
    id: 1,
    name: 'Application Settings',
    defaultValues: {
      settings: [
        { label: 'Allow beneficiaries enjoy multiple benefits', value: false },
        { label: 'Allow agent enjoy benefits', value: false },
        { label: 'Allow multiple responses by one beneficiary', value: false },
        { label: 'Allow beneficiaries save and continue', value: false },
        { label: 'Allow on mobile', value: false },
        { label: 'Allow screenshots', value: false },
        { label: 'Allow multiple responses from multiple beneficiaries from the same device', value: false },
      ],
    },
  },
  {
    id: 2,
    name: 'Enumeration Settings',
    defaultValues: {
      settings: [
        { label: 'Allow beneficiaries enjoy multiple benefits', value: false },
        { label: 'Allow agent enjoy benefits', value: false },
        { label: 'Allow multiple responses by one beneficiary', value: false },
        { label: 'Allow screenshots', value: false },
      ],
    },
  },
  {
    id: 4,
    name: 'Vetting Settings',
    defaultValues: {
      settings: [
        { label: 'Allow beneficiaries see vetting score', value: false },
        { label: 'Allow beneficiaries apply again after rejection', value: false },
        { label: 'Allow manual vetting', value: false },
      ],
    },
  },
  {
    id: 5,
    name: 'Whitelisting Settings',
    defaultValues: {
      settings: [
        { label: 'Allow rejected beneficiaries apply again', value: false },
        { label: 'Allow manual whitelisting', value: false },
      ],
    },
  },
  {
    id: 6,
    name: 'Disbursement Settings',
    defaultValues: {
      settings: [
        { label: 'Allow beneficiaries enjoy multiple disbursement', value: false },
        { label: 'Allow rejection during disbursement', value: false },
        { label: 'Allow pause disbursement', value: false },
      ],
    },
  },
];

export default AdminSettings;
