'use client';

import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useGetQuestionTypes } from '@/hooks/useGetQuestionTypes';
import { ProgramModulesDetails, QuestionType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const surveyFormSchema = z.object({
  id: z.string().optional(),
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
  id: z.string().optional(),
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

const programSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  logo: z.number().min(1, 'Logo is required'),
  target: z.coerce.number().min(1, 'Target is required'),
  description: z.string().min(1, 'Description is required'),
  programTypeId: z.coerce.number().min(1, 'Program type is required'),
  coverPhotoID: z.number().min(1, 'Cover Photo is Required'),
  eligibilityCriteria: z.array(z.string()).min(1, 'At least one eligibility criterion is required'),
  programModules: z.array(programModuleSchema),
  surveyForm: surveyFormSchema,
  vettingForm: vettingFormSchema,

  // To keep the images from one step to another but we not submitting it
  logoFile: z.string().optional(),
  coverPhotoFile: z.string().optional(),
});

type ProgramSchema = z.infer<typeof programSchema>;

const defaultValues = {
  programModules: [],
  surveyForm: {
    fields: [
      { name: 'Full Name', value: 1, status: 'SHORT_TEXT', options: [] },
      { name: 'Upload Picture', value: 0, status: 'UPLOAD', options: [] },
      { name: 'Date of Birth', value: 6, status: 'DATE', options: [] },
      {
        name: 'Gender',
        value: 4,
        status: 'DROPDOWN',
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
      },
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
      {
        name: 'Gender',
        value: 4,
        status: 'DROPDOWN',
        options: [
          { label: 'Male', value: 'Male' },
          { label: 'Female', value: 'Female' },
        ],
      },
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

const mapSurveyFields = (module?: ProgramModulesDetails, questionTypes?: QuestionType[]) => {
  if (!module) return [];
  return module.form.questions.map((question) => ({
    name: question.question,
    value: questionTypes?.find((type) => type.status === question.type)?.value ?? 0,
    status: question.type,
    options: question.options?.map((option) => ({ label: option.label, value: option.value })) ?? [],
  }));
};

const mapVettingFields = (module?: ProgramModulesDetails) => {
  if (!module) return [];
  return module.form.questions.map((question) => ({
    name: question.question,
    value: question.total,
    options:
      question.options?.map((option) => ({ label: option.label, value: option.value, weight: option.weight })) ?? [],
  }));
};

const mapDataPoints = (module: ProgramModulesDetails) => {
  if (module.module !== 'Application' && module.module !== 'Enumeration') return [];
  return module.form.questions.map((question) => ({
    dataPoint: {
      id: question.dataPoint,
      format: { options: question.options, type: question.type },
      question: question.question,
      type: question.question,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    },
    isRequired: question.mandatory,
  }));
};

export const ProgramFormProvider = ({ children }: { children: ReactNode }) => {
  const { programID } = useParams();
  const { response } = useGetProgramById(programID?.toString());
  const { data: programTypes } = useGetProgramTypes();
  const { data: questionTypes } = useGetQuestionTypes();
  const { data: modules } = useGetModules();

  const form = useForm<ProgramSchema>({ defaultValues, resolver: zodResolver(programSchema) });

  useEffect(() => {
    if (!programID) form.reset(defaultValues);
  }, [form, programID]);

  useEffect(() => {
    if (!response) return;

    const program = response.body;
    const surveyModule = program.programModules.find((module) => module.module === 'Survey');
    const vettingModule = program.programModules.find((module) => module.module === 'Vetting');
    const isManualVetting = vettingModule?.form.minVetScore === undefined;
    const programType = programTypes?.body.find((type) => type.type === program.programType);

    console.log(response);

    form.reset({
      name: program.name,
      logo: program.logoId,
      target: program.target,
      description: program.description,
      programTypeId: programType?.id,
      coverPhotoID: 0,
      eligibilityCriteria: program.eligibilityCriteria.map((item) => item.criteria),
      logoFile: program.logo,
      coverPhotoFile: program.coverPhoto,
      programModules: program.programModules.map((module) => ({
        id: module.id,
        order: module.order,
        formId: module.formId,
        isBase: false,
        moduleId: modules?.body.find((md) => md.name === module.module)?.id ?? 0,
        guidelines: module.moduleGuidelines.map((guideline) => guideline.id),
        dataPoints: mapDataPoints(module),
      })),
      surveyForm: {
        id: program.programModules.find((md) => md.module === 'Survey')?.formId,
        fields: surveyModule ? mapSurveyFields(surveyModule, questionTypes?.body) : defaultValues.surveyForm.fields,
      },
      vettingForm: {
        id: program.programModules.find((md) => md.module === 'Vetting')?.formId,
        type: isManualVetting ? 'manual' : 'automated',
        totalScore: vettingModule?.form.totalFormScore ?? defaultValues.vettingForm.totalScore,
        passScore: vettingModule?.form.minVetScore ?? defaultValues.vettingForm.passScore,
        manualFields: isManualVetting
          ? mapSurveyFields(vettingModule, questionTypes?.body)
          : defaultValues.vettingForm.manualFields,
        automatedFields: isManualVetting ? defaultValues.vettingForm.automatedFields : mapVettingFields(vettingModule),
      },
    });
  }, [questionTypes, form, programTypes, response, modules, programID]);

  return <ProgramFormContext.Provider value={form}>{children}</ProgramFormContext.Provider>;
};

export const useProgramForm = () => {
  const programFormContext = useContext(ProgramFormContext);

  if (!programFormContext) throw new Error('useProgramForm must be used within ProgramFormProvider');

  return programFormContext;
};
