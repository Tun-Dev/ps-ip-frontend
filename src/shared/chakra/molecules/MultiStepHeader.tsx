import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

const MultiStepHeader = () => {
  return (
    <Flex justifyContent="center" gap="8px">
      <StepItem />
      <StepItem />
      <StepItem />
      <StepItem />
    </Flex>
  );
};

export { MultiStepHeader };

const StepItem = () => {
  return (
    <Flex flexDir="column" gap="8px" alignItems="center" boxSize="80px">
      <Flex
        w="60px"
        h="56px"
        borderRadius="50%"
        border="1px dashed"
        borderColor="secondary.600"
        p="8px"
        justifyContent="center"
        alignItems="center"
      >
        <Flex w="44px" h="40px" bg="secondary.600" borderRadius="50%" justifyContent="center" alignItems="center">
          <Text variant="Body1Bold">1</Text>
        </Flex>
      </Flex>
      <Text variant="Body3Bold">Select Modules</Text>
    </Flex>
  );
};
