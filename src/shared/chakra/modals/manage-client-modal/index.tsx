import type { Client } from '@/types';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ClientProgramList } from './ClientProgramList';
import { AssignProgramToClient } from './AssignProgramToClient';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
};

export const ManageClientModal = ({ isOpen, onClose, client }: ModalProps) => {
  const [screen, setScreen] = useState<'list' | 'assign'>('list');

  useEffect(() => {
    setScreen('list');
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      {screen === 'list' ? (
        <ClientProgramList onClose={onClose} setScreen={setScreen} client={client} />
      ) : (
        <AssignProgramToClient setScreen={setScreen} client={client} />
      )}
    </Modal>
  );
};
