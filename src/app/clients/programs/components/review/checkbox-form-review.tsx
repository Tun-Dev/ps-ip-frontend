import { DataPoint } from '@/types';
import { Flex, Stack, Text } from '@chakra-ui/react';
import { MdCheck } from 'react-icons/md';

type Props = {
  dataPoints: { dataPoint: DataPoint; isRequired: boolean }[];
};

export const CheckboxFormReview = ({ dataPoints }: Props) => {
  return (
    <Stack>
      <Text as="h3" variant="Body2Semibold">
        Data Points
      </Text>
      <Flex wrap="wrap" gap="4">
        {dataPoints.map((dataPoint, index) => (
          <Text
            key={index}
            display="inline-flex"
            gap="0.5"
            align="center"
            textAlign="left"
            variant="Body2Semibold"
            color="grey.500"
            lineHeight={1}
          >
            <MdCheck color="var(--chakra-colors-primary-500)" />
            {dataPoint.dataPoint.question}
            {dataPoint.isRequired && (
              <Text as="span" color="red.500" mt="-6px">
                *
              </Text>
            )}
          </Text>
        ))}
      </Flex>
    </Stack>
  );
};
