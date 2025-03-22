'use client';

import { Button, Flex, Grid, Icon, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import { useVettingModal } from '@/providers/vetting-modal-provider';
import { FormStatus } from '@/utils';
import { Question } from './question';
import { VettingActions } from './vetting-actions';

const itemsPerPage = 10;

export function QuestionsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const { questions, status } = useVettingModal();

  const paginatedAnswers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return questions.slice(startIndex, startIndex + itemsPerPage);
  }, [questions, currentPage]);

  const totalPages = useMemo(() => Math.ceil(questions.length / itemsPerPage), [questions]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  if (questions.length < 1)
    return (
      <Text variant="Body2Semibold" textAlign="center">
        No questions found
      </Text>
    );

  return (
    <Stack spacing="5">
      <Grid templateColumns="1fr 1fr" columnGap="4.5rem" rowGap="1.5rem">
        {paginatedAnswers.map((answer, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + index;
          return <Question key={index} answer={answer} globalIndex={globalIndex} />;
        })}
      </Grid>
      {totalPages > 1 && (
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
      {status === FormStatus.PENDING && <VettingActions />}
    </Stack>
  );
}
