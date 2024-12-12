import { Avatar, Box, Button, Grid, Text } from '@chakra-ui/react';

function VettingTab() {
  return (
    <Box>
      <Grid templateColumns="1fr 1fr" columnGap="4.5rem" rowGap="1.5rem" mb="4rem">
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Beneficiary Picture
          </Text>
          <Avatar name="Chukwudi Abubakar Amina" size="xl" boxSize="6.25rem" />
        </Box>
        <Box>
          <Box mb="6">
            <Text variant="Body2Semibold" color="grey.500" mb="2">
              National Identity Number
            </Text>
            <Text variant="Body1Regular">1234 567 8901</Text>
          </Box>
          <Box>
            <Text variant="Body2Semibold" color="grey.500" mb="2">
              Email
            </Text>
            <Text variant="Body1Regular">chukwudiabubakar@gmail.com</Text>
          </Box>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Beneficiary Name
          </Text>
          <Text variant="Body1Regular">Chukwudi Abubakar Amina</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Address
          </Text>
          <Text variant="Body1Regular">No. 44, Gana Street, Maitama, Abuja, FCT</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Date of Birth
          </Text>
          <Text variant="Body1Regular">04/02/1984</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Enumerated by
          </Text>
          <Box
            display="inline-flex"
            gap="0.25rem"
            alignItems="center"
            p="0.25rem"
            pr="0.5rem"
            bgColor="primary.50"
            rounded="1rem"
          >
            <Avatar name="Oluwaseun Chukwu" size="sm" boxSize="1.5rem" />
            <Text variant="Body2Semibold">Oluwaseun Chukwu</Text>
          </Box>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Phone Number
          </Text>
          <Text variant="Body1Regular">0801 234 5678</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Disabled
          </Text>
          <Text variant="Body1Regular">YES</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Local Government Area
          </Text>
          <Text variant="Body1Regular">Ajeromi-Ifelodun</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Literate
          </Text>
          <Text variant="Body1Regular">NO</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Gender
          </Text>
          <Text variant="Body1Regular">Male</Text>
        </Box>
        <Box>
          <Text variant="Body2Semibold" color="grey.500" mb="2">
            Vetting Score
          </Text>
          <Text variant="Body1Bold" color="primary.500">
            85%
          </Text>
        </Box>
      </Grid>
      <Grid templateColumns="1fr 1fr" gap="6">
        <Button variant="accept" w="full" size="default">
          Approve
        </Button>
        <Button variant="cancel" w="full" size="default">
          Deny
        </Button>
      </Grid>
    </Box>
  );
}

export default VettingTab;
