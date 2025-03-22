import { useVettingModal } from '@/providers/vetting-modal-provider';
import { FormAnswer } from '@/types';
import { FormStatus } from '@/utils';

import { Box, Flex, Grid, Icon, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import { MdImage, MdInsertDriveFile } from 'react-icons/md';

type QuestionProps = {
  answer: FormAnswer;
  globalIndex: number;
};

export function Question({ globalIndex, answer }: QuestionProps) {
  const { scoreMap, isManual, setMedia, questions, setScoreMap, setCurrentScore, setValueMap, status } =
    useVettingModal();

  const isFile = answer.question.type === 'FILE_UPLOAD';
  const isImage = answer.question.type === 'IMAGE_UPLOAD';

  const handleValueChange = (answerId: string, value: string) =>
    setValueMap((prev) => ({ ...prev, [answerId]: value }));

  const handleScoreChange = (answerId: string, value: string) => {
    const questionInfo = questions.find((q) => q.answerId === answerId);
    if (!questionInfo) return;

    const maxScore = questionInfo.question.total ?? 0;
    const score = value === '' ? 0 : parseInt(value);

    if (score > maxScore) return;
    setScoreMap((prev) => {
      const newScore = { ...prev, [answerId]: score };
      const totalScore = Object.values(newScore).reduce((sum, score) => sum + (score || 0), 0);
      setCurrentScore(totalScore);
      return newScore;
    });
  };

  return (
    <Stack>
      <Flex align="flex-start" justify="space-between" gap="4">
        <Text variant="Body2Semibold" color="grey.500">
          {globalIndex + 1}. {answer.key}
        </Text>
        <Text variant="Body2Regular" flexShrink="0">
          {answer.question.total ?? 0} points
        </Text>
      </Flex>
      {isFile || isImage ? (
        <Box
          rounded="0.375rem"
          overflow="hidden"
          as="button"
          type="button"
          outlineColor="transparent"
          _focusVisible={{ boxShadow: 'outline' }}
          textAlign="left"
          onClick={() => setMedia(answer)}
        >
          <Grid py="2" bgColor="grey.100" placeItems="center">
            <Icon as={isFile ? MdInsertDriveFile : MdImage} boxSize="8" color="grey.300" />
          </Grid>
          <Text variant="Body3Semibold" px="2" py="1" bgColor="primary.100" noOfLines={1}>
            {answer.value.split('/').pop() || answer.value}
          </Text>
        </Box>
      ) : answer.question.type === 'LONG_TEXT' ? (
        <Textarea
          variant="primary"
          border="1px dashed"
          borderColor="grey.300"
          rounded="0.375rem"
          px="2"
          py="1"
          defaultValue={answer.value}
          onChange={(e) => handleValueChange(answer.answerId, e.target.value)}
          isReadOnly
        />
      ) : (
        <Input
          variant="primary"
          border="1px dashed"
          borderColor="grey.300"
          rounded="0.375rem"
          px="2"
          py="1"
          defaultValue={answer.value}
          onChange={(e) => handleValueChange(answer.answerId, e.target.value)}
          isReadOnly
        />
      )}
      <Flex justify="end">
        {isManual && status === FormStatus.PENDING ? (
          <Input
            placeholder="Enter score"
            variant="primary"
            type="number"
            border="1px dashed"
            borderColor="grey.300"
            rounded="0.375rem"
            px="2"
            py="1"
            w="6.5rem"
            min={0}
            max={answer.question.total}
            value={scoreMap[answer.answerId] ?? ''}
            onChange={(e) => handleScoreChange(answer.answerId, e.target.value)}
          />
        ) : (
          <Text variant="Body1Semibold" color="primary.500">
            {answer.score} Points
          </Text>
        )}
      </Flex>
    </Stack>
  );
}
