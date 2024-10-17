import { Box, Button, ButtonGroup, Heading, Stack, StackProps } from '@chakra-ui/react';
import Link from 'next/link';

import { ModulesData } from '@/utils';
import FormReview from './form-review';
import { SettingsReview } from './settings-review';

type Props = {
  step: number;
  moduleId: number;
} & StackProps;

const Review = ({ step, moduleId, ...props }: Props) => {
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
        <Stack spacing="6">
          {fields.map((setting) => (
            <FormReview key={setting.id} fields={setting.fields} display={moduleId === setting.id ? 'grid' : 'none'} />
          ))}
          {settings.map((setting) => (
            <SettingsReview
              key={setting.id}
              settings={setting.settings}
              display={moduleId === setting.id ? 'flex' : 'none'}
            />
          ))}
        </Stack>
      </Box>
      <ButtonGroup size="default" spacing="4" alignSelf="end" w="full" maxW="31.25rem">
        <Button as={Link} href={`/super-admin/programs/create?step=${step - 1}`} variant="secondary" flex="1">
          Back
        </Button>
        <Button variant="primary" flex="1">
          Create Program
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const fields = [
  {
    id: 1,
    name: 'Application Form',
    fields: [
      { name: 'Upload Picture', type: 'File upload' },
      { name: 'Full Name', type: 'Short answer' },
      { name: 'Date of Birth', type: 'Date' },
      { name: 'Gender', type: 'Dropdown' },
      { name: 'Phone Number', type: 'Short answer' },
      { name: 'National Identity Number', type: 'Short answer' },
      { name: 'Local Government Area', type: 'Dropdown' },
      { name: 'Email', type: 'Short answer' },
      { name: 'Address', type: 'Paragraph' },
    ],
  },
  {
    id: 2,
    name: 'Enumeration Form',
    fields: [
      { name: 'Upload Picture', type: 'File upload' },
      { name: 'Full Name', type: 'Short answer' },
      { name: 'Date of Birth', type: 'Date' },
      { name: 'Gender', type: 'Dropdown' },
    ],
  },
  {
    id: 4,
    name: 'Vetting Form',
    fields: [
      { name: 'National Identity Number', type: 'Short answer' },
      { name: 'Local Government Area', type: 'Dropdown' },
      { name: 'Address', type: 'Paragraph' },
    ],
  },
];

const settings = [
  {
    id: 1,
    name: 'Application Settings',
    settings: [
      { label: 'Allow beneficiaries enjoy multiple benefits', value: true },
      { label: 'Allow agent enjoy benefits', value: true },
      { label: 'Allow multiple responses by one beneficiary', value: false },
      { label: 'Allow beneficiaries save and continue', value: false },
      { label: 'Allow on mobile', value: true },
      { label: 'Allow screenshots', value: true },
      { label: 'Allow multiple responses from multiple beneficiaries from the same device', value: false },
    ],
  },
  {
    id: 2,
    name: 'Enumeration Settings',
    settings: [
      { label: 'Allow beneficiaries enjoy multiple benefits', value: true },
      { label: 'Allow agent enjoy benefits', value: true },
      { label: 'Allow multiple responses by one beneficiary', value: true },
      { label: 'Allow screenshots', value: true },
    ],
  },
  {
    id: 4,
    name: 'Vetting Settings',
    settings: [
      { label: 'Allow beneficiaries see vetting score', value: true },
      { label: 'Allow beneficiaries apply again after rejection', value: false },
      { label: 'Allow manual vetting', value: false },
    ],
  },
  {
    id: 5,
    name: 'Whitelisting Settings',
    settings: [
      { label: 'Allow rejected beneficiaries apply again', value: true },
      { label: 'Allow manual whitelisting', value: true },
    ],
  },
  {
    id: 6,
    name: 'Disbursement Settings',
    settings: [
      { label: 'Allow beneficiaries enjoy multiple disbursement', value: false },
      { label: 'Allow rejection during disbursement', value: true },
      { label: 'Allow pause disbursement', value: false },
    ],
  },
];

export default Review;
