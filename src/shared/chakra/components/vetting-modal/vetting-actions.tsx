'use client';

import { Button, Divider, Stack } from '@chakra-ui/react';

import { useUpdateScoreSheet } from '@/hooks/useUpdateScoreSheet';
import { useVettingModal } from '@/providers/vetting-modal-provider';

export function VettingActions() {
  const { questions, beneficiary, scoreMap, form } = useVettingModal();

  const { mutate: updateScoreSheet, isPending } = useUpdateScoreSheet();

  const onUpdate = () => {
    const formEntries = Object.entries(form.getValues());

    const answers = formEntries.map(([question, value]) => {
      const questionInfo = questions.find((q) => q.question.id === question);
      if (!questionInfo) return { answerId: '', score: 0, question: '', value: '' };
      return {
        answerId: questionInfo.answerId,
        score: Number(scoreMap[questionInfo.answerId] ?? questionInfo.score),
        question,
        value,
      };
    });
    updateScoreSheet({ beneficiaryId: beneficiary.id, answers });
  };

  return (
    <Stack gap="5" w="full" align="center" pt="5">
      <Divider borderColor="grey.200" opacity="1" />
      <Button variant="primary" size="default" w="full" maxW="33.75rem" onClick={onUpdate} isLoading={isPending}>
        Submit
      </Button>
    </Stack>
  );
}
