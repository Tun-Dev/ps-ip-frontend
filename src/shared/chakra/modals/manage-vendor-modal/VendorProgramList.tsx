import { useGetVendorDetails } from '@/hooks/useGetVendorDetails';
import { useRemoveVendorProgram } from '@/hooks/useRemoveVendorProgram';
import type { Vendor, VendorDetails } from '@/types';
import { formatDateForInput, formatErrorMessage } from '@/utils';
import {
  Button,
  Flex,
  Grid,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  onClose: () => void;
  vendor: Vendor;
  setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

export const VendorProgramList = ({ onClose, vendor, setScreen }: Props) => {
  const { data, isPending, isError, error } = useGetVendorDetails(vendor.id);

  return (
    <ModalContent maxW="42.375rem">
      <ModalHeader>
        <Text as="span" variant="Body1Semibold">
          Manage Vendor
        </Text>
        <ModalCloseButton />
      </ModalHeader>
      <ModalBody>
        <Stack gap="4">
          {isPending ? (
            <Grid placeItems="center" h="10rem">
              <Spinner />
            </Grid>
          ) : isError ? (
            <Text>{formatErrorMessage(error)}</Text>
          ) : (
            data.body.map((item) => <Item key={item.vendorProgramId} item={item} />)
          )}
        </Stack>
      </ModalBody>
      <ModalFooter>
        <SimpleGrid w="full" gap="4" columns={2}>
          <Button variant="cancel" height="3rem" w="full" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" height="3rem" w="full" onClick={() => setScreen('assign')}>
            Assign Program
          </Button>
        </SimpleGrid>
      </ModalFooter>
    </ModalContent>
  );
};

const Item = ({ item }: { item: VendorDetails }) => {
  const { mutate, isPending } = useRemoveVendorProgram();
  return (
    <Stack border="1px solid" borderColor="grey.200" borderRadius="12px" p="4">
      <Flex pb="8px" justifyContent="space-between" borderBottom="1px solid" borderBottomColor="grey.200">
        <Text variant="Body1Semibold">{item.programName}</Text>
        <Text variant="Body2Semibold" color="#006430">
          {item.programType}
        </Text>
      </Flex>
      <Flex align="center" justify="space-between" gap="4" alignItems="center">
        <SimpleGrid columns={3} gap="4" flex="1">
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              Schedule date
            </Text>
            <Text variant="Body1Semibold">{formatDateForInput(item.scheduledDate)}</Text>
          </Stack>
          <Stack>
            <Text variant="Body2Semibold" color="grey.500">
              End date
            </Text>
            <Text variant="Body1Semibold">{formatDateForInput(item.endDate)}</Text>
          </Stack>
        </SimpleGrid>
        <Button
          w="156px"
          h="2rem"
          variant="cancel"
          fontSize="10px"
          fontWeight="600"
          isLoading={isPending}
          onClick={() => mutate(item.vendorProgramId)}
        >
          Remove Program
        </Button>
      </Flex>
    </Stack>
  );
};
