// import { useGetVendorDetails } from '@/hooks/useGetVendorDetails';
import { useAddExistingWhiteList } from '@/hooks/useAddExistingWhiteList';
import { useGetWhitelistByProgramId } from '@/hooks/useGetWhitelistByProgramId';
import { WhitelistDetails } from '@/types';
// import { useRemoveVendorProgram } from '@/hooks/useRemoveVendorProgram';
// import type { VendorDetails, WhitelistDetails } from '@/types';
import { formatErrorMessage } from '@/utils';
// import { formatErrorMessage } from '@/utils';
import {
  Button,
  Flex,
  Grid,
  //   Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  // SimpleGrid,
  Spinner,
  //   Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  beneficiariesIds: string[];
  programID: string | string[];
  selectedIds: string[];
  //   setScreen: Dispatch<SetStateAction<'list' | 'assign'>>;
};

export const AddExistingWhiteListBucket = ({ isOpen, onClose, beneficiariesIds, programID }: Props) => {
  const toast = useToast();
  const { data, isPending, isError, error } = useGetWhitelistByProgramId(
    { page: 1, pageSize: 999 },
    programID?.toLocaleString()
  );

  const { mutate: addExistingWhitelist } = useAddExistingWhiteList();

  const onSubmit = (id: string) => {
    console.log('working');
    const payload = {
      programId: programID?.toLocaleString(),
      whitelistId: id,
      beneficiaryIds: beneficiariesIds,
    };

    console.log('payload', payload);

    addExistingWhitelist(payload, {
      onSuccess: () => {
        toast({ title: `Added to Whitelist successfully`, status: 'success' });
        onClose();
      },
    });
  };

  console.log(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent maxW="42.375rem">
        <ModalHeader>
          <Text as="span" variant="Body1Semibold">
            Add to Existing Whitelist
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
              data.body.data.map((item) => <Item key={item.id} item={item} onClick={() => onSubmit(item.id)} />)
            )}
            {/* <Item item={data} /> */}
          </Stack>
        </ModalBody>
        <ModalFooter>
          {/* <SimpleGrid w="full" gap="4" columns={2}>
            <Button variant="cancel" height="3rem" w="full" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              height="3rem"
              w="full"
              // onClick={() => setScreen('assign')}
            >
              Assign Program
            </Button>
          </SimpleGrid> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const Item = ({ item, onClick }: { item: WhitelistDetails; onClick: () => void }) => {
  return (
    <Stack border="1px solid" borderColor="grey.200" borderRadius="12px" p="4">
      <Flex pb="8px" justifyContent="space-between" borderBottom="1px solid" borderBottomColor="grey.200">
        <Text variant="Body1Semibold">{item.name}</Text>
        <Button w="156px" h="2rem" variant="secondary" fontSize="10px" fontWeight="600" onClick={onClick}>
          Add to Whitelist
        </Button>
        {/* <Text variant="Body2Semibold" color="#006430">
          {item.programType}
        </Text> */}
      </Flex>
      <Flex align="center" justify="space-between" gap="4" alignItems="center">
        <Flex justifyContent="space-between" flex="1">
          {item.vendorId && (
            <Stack textAlign="center">
              <Text variant="Body2Semibold" color="grey.500">
                Vendor
              </Text>
              <Text variant="Body1Semibold">{item.vendorId ?? 'N/A'}</Text>
            </Stack>
          )}
          <Stack textAlign="center">
            <Text variant="Body2Semibold" color="grey.500">
              No. of Beneficiary
            </Text>
            <Text variant="Body1Semibold">{item.beneficiariesNo ?? 'N/A'}</Text>
          </Stack>
          <Stack textAlign="center">
            <Text variant="Body2Semibold" color="grey.500">
              Status
            </Text>
            <Text variant="Body1Semibold">{item.status ?? 'N/A'}</Text>
          </Stack>
        </Flex>
      </Flex>
    </Stack>
  );
};
