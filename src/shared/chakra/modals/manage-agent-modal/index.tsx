import type { Agent } from '@/types';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AgentProgramList } from './AgentProgramList';
import { AssignProgramToAgent } from './AssignProgramToAgent';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
};

export const ManageAgentModal = ({ isOpen, onClose, agent }: ModalProps) => {
  const [screen, setScreen] = useState<'list' | 'assign'>('list');

  useEffect(() => {
    setScreen('list');
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      {screen === 'list' ? (
        <AgentProgramList onClose={onClose} setScreen={setScreen} agent={agent} />
      ) : (
        <AssignProgramToAgent setScreen={setScreen} agent={agent} />
      )}
    </Modal>
  );
};
