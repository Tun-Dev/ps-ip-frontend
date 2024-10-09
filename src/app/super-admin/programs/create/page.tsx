import EditModules from './components/edit-modules';
import SelectModules from './components/select-modules';

type Props = {
  searchParams: { step: string; currentModule: string };
};

const ProgramCreatePage = ({ searchParams }: Props) => {
  const step = parseInt(searchParams.step || '1');
  const currentModule = searchParams.currentModule || 'application';

  return (
    <>
      <SelectModules display={step === 1 ? 'flex' : 'none'} />
      <EditModules display={step === 2 ? 'flex' : 'none'} currentModule={currentModule} />
    </>
  );
};

export default ProgramCreatePage;
