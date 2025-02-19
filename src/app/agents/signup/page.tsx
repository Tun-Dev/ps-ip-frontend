'use client';

import { Button, Checkbox, Circle, Divider, Flex, Grid, Input, Link, Text } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import React, { useState } from 'react';
import { MdOutlineCloudDownload } from 'react-icons/md';

const Step1 = ({ action }: { action: () => void }) => {
  return (
    <>
      <Flex
        boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
        w="570px"
        h="264px"
        borderRadius="24px"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        p="40px"
        gap="24px"
      >
        <Text lineHeight="32px" fontSize="24px" fontWeight="700">
          NOTE:
        </Text>
        <Text variant="Body1Regular">
          You would need to grant access to your location before you can re-register as an agent. Your browser will ask
          you for this access. Click “allow” when you are asked.
        </Text>
        <Button variant="primary" w="180px" onClick={() => action()}>
          Continue
        </Button>
      </Flex>
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <Flex
        boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
        w="708px"
        h="1740px"
        borderRadius="24px"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        p="40px"
        gap="24px"
      >
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input first name" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input last name" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input other name" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Click to select dob" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input email" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Gender
          </Text>
          <Select placeholder="Code" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            State of Residence
          </Text>
          <Select placeholder="Select state of residence" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Local Government of Area
          </Text>
          <Select placeholder="Select local government area" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input bvn phone number" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input contact phone number" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input national identification number" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input street name" />
        </Flex>
        <Grid templateColumns="1fr 1fr" gap="16px" w="100%">
          <Flex flexDir="column">
            <Text variant="Body2Semibold" color="grey.500">
              Text
            </Text>
            <Input placeholder="Input house number" />
          </Flex>
          <Flex flexDir="column">
            <Text variant="Body2Semibold" color="grey.500">
              Text
            </Text>
            <Input placeholder="Input city or town" />
          </Flex>
        </Grid>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input number of dependants" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Highest level of school
          </Text>
          <Select placeholder="Select highest level of education" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Input your BVN" />
        </Flex>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Upload Selfie Picture
          </Text>
          <Flex
            border="1px solid"
            borderColor="grey.200"
            flexDir="column"
            gap="8px"
            alignItems="center"
            justifyContent="center"
            h="144px"
            borderRadius="6px"
          >
            <MdOutlineCloudDownload />
            <Text>Drag or click to upload</Text>
            <Text>.png, .jpg</Text>
          </Flex>
        </Flex>
        <Flex w="100%" gap="8px">
          <Checkbox size={'lg'} />
          <Text variant="Body1Regular">
            By checking the box below, I agree to the following{' '}
            <Link color="primary.500" textDecoration="underline" textDecorationColor="primary.500">
              Terms and conditions
            </Link>
          </Text>
        </Flex>
        <Button variant="primary" w="100%">
          Continue
        </Button>
      </Flex>
    </>
  );
};

const Step2 = ({ action }: { action: () => void }) => {
  return (
    <>
      <Flex
        boxShadow={'0px 10px 10px -5px #0330000A, 0px 20px 25px -5px #0330001A'}
        w="548px"
        h="280px"
        borderRadius="24px"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        p="40px"
        gap="24px"
      >
        <Text variant="Body1Regular" color="grey.500" w="100%">
          Enter the code given to you by your agent network company*
        </Text>
        <Flex flexDir="column" w="100%">
          <Text variant="Body2Semibold" color="grey.500">
            Text
          </Text>
          <Input placeholder="Code" />
        </Flex>
        <Button variant="primary" w="200px" onClick={() => action()}>
          ENTER
        </Button>
      </Flex>
    </>
  );
};

const SignupPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <Flex my={'100px'} flexDir="column" alignItems="center" gap="32px">
      <Text w="334px" textAlign="center" fontWeight="600" fontSize="24px" lineHeight="33.6px">
        Welcome to the Agent Registration Portal
      </Text>
      <Flex w="210.9px" justifyContent="space-between" position="relative">
        <Flex flexDir="column" gap="8px" zIndex="3" cursor="pointer">
          <Circle
            bgColor={activeStep === 1 ? 'primary.500' : 'grey.400'}
            size="34.2px"
            onClick={() => setActiveStep(1)}
            color="white"
          >
            1
          </Circle>
          <Text fontWeight="500" fontSize="11.4px" lineHeight="13.8px" color={activeStep === 1 ? 'text' : 'grey.500'}>
            Step 1
          </Text>
        </Flex>
        <Flex flexDir="column" gap="8px" zIndex="3" cursor="pointer">
          <Circle
            bgColor={activeStep === 2 ? 'primary.500' : 'grey.400'}
            size="34.2px"
            onClick={() => setActiveStep(2)}
            color="white"
          >
            2
          </Circle>
          <Text fontWeight="500" fontSize="11.4px" lineHeight="13.8px" color={activeStep === 2 ? 'text' : 'grey.500'}>
            Step 2
          </Text>
        </Flex>
        <Flex flexDir="column" gap="8px" zIndex="3" cursor="pointer">
          <Circle
            bgColor={activeStep === 3 ? 'primary.500' : 'grey.400'}
            size="34.2px"
            onClick={() => setActiveStep(3)}
            color="white"
          >
            3
          </Circle>
          <Text fontWeight="500" fontSize="11.4px" lineHeight="13.8px" color={activeStep === 3 ? 'text' : 'grey.500'}>
            Step 3
          </Text>
        </Flex>
        <Divider position="absolute" w="210.9px" top="17.1px" zIndex="1" color="grey.500" />
      </Flex>
      {activeStep === 1 && <Step1 action={() => setActiveStep(2)} />}
      {activeStep === 2 && <Step2 action={() => setActiveStep(3)} />}
      {activeStep === 3 && <Step3 />}
    </Flex>
  );
};

export default SignupPage;
