'use client';

import { Button, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useFillForm } from '@/hooks/useFillForm';
import { useGetProgramForm } from '@/hooks/useGetProgramForm';
import { BeneficiarySuccessModal } from '@/shared/chakra/modals/BeneficiarySuccessModal';
import { Form } from '@/types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import FormInput from './form-input';

type Props = {
  beneficiaryForm?: Form;
  moduleName?: string;
};

export default function ModuleForm({ beneficiaryForm, moduleName }: Props) {
  const { programId, userCode } = useParams();
  const [code, setCode] = useState('');
  const [stateQuestionId, setStateQuestionId] = useState('');
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
          if (question.mandatory)
            fieldSchema = z
              .string({ invalid_type_error: 'Phone number is required' })
              .refine(isValidPhoneNumber, 'Invalid phone number');
          else
            fieldSchema = z
              .string()
              .nullable()
              .refine(
                (value) => (value && value !== '+234' ? isValidPhoneNumber(value) : true),
                'Invalid phone number'
              );
          break;

        case 'DATE':
          fieldSchema = z.coerce.date();
          break;

        case 'DROPDOWN':
          if (questionLabel === 'state' || questionLabel === 'lga') fieldSchema = z.coerce.number();
          else fieldSchema = z.string().min(1, 'This field is required');
          break;

        default:
          fieldSchema = z.string().min(1, 'This field is required');
      }

      schemaFields[question.id] = question.mandatory ? fieldSchema : fieldSchema.or(z.literal(''));
    });

    return z.object(schemaFields);
  }, [questions]);

  const Schema = generateSchema();
  type FormValues = z.infer<typeof Schema>;

  const defaultValues = useMemo(
    () =>
      questions.reduce(
        (acc, question) => ({
          ...acc,
          [question.id]: question.question === 'User code' && userCode ? `${userCode}` : '',
        }),
        {} as FormValues
      ),
    [questions, userCode]
  );

  const form = useForm<FormValues>({ resolver: zodResolver(Schema), defaultValues });

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  const { mutate: fillForm, isPending } = useFillForm();

  const onSubmit = (data: FormValues) => {
    if (!programForm) return;

    const formId = beneficiaryForm?.id ?? programForm.body.form?.id ?? '';

    const formEntries = Object.entries(data);

    const formAnswers = formEntries.map(([question, value]) => {
      const questionInfo = questions.find((q) => q.id === question);
      if (!questionInfo) return { label: '', value: '', question: '' };
      const label = questionInfo.question;
      const bankCode = form.getValues('bankCode');
      const isAccountNumber = label.toLowerCase() === 'recipient account number';
      return { label, value: isAccountNumber ? `${value}, ${bankCode}` : value, question };
    });

    fillForm(
      [{ programId: programId.toString(), formId, moduleName: moduleName || programForm.body.moduleName, formAnswers }],
      {
        onSuccess: (response) => {
          setCode(response.body[0].code);
          onOpen();
        },
      }
    );
  };

  useEffect(() => {
    const stateQuestion = questions.find((question) => question.question === 'State');
    if (stateQuestion) setStateQuestionId(stateQuestion.id);
  }, [questions]);

  if (!questions || questions.length < 0)
    return (
      <Text textAlign="center" variant="Body2Semibold">
        No questions found
      </Text>
    );

  return (
    <Stack flex="1">
      <BeneficiarySuccessModal isOpen={isOpen} onClose={onClose} code={code} isApplication={!beneficiaryForm} />
      <Stack gap="4" as="form" onSubmit={form.handleSubmit(onSubmit)}>
        {questions.map((question, index) => (
          <FormInput
            key={question.id}
            question={question}
            form={form}
            number={index + 1}
            stateQuestionId={stateQuestionId}
          />
        ))}
        <Button
          type="submit"
          variant="primary"
          size="default"
          w="full"
          maxW="20rem"
          ml="auto"
          mt="2"
          isDisabled={hasErrors}
          isLoading={isPending}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
