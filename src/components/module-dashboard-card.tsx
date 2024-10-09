import { Heading, Image, Stack, StackProps, Text } from '@chakra-ui/react';

type Props = {
  text: string;
  number: number;
  image: string;
} & StackProps;

export const ModuleDashboardCard = ({ text, number, image, ...props }: Props) => {
  return (
    <Stack spacing="4" p="4" border="1px solid" borderColor="grey.100" rounded="xl" boxShadow="card" {...props}>
      <Heading as="p" variant="Header2Bold">
        {number.toLocaleString()}
      </Heading>
      <Stack spacing="6" h="full">
        <Image src={image} alt={text} alignSelf="center" h="full" />
        <Text variant="Body1Semibold" color="grey.500">
          {text}
        </Text>
      </Stack>
    </Stack>
  );
};
