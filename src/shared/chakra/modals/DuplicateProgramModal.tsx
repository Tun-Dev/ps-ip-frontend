import { useAddProgramToGroup } from '@/hooks/useAddProgramToGroup';
import { useCreateForm } from '@/hooks/useCreateForm';
import { useCreateProgram } from '@/hooks/useCreateProgram';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useGetProgramTypes } from '@/hooks/useGetProgramTypes';
import { useGetQuestionTypes } from '@/hooks/useGetQuestionTypes';
import { useUploadFile } from '@/hooks/useUploadFile';
import type { FormPayload, FormResponse, Program, ProgramModulesDetails, ProgramPayload } from '@/types';
import { imageSchema } from '@/utils';
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { ChangeEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { MdAddCircle } from 'react-icons/md';
import { z } from 'zod';

const Schema = z.object({
  programName: z.string().min(1, 'Program Name is required'),
  logo: z.number().min(1, 'Logo is required'),
  coverPhotoID: z.number().min(1, 'Cover Photo is Required'),
  logoFile: z.string().optional(),
  coverPhotoFile: z.string().optional(),
});

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
    setValue,
    getValues,
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
      logo: Number(getValues('logo')),
      target: programDetails.body.target,
      programTypeId: getProgramType(programDetails.body.programType),
      coverPhoto: Number(getValues('coverPhotoID')),
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

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadFile, isPending } = useUploadFile();
  const preview = getValues('logoFile');

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const { success, error } = imageSchema.safeParse(file);

    if (!success) return toast({ title: 'Error', description: error.flatten().formErrors[0], status: 'error' });

    if (preview) URL.revokeObjectURL(preview);
    e.target.value = '';

    setValue('logoFile', URL.createObjectURL(file));

    uploadFile({ files: [file], type: 'programLogo' }, { onSuccess: (data) => setValue('logo', data.body[0].id) });
  };

  const coverInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadCoverFile, isPending: isCoverPending } = useUploadFile();
  const coverPreview = getValues('coverPhotoFile');

  const handleCoverFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const { success, error } = imageSchema.safeParse(file);

    if (!success) return toast({ title: 'Error', description: error.flatten().formErrors[0], status: 'error' });

    if (preview) URL.revokeObjectURL(preview);
    e.target.value = '';

    setValue('coverPhotoFile', URL.createObjectURL(file));

    uploadCoverFile(
      { files: [file], type: 'programLogo' },
      { onSuccess: (data) => setValue('coverPhotoID', data.body[0].id) }
    );
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
            <Stack spacing="4">
              <Flex alignItems="center" gap="20px">
                <Avatar
                  as="button"
                  type="button"
                  display="grid"
                  placeItems="center"
                  pos="relative"
                  color="grey.300"
                  border="1px dashed"
                  borderColor={!!errors.logo ? 'red !important' : 'grey.300 !important'}
                  rounded="full"
                  boxSize="4.5rem"
                  outlineColor="transparent"
                  _focusVisible={{ boxShadow: 'outline' }}
                  bg="transparent"
                  cursor="default"
                  src={preview}
                  icon={
                    <Text variant="Body3Semibold" color="grey.400" textTransform="capitalize">
                      Logo
                    </Text>
                  }
                  overflow={preview ? 'hidden' : 'visible'}
                  disabled={isPending}
                  opacity={isPending ? 0.5 : 1}
                >
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    hidden
                    onChange={handleFile}
                    ref={inputRef}
                    disabled={isPending}
                  />
                  {preview ? null : (
                    <Icon
                      as={MdAddCircle}
                      color="primary.600"
                      boxSize="1.5rem"
                      pos="absolute"
                      right="-0.25rem"
                      bottom="-0.25rem"
                    />
                  )}
                  {isPending && <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />}
                </Avatar>
                <Button variant="tertiary" bg="secondary.200" size="sm" onClick={() => inputRef.current?.click()}>
                  Upload Photo
                </Button>
              </Flex>
              <Flex
                alignItems="center"
                gap="20px"
                border="1px dashed"
                h="144px"
                w="100%"
                maxW="554px"
                borderRadius="8px"
                justifyContent="center"
                borderColor={!!errors.coverPhotoID ? 'red !important' : 'grey.300 !important'}
                overflow="hidden"
                pos="relative"
              >
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  hidden
                  onChange={handleCoverFile}
                  ref={coverInputRef}
                  disabled={isCoverPending}
                  style={{ position: 'absolute' }}
                />
                {coverPreview && (
                  <Image
                    src={coverPreview}
                    alt=""
                    w="100%"
                    h="100%"
                    pos="absolute"
                    top="0"
                    left="0"
                    objectFit="cover"
                  />
                )}
                {isCoverPending ? (
                  <Spinner color="text" size="sm" pos="absolute" inset="0" m="auto" />
                ) : (
                  <Flex flexDir="column" gap="8px" alignItems="center" zIndex="2">
                    <Text variant="Body2Regular" color="#7D7D7D">
                      Cover Photo
                    </Text>
                    <Button
                      variant="tertiary"
                      bg="secondary.200"
                      size="sm"
                      onClick={() => coverInputRef.current?.click()}
                    >
                      Upload Photo
                    </Button>
                  </Flex>
                )}
              </Flex>
              <FormControl isInvalid={!!errors.programName} isRequired>
                <FormLabel htmlFor="programName">
                  <Text as="span" variant="Body2Semibold" color="grey.500">
                    Program Name
                  </Text>
                </FormLabel>
                <Input id="programName" variant="primary" placeholder="iDICE" {...register('programName')} />
                <FormErrorMessage>{errors.programName && errors.programName.message}</FormErrorMessage>
              </FormControl>
            </Stack>
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
