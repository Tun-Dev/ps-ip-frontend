import { Box, Heading, Text, Input, Button, Flex } from '@chakra-ui/react';
import { Dropdown } from '@/components';

const AggregatorModal = () => {
  return (
    <Box
      width="498px"
      height="756px"
      borderRadius="12px"
      backgroundColor="white"
      padding="6"
      border="1px"
      borderColor="gray.200"
    >
      <Flex direction="column" height="100%">
        {' '}
        <Heading as="h2" variant="Body1Semibold" color="black" fontSize="16px" mb={4}>
          Add New Aggregator
        </Heading>
        <Text as="p" fontSize="13px" color="gray.500" mb={2}>
          Aggregator Name
        </Text>
        <Input variant="primary" width="402px" height="40px" placeholder="NURTW" marginBottom={4} />
        <Text as="p" fontSize="13px" color="gray.500" mb={2}>
          Set Maximum Agent
        </Text>
        <Input type="number" variant="primary" width="402px" height="40px" placeholder="300" marginBottom={4} />
        <Text as="p" fontSize="13px" color="gray.500" mb={2}>
          Assign Program
        </Text>
        <Dropdown variant="whiteDropdown" placeholder="INVESTMENT IN DIGITAL AND CREATIVE ENTERPRISES PROGRAM" />
        <Box flex="1" />
        <Button
          variant="primary"
          width="402px"
          height="48px"
          onClick={() => console.log('Aggregator added')}
          marginTop={4}
        >
          Add New Aggregator
        </Button>
      </Flex>
    </Box>
  );
};

export default AggregatorModal;
