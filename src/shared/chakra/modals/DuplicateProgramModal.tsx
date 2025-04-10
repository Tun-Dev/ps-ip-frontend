import { useAddProgramToGroup } from '@/hooks/useAddProgramToGroup';
import { useCreateForm } from '@/hooks/useCreateForm';
import { useCreateProgram } from '@/hooks/useCreateProgram';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useGetQuestionTypes } from '@/hooks/useGetQuestionTypes';
import type { FormPayload, FormResponse, Program, ProgramModulesDetails, ProgramPayload } from '@/types';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({ programName: z.string().min(1, 'Program Name is required') });

type FormValues = z.infer<typeof Schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
};

export const DuplicateProgramModal = ({ isOpen, onClose, program }: Props) => {
  const { folderID } = useParams();
  const { response: programDetails } = useGetProgramById(program.id);
  const { data: modules } = useGetModules();
  const { data: programTypes } = useGetProgramTypes();
  const { data: questionTypes } = useGetQuestionTypes();
  const { mutate: createForm, isPending: isCreatingForm } = useCreateForm();
  const { mutate: createProgram, isPending: isCreatingProgram } = useCreateProgram();
  const { mutate: addProgramToGroup, isPending: isAddingToProgramToGroup } = useAddProgramToGroup();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(Schema) });

  const mapProgramModules = () => {
    if (!programDetails) return [];

    const programModules: ProgramPayload['programModules'] = programDetails.body.programModules.map((module) => {
      const dataPoints = module.form ? module.form.questions.filter((question) => !!question.dataPoint) : [];

      return {
        guidelines: module.moduleGuidelines.map((guideline) => guideline.id),
        moduleId: getModuleId(module.module),
        order: module.order,
        isBase: false,
        dataPoints: dataPoints.map((question) => ({ dataPoint: question.dataPoint!, isRequired: question.mandatory })),
      };
    });

    return programModules;
  };

  const handleCreateProgram = (programName: string, forms?: FormResponse[]) => {
    if (!programDetails) return;
    const mappedModules = mapProgramModules();

    // If forms are provided, map the formId to the programModule
    const programModules = forms
      ? mappedModules.map((module) => {
          const matchingForm = forms.find((form) => form.programModuleId === module.moduleId);
          if (matchingForm) return { ...module, formId: matchingForm.formId };
          return module;
        })
      : mappedModules;

    const payload: ProgramPayload = {
      name: programName,
      description: programDetails.body.description,
      logo: programDetails.body.logoId,
      target: programDetails.body.target,
      programTypeId: getProgramType(programDetails.body.programType),
      coverPhoto: programDetails.body.coverPhotoId,
      eligibilityCriteria: programDetails.body.eligibilityCriteria.map((criterion) => criterion.criteria),
      programModules: programModules,
      hasAutomaticVerification: false,
    };

    createProgram(payload, {
      onSuccess: (response) => handleAddProgramToGroup(response.body),
    });
  };

  const handleAddProgramToGroup = (response: Program) => {
    const payload = { id: folderID.toString(), programIds: [response.id] };

    addProgramToGroup(payload, {
      onSuccess: () => {
        toast({ title: 'Program Duplicated successfully', status: 'success' });
        reset();
        onClose();
      },
    });
  };

  const getModuleId = (moduleName: string) => modules?.body.find((module) => module.name === moduleName)?.id ?? 0;

  const getProgramType = (type: string) => programTypes?.body.find((pt) => pt.type === type)?.id ?? 0;

  const getQuestionType = (type: string) => questionTypes?.body.find((qt) => qt.status === type)?.value ?? 0;

  const getSurveyFormPayload = (programName: string, module: ProgramModulesDetails) => {
    const payload: FormPayload = {
      moduleId: getModuleId(module.module),
      program: programName,
      questions: module.form.questions.map((field) => ({
        question: field.question,
        type: getQuestionType(field.type),
        options: field.options.map((option) => ({ label: option.label, value: option.value })),
        mandatory: field.mandatory,
      })),
    };

    return payload;
  };

  const getVettingFormPayload = (programName: string, module: ProgramModulesDetails) => {
    const payload: FormPayload = {
      moduleId: getModuleId(module.module),
      program: programName,
      totalFormScore: module.form.totalFormScore,
      minVetScore: module.form.minVetScore,
      questions: module.form.questions.map((field) => ({
        question: field.question,
        type: getQuestionType(field.type),
        total: field.total,
        options: field.options.map((option) => ({ label: option.label, value: option.value, weight: option.weight })),
        mandatory: field.mandatory,
      })),
    };

    return payload;
  };

  const onSubmit = ({ programName }: FormValues) => {
    if (!programDetails) return toast({ title: 'Program not found', status: 'error' });

    const surveyModule = programDetails.body.programModules.find((module) => module.module === 'Survey');
    const vettingModule = programDetails.body.programModules.find((module) => module.module === 'Vetting');

    if (surveyModule || vettingModule) {
      const formsToCreate: FormPayload[] = [];

      if (surveyModule) formsToCreate.push(getSurveyFormPayload(programName, surveyModule));
      if (vettingModule) formsToCreate.push(getVettingFormPayload(programName, vettingModule));

      createForm(formsToCreate, {
        onSuccess: (response) => {
          handleCreateProgram(programName, response.body);
        },
      });
    } else handleCreateProgram(programName);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
        <ModalOverlay />
        <ModalContent as="form" borderRadius="12px" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <Text variant="Body1Semibold">Duplicate Program</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <FormControl isInvalid={!!errors.programName} isRequired>
                <FormLabel htmlFor="programName">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Program Name
                  </Text>
                </FormLabel>
                <Input id="programName" variant="primary" placeholder="iDICE" {...register('programName')} />
                <FormErrorMessage>{errors.programName && errors.programName.message}</FormErrorMessage>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              w="full"
              h="3rem"
              type="submit"
              isLoading={isAddingToProgramToGroup || isCreatingProgram || isCreatingForm}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
