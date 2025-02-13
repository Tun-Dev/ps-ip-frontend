import type { Vendor } from '@/types';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AssignProgramToVendor } from './AssignProgramToVendor';
import { VendorProgramList } from './VendorProgramList';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
};

export const ManageVendorModal = ({ isOpen, onClose, vendor }: ModalProps) => {
  const [screen, setScreen] = useState<'list' | 'assign'>('list');

  useEffect(() => {
    setScreen('list');
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      {screen === 'list' ? (
        <VendorProgramList onClose={onClose} setScreen={setScreen} vendor={vendor} />
      ) : (
        <AssignProgramToVendor setScreen={setScreen} vendor={vendor} />
      )}
    </Modal>
  );
};
