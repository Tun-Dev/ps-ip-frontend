'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, type ReactNode } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const surveyFormSchema = z.object({
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
      status: z.string(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
    })
  ),
});

const vettingFormSchema = z.object({
  type: z.string(),
  totalScore: z.coerce.number(),
  passScore: z.coerce.number(),
  manualFields: z.array(
    z.object({
      name: z.string(),
      value: z.number(),
      status: z.string(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
    })
  ),
  automatedFields: z.array(
    z.object({
      name: z.string(),
      value: z.coerce.number(),
      options: z.array(z.object({ label: z.string(), value: z.string(), weight: z.coerce.number() })),
    })
  ),
});

const DataPointSchema = z.object({
  format: z.object({
    type: z.string(),
    options: z.array(z.object({ id: z.string().optional(), label: z.string(), value: z.string() })),
  }),
  question: z.string(),
  type: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  id: z.string(),
});

const dataPointSchema = z.object({
  dataPoint: DataPointSchema,
  isRequired: z.boolean(),
});

const programModuleSchema = z.object({
  moduleId: z.number(),
  guidelines: z.array(z.number()),
  dataPoints: z.array(dataPointSchema).optional(),
  isBase: z.boolean(),
  order: z.number(),
  formId: z.string().optional(),
});

const programSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logo: z.number().min(1, 'Logo is required'),
  target: z.coerce.number().min(1, 'Target is required'),
  description: z.string().min(1, 'Description is required'),
  programTypeId: z.coerce.number().min(1, 'Program type is required'),
  programModules: z.array(programModuleSchema),
  surveyForm: surveyFormSchema,
  vettingForm: vettingFormSchema,
});

type ProgramSchema = z.infer<typeof programSchema>;

const defaultValues = {
  programModules: [],
  surveyForm: {
    fields: [
      { name: 'Full Name', value: 1, status: 'SHORT_TEXT', options: [] },
      { name: 'Upload Picture', value: 0, status: 'UPLOAD', options: [] },
      { name: 'Date of Birth', value: 6, status: 'DATE', options: [] },
      { name: 'Gender', value: 4, status: 'DROPDOWN', options: [] },
      { name: 'Phone Number', value: 8, status: 'PHONE_NUMBER', options: [] },
      { name: 'National Identity Number', value: 10, status: 'NUMBER', options: [] },
      { name: 'Local Government Area', value: 4, status: 'DROPDOWN', options: [] },
      { name: 'Email', value: 7, status: 'EMAIL', options: [] },
      { name: 'Address', value: 2, status: 'LONG_TEXT', options: [] },
    ],
  },
  vettingForm: {
    type: 'manual',
    totalScore: 250,
    passScore: 200,
    manualFields: [
      { name: 'Full Name', value: 1, status: 'SHORT_TEXT', options: [] },
      { name: 'Upload Picture', value: 0, status: 'UPLOAD', options: [] },
      { name: 'Date of Birth', value: 6, status: 'DATE', options: [] },
      { name: 'Gender', value: 4, status: 'DROPDOWN', options: [] },
      { name: 'Phone Number', value: 8, status: 'PHONE_NUMBER', options: [] },
      { name: 'National Identity Number', value: 10, status: 'NUMBER', options: [] },
      { name: 'Local Government Area', value: 4, status: 'DROPDOWN', options: [] },
      { name: 'Email', value: 7, status: 'EMAIL', options: [] },
      { name: 'Address', value: 2, status: 'LONG_TEXT', options: [] },
    ],
    automatedFields: [
      {
        name: 'Beneficiary age',
        value: 50,
        options: [
          {
            label: '46-55',
            value: '46-55',
            weight: 20,
          },
          {
            label: '36-45',
            value: '36-45',
            weight: 15,
          },
          {
            label: '26-35',
            value: '26-35',
            weight: 10,
          },
          {
            label: '18-25',
            value: '18-25',
            weight: 5,
          },
        ],
      },
      {
        name: 'Years in Service',
        value: 50,
        options: [
          {
            label: '16-20',
            value: '16-20',
            weight: 20,
          },
          {
            label: '11-15',
            value: '11-15',
            weight: 15,
          },
          {
            label: '6-10',
            value: '6-10',
            weight: 10,
          },
          {
            label: '0-5',
            value: '0-5',
            weight: 5,
          },
        ],
      },
    ],
  },
};

const ProgramFormContext = createContext<UseFormReturn<ProgramSchema> | null>(null);

export const ProgramFormProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm<ProgramSchema>({ defaultValues, resolver: zodResolver(programSchema) });

  return <ProgramFormContext.Provider value={form}>{children}</ProgramFormContext.Provider>;
};

export const useProgramForm = () => {
  const programFormContext = useContext(ProgramFormContext);

  if (!programFormContext) throw new Error('useProgramForm must be used within ProgramFormProvider');

  return programFormContext;
};
