import { Flex, Image, Text, Button } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineUploadFile } from 'react-icons/md';

export const NominationForm = () => {
  return (
    <>
      <EmptyState />
    </>
  );
};

const EmptyState = () => {
  return (
    <Flex height="100%" flexDir="column" alignItems="center" gap="16px" pt="80px">
      <Image src="/icons/empty_nom.svg" alt="Empty state" w="100px" />
      <Text variant="Body2Semibold" color="#7D7D7D">
        No Data Available
      </Text>
      <Button mt="16px" leftIcon={<MdOutlineUploadFile />} variant="primary" maxW="320px" w="100%" h="48px">
        Upload Nomination List
      </Button>
    </Flex>
  );
};
