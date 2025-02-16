import type { Aggregator } from '@/types';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AggregatorProgramList } from './AggregatorProgramList';
import { AssignProgramToAggregator } from './AssignProgramToAggregator';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  aggregator: Aggregator;
};

export const ManageAggregatorModal = ({ isOpen, onClose, aggregator }: ModalProps) => {
  const [screen, setScreen] = useState<'list' | 'assign'>('list');

  useEffect(() => {
    setScreen('list');
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      {screen === 'list' ? (
        <AggregatorProgramList onClose={onClose} setScreen={setScreen} aggregator={aggregator} />
      ) : (
        <AssignProgramToAggregator setScreen={setScreen} aggregator={aggregator} />
      )}
    </Modal>
  );
};
