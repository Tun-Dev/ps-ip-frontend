import { FlexProps, Flex, Text } from '@chakra-ui/react';

export const InputContainer = ({
  labelText,
  children,
  ...props
}: { labelText: string; children: React.ReactNode } & FlexProps) => {
  return (
    <Flex flexDir="column" gap="8px" w="430px" {...props}>
      <Text variant="Body2Semibold" color="grey.500">
        {labelText}
      </Text>
      {children}
    </Flex>
  );
};
