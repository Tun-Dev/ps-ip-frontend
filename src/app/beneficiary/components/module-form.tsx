'use client';

import { Box, Button, Flex, Icon, Stack, Text, useToast, Image, useClipboard } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useFillForm } from '@/hooks/useFillForm';
import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { QuestionDetails } from '@/types';
import FormInput from './form-input';
import { MultiStepHeaderBen } from './MultiStepHeaderBen';
import { MdCheckCircle, MdRefresh } from 'react-icons/md';
import { MODULE_STATUS } from './module-status';
import { useEffect, useState } from 'react';

export default function ModuleForm() {
  const toast = useToast();
  // const router = useRouter();
  const { programId } = useParams();
  const { data: programForm } = useGetProgramForm(programId.toString());
  const questions = programForm?.body.form.questions ?? [];
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState('');
  const { onCopy, setValue } = useClipboard('');

  console.log(programForm);

  const Schema = generateSchema(questions);
  type FormValues = z.infer<typeof Schema>;

  const defaultValues = questions.reduce((acc, question) => ({ ...acc, [question.id]: '' }), {} as FormValues);

  const form = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const { mutate: fillForm, isPending } = useFillForm();

  const onSubmit = (data: FormValues) => {
    if (!programForm) return;

    const formEntries = Object.entries(data);

    const formAnswers = formEntries.map(([question, value]) => {
      const label = questions.find((q) => q.id === question)?.question ?? '';
      return { value, label, question };
    });

    fillForm(
      [
        {
          programId: programForm.body.programId,
          formId: programForm.body.form.id,
          moduleName: programForm.body.moduleName,
          formAnswers,
        },
      ],
      {
        onSuccess: (response) => {
          setCode(response.body[0].code);
          setValue(response.body[0].code);
          setSuccess(true);
          toast({ title: 'Success', description: 'Form submitted successfully', status: 'success' });
          // router.push(`/beneficiary/${programId}/verify`);
        },
      }
    );
  };

  useEffect(() => {
    console.log(code);
  }, [code]);

  if (!programForm || !programForm.body.form || !questions || questions.length < 0)
    return (
      <Text textAlign="center" variant="Body2Semibold">
        No questions found
      </Text>
    );

  const moduleStatus = MODULE_STATUS[programForm.body.moduleName] || MODULE_STATUS.default;

  return (
    <Flex flexDir="column" h="full" borderRadius="12px" overflow="hidden">
      <Flex h="180px" bg="url(/images/benHeader2.png)" p="18px 24px" pos="relative" alignItems="flex-end">
        <Box
          bg="linear-gradient(0deg, rgba(7, 125, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%)"
          pos="absolute"
          w="full"
          h="full"
          top="0"
          left="0"
        />
        <Flex justifyContent="space-between" alignItems="center" h="fit-content" w="full" zIndex={2}>
          <Text variant="Header1Bold" color="white">
            {programForm.body.programName}
          </Text>
        </Flex>
      </Flex>
      {success ? (
        <Flex flexDir="column" p="24px" flex="1 1 0%" alignItems="center" justifyContent="center">
          <Flex mb="16px" alignItems="center" gap="4px">
            <Text variant="Body1Semibold" color="text">
              {moduleStatus.status}
            </Text>
            <Icon as={MdCheckCircle} boxSize="20px" color="primary.600" />
          </Flex>
          <Flex
            p="12px 16px"
            bg="primary.50"
            borderRadius="12px"
            flexDir="column"
            w="fit-content"
            boxShadow="banner"
            gap="12px"
            h="176px"
          >
            <Flex alignItems="center" gap="4px">
              <Text variant="Body2Semibold" color="primary.600">
                {/* {`${programForm.body.moduleName} in Progress`} */}
                Verification in Progress
              </Text>
              <Icon as={MdRefresh} color="secondary.600" boxSize="16px" />
            </Flex>

            <Flex flex="1 1 0%" justifyContent="center" alignItems="center">
              <Image src={`/icons/Verification.svg`} alt={programForm.body.moduleName} height="100%" />
            </Flex>
          </Flex>
          <Flex flexDir="column" gap="20px" mt="48px" alignItems="center">
            <Text variant="Body2Regular" color="grey.500">
              Please provide this USER Code during your enumeration.
            </Text>

            <Box bg="primary.150" p="8px 16px" borderRadius="6px">
              <Text variant="Header1Bold">{code}</Text>
            </Box>

            <Button
              variant="primary"
              onClick={() => {
                onCopy();
                toast({ title: 'Link copied to clipboard', status: 'success' });
              }}
            >
              Copy code
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex flexDir="column" p="24px" flex="1 1 0%">
          <Box borderBottom="1px solid" borderBottomColor="grey.200" pb="24px">
            <MultiStepHeaderBen
              currentModule={programForm.body.moduleName}
              availableModules={programForm.body.availableModules}
            />
          </Box>

          <Flex flex="1 1 0%" mt="24px" mb="48px" flexDir="column">
            <Stack gap="6" as="form" onSubmit={form.handleSubmit(onSubmit)}>
              {questions.map((question) => (
                <FormInput key={question.id} question={question} form={form} />
              ))}
              <Button
                type="submit"
                variant="primary"
                size="default"
                w="full"
                maxW="20rem"
                mx="auto"
                mt="8"
                isDisabled={hasErrors}
                isLoading={isPending}
              >
                Submit
              </Button>
            </Stack>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

const generateSchema = (questions: QuestionDetails[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  questions.forEach((question) => {
    let fieldSchema: z.ZodTypeAny = z.string();

    switch (question.type) {
      case 'NUMBER':
        fieldSchema = z.coerce.number();
      case 'KYC':
        fieldSchema = z
          .string()
          .min(11, `${question.question} must be 11 digits`)
          .max(11, `${question.question} must be 11 digits`);
        break;
      case 'EMAIL':
        fieldSchema = z.string().email();
        break;
      case 'DATE':
        fieldSchema = z.coerce.date();
        break;
      default:
        fieldSchema = question.mandatory ? z.string().min(1, 'This field is required') : z.string();
    }

    schemaFields[question.id] = question.mandatory ? fieldSchema : fieldSchema.optional();
  });

  return z.object(schemaFields);
};
