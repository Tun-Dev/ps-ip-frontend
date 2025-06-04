'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { createContext, useContext, type ReactNode } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const surveyFormSchema = z.object({
  id: z.string().optional(),
  fields: z.array(
    z.object({
      name: z.string(),
      value: z.coerce.number(),
      status: z.string(),
      isRequired: z.boolean(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
    })
  ),
});

const vettingFormSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  totalScore: z.coerce.number(),
  passScore: z.coerce.number(),
  manualTotalScore: z.coerce.number(),
  manualPassScore: z.coerce.number(),
  manualFields: z.array(
    z.object({
      name: z.string(),
      value: z.coerce.number(),
      status: z.string(),
      isRequired: z.boolean(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
    })
  ),
  automatedFields: z.array(
    z.object({
      name: z.string(),
      value: z.coerce.number(),
      status: z.string(),
      isRequired: z.boolean(),
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
  createdAt: z.string(),
  updatedAt: z.string(),
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

const eliCcriItem = z.object({
  id: z.number().nullable(),
  criteria: z.string(),
});

const programSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logo: z.number().min(1, 'Logo is required'),
  target: z.coerce.number().min(1, 'Target is required'),
  description: z.string().min(1, 'Description is required'),
  programTypeId: z.coerce.number().min(1, 'Program type is required'),
  coverPhotoID: z.number().min(1, 'Cover Photo is Required'),
  // Allow eligibilityCriteria to be either an array of objects or an array of strings, with at least one item
  eligibilityCriteria: z.union([
    z.array(eliCcriItem).min(1, { message: 'At least one eligibility criterion is required' }), // Array of objects
    z.array(z.string()).min(1, { message: 'At least one eligibility criterion is required' }), // Array of strings
  ]),
  programModules: z.array(programModuleSchema),
  surveyForm: surveyFormSchema,
  vettingForm: vettingFormSchema,
  // To keep the images from one step to another but we not submitting it
  logoFile: z.string().optional(),
  coverPhotoFile: z.string().optional(),
});

type ProgramSchema = z.infer<typeof programSchema>;

export const defaultValues: ProgramSchema = {
  name: '',
  logo: 0,
  target: 0,
  description: '',
  programTypeId: 0,
  coverPhotoID: 0,
  logoFile: '',
  coverPhotoFile: '',
  eligibilityCriteria: [],
  programModules: [],
  surveyForm: {
    fields: [
      { name: 'Full Name', value: 0, status: 'SHORT_TEXT', isRequired: true, options: [] },
      { name: 'Upload Picture', value: 0, status: 'IMAGE_UPLOAD', isRequired: true, options: [] },
      { name: 'Date of Birth', value: 0, status: 'DATE', isRequired: true, options: [] },
      {
        name: 'Gender',
        value: 0,
        status: 'DROPDOWN',
        isRequired: true,
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
      },
      { name: 'Phone Number', value: 0, status: 'PHONE_NUMBER', isRequired: true, options: [] },
      { name: 'Email', value: 0, status: 'EMAIL', isRequired: true, options: [] },
      { name: 'Address', value: 0, status: 'LONG_TEXT', isRequired: true, options: [] },
    ],
  },
  vettingForm: {
    type: 'manual',
    totalScore: 20,
    passScore: 20,
    manualTotalScore: 30,
    manualPassScore: 15,
    manualFields: [
      {
        name: 'How old is your business?',
        value: 10,
        status: 'SHORT_TEXT',
        isRequired: true,
        options: [],
      },
      { name: 'Why do you deserve this grant?', value: 10, status: 'LONG_TEXT', isRequired: true, options: [] },
      {
        name: 'What is your plan if you were to receive the grant?',
        value: 10,
        status: 'LONG_TEXT',
        isRequired: true,
        options: [],
      },
    ],
    automatedFields: [
      {
        name: '',
        value: 20,
        status: 'MULTIPLE_CHOICE',
        isRequired: true,
        options: [
          { label: '', value: 'Option 1', weight: 20 },
          { label: '', value: 'Option 2', weight: 15 },
          { label: '', value: 'Option 3', weight: 10 },
          { label: '', value: 'Option 4', weight: 5 },
        ],
      },
    ],
  },
};

const ProgramFormContext = createContext<{ form: UseFormReturn<ProgramSchema> } | null>(null);

export const ProgramFormProvider = ({ children }: { children: ReactNode }) => {
  const form = useForm<ProgramSchema>({ defaultValues, resolver: zodResolver(programSchema) });

  return <ProgramFormContext.Provider value={{ form }}>{children}</ProgramFormContext.Provider>;
};

export const useProgramForm = () => {
  const programFormContext = useContext(ProgramFormContext);

  if (!programFormContext) throw new Error('useProgramForm must be used within ProgramFormProvider');

  return programFormContext;
};
