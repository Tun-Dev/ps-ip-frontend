'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';

const editModules = {
  checkboxForm: [
    {
      id: 1,
      name: 'Application Form',
      sections: [
        {
          heading: '',
          fields: [
            { label: 'Beneficiary Name', value: false },
            { label: 'Beneficiary Gender', value: false },
            { label: 'Beneficiary Age', value: false },
            { label: 'Beneficiary Local Government Area', value: false },
            { label: 'Beneficiary Profession', value: false },
            { label: 'Beneficiary Literacy', value: false },
            { label: 'Beneficiary Disabled', value: false },
            { label: 'Beneficiary Tech Savvy', value: false },
          ],
        },
      ],
    },
    {
      id: 2,
      name: 'Enumeration Form',
      sections: [
        {
          heading: 'Business Data',
          fields: [
            { label: 'Company Name', value: false },
            { label: 'Middle Name', value: false },
            { label: 'Grant Amount', value: false },
            { label: 'Cac Registration Number', value: false },
            { label: 'Cac Registration Year', value: false },
          ],
        },
        {
          heading: 'Head Of Business Data',
          fields: [
            { label: 'First Name', value: false },
            { label: 'Middle Name', value: false },
            { label: 'Last Name', value: false },
            { label: 'Gender', value: false },
            { label: 'Date of Birth', value: false },
          ],
        },
        {
          heading: 'Employee Data',
          fields: [
            { label: 'First Name', value: false },
            { label: 'Middle Name', value: false },
            { label: 'Last Name', value: false },
            { label: 'Gender', value: false },
          ],
        },
      ],
    },
  ],
  builderForm: [
    {
      id: 5,
      name: 'Vetting Form',
      fields: [
        { name: 'Full Name', type: 'Short answer' },
        { name: 'Upload Picture', type: 'File upload' },
        { name: 'Date of Birth', type: 'Date' },
        { name: 'Gender', type: 'Dropdown' },
        { name: 'Phone Number', type: 'Short answer' },
        { name: 'National Identity Number', type: 'Short answer' },
        { name: 'Local Government Area', type: 'Dropdown' },
        { name: 'Email', type: 'Short answer' },
        { name: 'Address', type: 'Paragraph' },
      ],
    },
  ],
};

const settings = [
  {
    id: 1,
    name: 'Application Settings',
    fields: [
      { label: 'Allow beneficiaries enjoy multiple benefits', value: false },
      { label: 'Allow agent enjoy benefits', value: false },
      { label: 'Allow multiple responses by one beneficiary', value: false },
      { label: 'Allow beneficiaries save and continue', value: false },
      { label: 'Allow on mobile', value: false },
      { label: 'Allow screenshots', value: false },
      { label: 'Allow multiple responses from multiple beneficiaries from the same device', value: false },
    ],
  },
  {
    id: 2,
    name: 'Enumeration Settings',
    fields: [
      { label: 'Allow beneficiaries enjoy multiple benefits', value: false },
      { label: 'Allow agent enjoy benefits', value: false },
      { label: 'Allow multiple responses by one beneficiary', value: false },
      { label: 'Allow screenshots', value: false },
    ],
  },
  {
    id: 5,
    name: 'Vetting Settings',
    fields: [
      { label: 'Allow beneficiaries see vetting score', value: false },
      { label: 'Allow beneficiaries apply again after rejection', value: false },
      { label: 'Allow manual vetting', value: false },
    ],
  },
  {
    id: 6,
    name: 'Whitelisting Settings',
    fields: [
      { label: 'Allow rejected beneficiaries apply again', value: false },
      { label: 'Allow manual whitelisting', value: false },
    ],
  },
  {
    id: 7,
    name: 'Disbursement Settings',
    fields: [
      { label: 'Allow beneficiaries enjoy multiple disbursement', value: false },
      { label: 'Allow rejection during disbursement', value: false },
      { label: 'Allow pause disbursement', value: false },
    ],
  },
];

const defaultValues = {
  programName: '',
  programImage: '',
  editModules,
  settings,
};

export type ProgramFormValues = typeof defaultValues;

const ProgramFormContext = createContext<UseFormReturn<ProgramFormValues> | null>(null);

export const ProgramFormProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm<ProgramFormValues>({ defaultValues });

  return <ProgramFormContext.Provider value={form}>{children}</ProgramFormContext.Provider>;
};

export const useProgramForm = () => {
  const programFormContext = useContext(ProgramFormContext);

  if (!programFormContext) throw new Error('useProgramForm must be used within ProgramFormProvider');

  return programFormContext;
};
