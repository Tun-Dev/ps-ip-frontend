'use client';

import { Button, Flex, Icon, Stack, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { z } from 'zod';

import { useFillForm } from '@/hooks/useFillForm';
import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { BeneficiarySuccessModal } from '@/shared/chakra/modals/BeneficiarySuccessModal';
import { Form } from '@/types';
import FormInput from './form-input';

type Props = {
  beneficiaryForm?: Form;
  moduleName?: string;
};

const itemsPerPage = 5;

export default function ModuleForm({ beneficiaryForm, moduleName }: Props) {
  const { programId, userCode } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [code, setCode] = useState('');
  const [stateQuestionId, setStateQuestionId] = useState('');
  const [previousStateQuestionId, setPreviousStateQuestionId] = useState<string | undefined>(undefined);
  const toast = useToast();
  const route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: programForm } = useGetProgramForm(`${programId}`);
  const questions = useMemo(
    () => beneficiaryForm?.questions ?? programForm?.body.form?.questions ?? [],
    [programForm, beneficiaryForm]
  );

  const generateSchema = useCallback(() => {
    const schemaFields: Record<string, z.ZodTypeAny> = {};

    questions.forEach((question) => {
      let fieldSchema: z.ZodTypeAny = z.string();
      const questionLabel = question.question.toLowerCase();
      const isStateOrLga =
        questionLabel === 'state' ||
        questionLabel === 'lga' ||
        questionLabel === 'previous state' ||
        questionLabel === 'previous lga' ||
        questionLabel === 'state of origin';

      switch (question.type) {
        case 'NUMBER':
          fieldSchema = z.coerce.number();
          break;
        case 'KYC':
          const maxLength = questionLabel === 'recipient account number' ? 10 : 11;
          fieldSchema = z
            .string()
            .min(maxLength, `${question.question} must be ${maxLength} digits`)
            .max(maxLength, `${question.question} must be ${maxLength} digits`);
          if (questionLabel === 'cac registration number' || questionLabel === 'voters card')
            fieldSchema = z.string().min(1, 'This field is required');
          break;
        case 'EMAIL':
          fieldSchema = z.string().email().optional();
          break;
        case 'PHONE_NUMBER':
          fieldSchema = question.mandatory
            ? z
                .string({ invalid_type_error: 'This field is required' })
                .refine(isValidPhoneNumber, 'Invalid phone number')
            : z
                .string()
                .nullable()
                .refine(
                  (value) => (value && value !== '+234' ? isValidPhoneNumber(value) : true),
                  'Invalid phone number'
                );
          break;
        case 'DATE':
          fieldSchema =
            questionLabel === 'date of birth'
              ? z.coerce.date().refine((date) => {
                  const today = new Date();
                  const birthDate = new Date(date);
                  const age = today.getFullYear() - birthDate.getFullYear();
                  const monthDiff = today.getMonth() - birthDate.getMonth();
                  const dayDiff = today.getDate() - birthDate.getDate();
                  const isEighteen = age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
                  return isEighteen;
                }, 'You must be at least 18 years old')
              : z.coerce.date();
          break;
        case 'DROPDOWN':
          fieldSchema = isStateOrLga ? z.coerce.number() : z.string().min(1, 'This field is required');
          break;
        case 'GENDER':
          fieldSchema = z.enum(['Male', 'Female'], {
            errorMap: () => ({ message: 'Invalid gender selection' }),
          });
          break;
        default:
          fieldSchema = z.string().min(1, 'This field is required');
      }

      schemaFields[question.id] = question.mandatory ? fieldSchema : fieldSchema.or(z.literal(''));

      // Add confirm field for email type
      if (question.type === 'EMAIL') schemaFields[`confirm-${question.id}`] = schemaFields[question.id];
    });

    let schema: z.ZodTypeAny = z.object(schemaFields);

    const emailFields = questions.filter((question) => question.type === 'EMAIL');

    // Add validation for each confirm email field
    emailFields.forEach((emailField) => {
      schema = schema.refine((data) => data[`confirm-${emailField.id}`] === data[emailField.id], {
        message: "Emails don't match",
        path: [`confirm-${emailField.id}`],
      });
    });

    return schema;
  }, [questions]);

  const Schema = generateSchema();
  type FormValues = z.infer<typeof Schema>;

  const defaultValues = useMemo(() => {
    const savedData = localStorage.getItem(`form-${programId}-${userCode}`);
    const parsedData = savedData ? JSON.parse(savedData) : {};

    if (savedData) return parsedData;

    return questions.reduce(
      (acc, question) => ({
        ...acc,
        [question.id]: question.question === 'User code' && userCode ? userCode.toString() : '',
      }),
      {} as FormValues
    );
  }, [questions, userCode, programId]);

  const visibleQuestions = useMemo(() => questions.filter((q) => q.type !== 'GPS'), [questions]);

  const totalPages = useMemo(() => {
    if (moduleName !== 'Vetting') return 1;
    return Math.ceil(visibleQuestions.length / itemsPerPage);
  }, [visibleQuestions, moduleName]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const form = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const { mutate: fillForm, isPending } = useFillForm();

  const onSubmit = (data: FormValues) => {
    if (!programForm) return;

    const formId = beneficiaryForm?.id ?? programForm.body.form?.id ?? '';

    const formAnswers = Object.entries(data)
      .filter(([question]) => questions.some((q) => q.id === question))
      .map(([question, value]) => {
        const questionInfo = questions.find((q) => q.id === question)!;
        const label = questionInfo.question;
        const bankCode = form.getValues('bankCode');
        const isAccountNumber = label.toLowerCase() === 'recipient account number';
        return { label, value: isAccountNumber ? `${value}, ${bankCode}` : (value as string), question };
      });

    fillForm(
      [{ programId: programId.toString(), formId, moduleName: moduleName || programForm.body.moduleName, formAnswers }],
      {
        onSuccess: (response) => {
          setCode(response.body[0].code);
          localStorage.removeItem(`form-${programId}-${userCode}`);
          onOpen();
        },
      }
    );
  };

  const handleSaveProgress = () => {
    const formData = { ...form.getValues(), userCode };
    localStorage.setItem(`form-${programId}-${userCode}`, JSON.stringify(formData));
    toast({
      title: 'Progress saved',
      description: 'You can continue later.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    route.push(`/beneficiary/${programId}`);
  };

  useEffect(() => {
    const stateQuestion = questions.find((question) => question.question.toLowerCase() === 'state');
    if (stateQuestion) setStateQuestionId(stateQuestion.id);
  }, [questions]);

  useEffect(() => {
    const previousStateQuestion = questions.find((question) => question.question.toLowerCase() === 'previous state');
    if (previousStateQuestion) setPreviousStateQuestionId(previousStateQuestion.id);
  }, [questions]);

  if (!questions || questions.length === 0)
    return (
      <Text textAlign="center" variant="Body2Semibold">
        No questions found
      </Text>
    );

  return (
    <Stack flex="1">
      <BeneficiarySuccessModal isOpen={isOpen} onClose={onClose} code={code} isApplication={!beneficiaryForm} />
      <Stack gap="4" as="form" onSubmit={form.handleSubmit(onSubmit)}>
        {questions
          .filter((q) => q.type === 'GPS')
          .map((question) => (
            <FormInput
              key={question.id}
              question={question}
              form={form}
              stateQuestionId={stateQuestionId}
              previousStateQuestionId={previousStateQuestionId}
            />
          ))}
        {visibleQuestions.map((question, index) => {
          const isVisible = moduleName !== 'Vetting' || Math.floor(index / itemsPerPage) + 1 === currentPage;

          return (
            <div key={question.id} style={{ display: isVisible ? 'block' : 'none' }}>
              <FormInput
                question={question}
                form={form}
                number={index + 1}
                stateQuestionId={stateQuestionId}
                previousStateQuestionId={previousStateQuestionId}
              />
            </div>
          );
        })}
        {moduleName === 'Vetting' && totalPages > 1 && (
          <Flex justify="flex-end" align="center" gap="4">
            <Button
              variant="secondary"
              size="medium"
              h="auto"
              py="1.5"
              px="3"
              gap="2"
              onClick={handlePrevPage}
              isDisabled={currentPage === 1}
            >
              <Icon as={MdKeyboardArrowLeft} boxSize="3.5" flexShrink="0" />
              Prev page
            </Button>
            <Button
              variant="secondary"
              size="medium"
              h="auto"
              py="1.5"
              px="3"
              gap="2"
              onClick={handleNextPage}
              isDisabled={currentPage === totalPages}
            >
              Next page
              <Icon as={MdKeyboardArrowRight} boxSize="3.5" flexShrink="0" />
            </Button>
          </Flex>
        )}
        <Stack direction={{ base: 'column', xs: 'row' }} spacing={4} mt="2">
          <Button variant="secondary" size="default" w="full" maxW={{ xs: '20rem' }} onClick={handleSaveProgress}>
            Save to Continue Later
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="default"
            w="full"
            maxW={{ xs: '20rem' }}
            isDisabled={hasErrors}
            isLoading={isPending}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
