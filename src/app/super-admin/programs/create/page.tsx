import { Text } from '@chakra-ui/react';

import EditModules from './components/edit-modules';
import SelectModules from './components/select-modules';

type Props = {
  searchParams: { step: string; currentModule: string };
};

const ProgramCreatePage = ({ searchParams }: Props) => {
  const step = parseInt(searchParams.step || '1');
  const currentModule = searchParams.currentModule || 'application';

  switch (step) {
    case 1:
      return <SelectModules />;
    case 2:
      return <EditModules currentModule={currentModule} />;

    default:
      return <Text textAlign="center">Step not found</Text>;
  }
};

export default ProgramCreatePage;
