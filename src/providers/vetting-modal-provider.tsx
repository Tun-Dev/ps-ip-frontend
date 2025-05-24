'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useParams } from 'next/navigation';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { useGetBeneficiaryDetails } from '@/hooks/useGetBeneficiaryDetails';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import type { Beneficiary, FormAnswer } from '@/types';
import { FormStatus } from '@/utils';

export type VettingModal = {
  beneficiary: Beneficiary;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
  currentScore: number;
  setCurrentScore: Dispatch<SetStateAction<number>>;
  media: FormAnswer | null;
  setMedia: Dispatch<SetStateAction<FormAnswer | null>>;
  scoreMap: Record<string, number>;
  setScoreMap: Dispatch<SetStateAction<Record<string, number>>>;
  valueMap: Record<string, string>;
  setValueMap: Dispatch<SetStateAction<Record<string, string>>>;
  profile: FormAnswer[];
  questions: FormAnswer[];
  status: FormStatus;
  totalScore: number;
  calculatedScore: number;
  isManual: boolean;
  form: UseFormReturn;
  resetState: () => void;
};

const VettingModalContext = createContext<VettingModal | null>(null);

type VettingModalProviderProps = {
  beneficiary: Beneficiary;
  children: ReactNode;
};

const MODULE_NAME = 'Vetting';

export const VettingModalProvider = ({ beneficiary, children }: VettingModalProviderProps) => {
  const { programID } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [media, setMedia] = useState<FormAnswer | null>(null);
  const [scoreMap, setScoreMap] = useState<Record<string, number>>({});
  const [valueMap, setValueMap] = useState<Record<string, string>>({});

  const { response: program } = useGetProgramById(programID.toString());
  const { data: beneficiaryDetails } = useGetBeneficiaryDetails(beneficiary.id);
  const moduleDetails = beneficiaryDetails?.body.moduleDetails;
  const progressLog = beneficiaryDetails?.body.progressLog;
  const programModules = program?.body.programModules;

  const isManual = useMemo(() => {
    const vettingModule = programModules?.find((md) => md.module === MODULE_NAME);
    if (!vettingModule) return false;
    const manualExist = vettingModule.moduleGuidelines.find((guideline) => guideline.identifier === 'MANUAL');
    if (manualExist) return true;
    return false;
  }, [programModules]);

  const profile = useMemo(
    () =>
      moduleDetails?.find((module) => module.moduleName === 'Application' || module.moduleName === 'Nomination')
        ?.formAnswers ?? [],
    [moduleDetails]
  );

  const questions = useMemo(() => {
    const vettingModule = moduleDetails?.find((module) => module.moduleName === MODULE_NAME);
    if (!vettingModule) return [];
    return vettingModule.formAnswers.filter((answer) => answer.key !== 'User code');
  }, [moduleDetails]);

  const status = useMemo((): FormStatus => {
    if (!progressLog) return FormStatus.PENDING;
    const moduleLog = progressLog.find((log) => log.moduleName === MODULE_NAME);
    if (!moduleLog) return FormStatus.PENDING;
    return moduleLog.status as FormStatus;
  }, [progressLog]);

  const totalScore = useMemo(() => {
    if (!questions) return 0;
    return questions.reduce((acc, answer) => {
      if (!answer.question) return acc;
      const score = answer.question.total ?? 0;
      return acc + score;
    }, 0);
  }, [questions]);

  const calculatedScore = useMemo(() => questions?.reduce((acc, answer) => acc + answer.score, 0) ?? 0, [questions]);

  const Schema = generateSchema(questions);
  type FormValues = z.infer<typeof Schema>;

  const defaultValues = useMemo(() => {
    if (!questions) return {};
    return questions.reduce((acc, answer) => {
      if (answer.question.type === 'MULTIPLE_CHOICE') {
        const value = answer.question.options.find((option) => option.label === answer.value);
        if (!value) return { ...acc, [answer.question.id]: answer.value };
        return { ...acc, [answer.question.id]: value.value };
      }
      return { ...acc, [answer.question.id]: answer.value };
    }, {} as FormValues);
  }, [questions]);

  const form = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });

  const resetState = () => {
    setTabIndex(0);
    setCurrentScore(0);
    setMedia(null);
    setScoreMap({});
    setValueMap({});
  };

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const value = useMemo(
    () => ({
      beneficiary,
      tabIndex,
      setTabIndex,
      currentScore,
      setCurrentScore,
      media,
      setMedia,
      scoreMap,
      setScoreMap,
      valueMap,
      setValueMap,
      profile,
      questions,
      status,
      totalScore,
      calculatedScore,
      isManual,
      form,
      resetState,
    }),
    [
      beneficiary,
      tabIndex,
      currentScore,
      media,
      scoreMap,
      valueMap,
      profile,
      questions,
      status,
      totalScore,
      calculatedScore,
      isManual,
      form,
    ]
  );

  return <VettingModalContext.Provider value={value}>{children}</VettingModalContext.Provider>;
};

export const useVettingModal = () => {
  const value = useContext(VettingModalContext);

  if (!value) throw new Error('useVettingModal must be used within VettingModalProvider');

  return value;
};

export const generateSchema = (formAnswers: FormAnswer[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  formAnswers.forEach((answer) => {
    let fieldSchema: z.ZodTypeAny = z.string();

    switch (answer.question.type) {
      case 'NUMBER':
        fieldSchema = z.coerce.number();
        break;

      case 'KYC':
        fieldSchema = z
          .string()
          .min(11, `${answer.question} must be 11 digits`)
          .max(11, `${answer.question} must be 11 digits`);
        break;

      case 'EMAIL':
        fieldSchema = z.string().email().optional();
        break;

      case 'PHONE_NUMBER':
        if (answer.question.mandatory)
          fieldSchema = z
            .string({ invalid_type_error: 'Phone number is required' })
            .refine(isValidPhoneNumber, 'Invalid phone number');
        else
          fieldSchema = z
            .string()
            .nullable()
            .refine((value) => (value && value !== '+234' ? isValidPhoneNumber(value) : true), 'Invalid phone number');
        break;

      case 'DATE':
        fieldSchema = z.coerce.date();
        break;

      case 'DROPDOWN':
        if (answer.question.question === 'State' || answer.question.question === 'Lga') fieldSchema = z.coerce.number();
        else fieldSchema = z.string().min(1, 'This field is required');
        break;

      default:
        fieldSchema = z.string().min(1, 'This field is required');
    }

    schemaFields[answer.question.id] = answer.question.mandatory ? fieldSchema : fieldSchema.or(z.literal(''));
  });

  return z.object(schemaFields);
};
