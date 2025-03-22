'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useGetQuestionTypes } from '@/hooks/useGetQuestionTypes';
import { defaultValues, useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import type { ProgramModulesDetails, QuestionType } from '@/types';
import AdminSettings from '../../../components/admin-settings';
import EditModules from '../../../components/edit-modules';
import ProgramDetails from '../../../components/program-details';
import Review from '../../../components/review';
import SelectModules from '../../../components/select-modules';

const ProgramEditPage = () => {
  const { programID } = useParams();

  const {
    form: { reset },
  } = useProgramForm();
  const step = useProgramStore((state) => state.step);

  const { response } = useGetProgramById(programID?.toString());
  const { data: programTypes } = useGetProgramTypes();
  const { data: questionTypes } = useGetQuestionTypes();
  const { data: modules } = useGetModules();

  useEffect(() => {
    if (!response) return;

    const program = response.body;
    const surveyModule = program.programModules.find((module) => module.module === 'Survey');
    const vettingModule = program.programModules.find((module) => module.module === 'Vetting');
    const surveyFormId = surveyModule?.formId;
    const vettingFormId = vettingModule?.formId;
    const isManualVetting = vettingModule?.moduleGuidelines.find((guideline) => guideline.identifier === 'MANUAL');
    const programType = programTypes?.body.find((type) => type.type === program.programType);

    reset({
      name: program.name,
      logo: program.logoId,
      target: program.target,
      description: program.description,
      programTypeId: programType?.id,
      coverPhotoID: program.coverPhotoId,
      eligibilityCriteria:
        Array.isArray(program.eligibilityCriteria) &&
        program.eligibilityCriteria.every((item) => typeof item === 'string')
          ? program.eligibilityCriteria.map((criteria) => ({ id: null, criteria })) // Convert strings to objects
          : program.eligibilityCriteria,
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
        id: surveyFormId,
        fields: surveyModule ? mapSurveyFields(surveyModule, questionTypes?.body) : defaultValues.surveyForm.fields,
      },
      vettingForm: {
        id: vettingFormId,
        type: isManualVetting ? 'manual' : 'automated',
        totalScore: isManualVetting ? defaultValues.vettingForm.totalScore : vettingModule?.form.totalFormScore,
        passScore: isManualVetting ? defaultValues.vettingForm.passScore : vettingModule?.form.minVetScore,
        manualTotalScore: isManualVetting
          ? vettingModule?.form.totalFormScore
          : defaultValues.vettingForm.manualTotalScore,
        manualPassScore: isManualVetting ? vettingModule?.form.minVetScore : defaultValues.vettingForm.manualPassScore,
        manualFields: isManualVetting ? mapVettingFields(vettingModule) : defaultValues.vettingForm.manualFields,
        automatedFields: isManualVetting ? defaultValues.vettingForm.automatedFields : mapVettingFields(vettingModule),
      },
    });
  }, [reset, modules, programTypes, questionTypes, response]);

  return (
    <>
      <ProgramDetails display={step === 1 ? 'flex' : 'none'} />
      <SelectModules display={step === 2 ? 'block' : 'none'} />
      <EditModules display={step === 3 ? 'block' : 'none'} />
      <AdminSettings display={step === 4 ? 'block' : 'none'} />
      <Review display={step === 5 ? 'block' : 'none'} />
    </>
  );
};

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
    status: question.type,
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

export default ProgramEditPage;
