import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { MdClose, MdDownload } from 'react-icons/md';

import { useVettingModal } from '@/providers/vetting-modal-provider';
import { FormStatus } from '@/utils';
import { MediaViewer } from './media-viewer';
import { VettingTabs } from './vetting-tabs';

type VettingModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function VettingModal({ isOpen, onClose }: VettingModalProps) {
  const { currentScore, totalScore, calculatedScore, isManual, media, resetState, tabIndex, status } =
    useVettingModal();

  const closeModal = useCallback(() => {
    onClose();
    resetState();
  }, [onClose, resetState]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent p="0" maxW="57.5rem" overflow="hidden">
        <ModalHeader p="0" mb="6">
          <Flex p="1rem" justifyContent="flex-end">
            <IconButton
              aria-label="Close modal"
              icon={<MdClose size="1.5rem" />}
              variant="ghost"
              boxSize="2rem"
              minW="unset"
              rounded="full"
              onClick={onClose}
            />
          </Flex>
          <Flex px="3rem" align="center" justifyContent="space-between">
            <Text variant="Body2Semibold" color="grey.500">
              {media ? media.value.split('/').pop() || media.value : 'Vetting details'}
            </Text>
            {tabIndex === 1 && !!totalScore && !media && (
              <Text variant="Body2Semibold" color="grey.500" display="inline-flex" gap="2" alignItems="center">
                Score:
                <Text as="span" variant="Header1Bold" color="primary.500">
                  {isManual && status === FormStatus.PENDING
                    ? `${currentScore}/${totalScore}`
                    : `${((calculatedScore / totalScore) * 100).toFixed(1)}%`}
                </Text>
              </Text>
            )}
            {media ? null : (
              <Button variant="primary" leftIcon={<MdDownload />} size="medium">
                Download Report
              </Button>
            )}
          </Flex>
        </ModalHeader>
        <ModalBody px="3rem" pb={media ? '0' : '2.5rem'} display="flex" flexDir="column" gap="5">
          {media ? <MediaViewer /> : <VettingTabs />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
