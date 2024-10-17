import AdminSettings from './components/admin-settings';
import EditModules from './components/edit-modules';
import Review from './components/review';
import SelectModules from './components/select-modules';

type Props = {
  searchParams: { step: string; moduleId: string };
};

const ProgramCreatePage = ({ searchParams }: Props) => {
  const step = parseInt(searchParams.step || '1');
  const moduleId = parseInt(searchParams.moduleId || '1');

  return (
    <>
      <SelectModules display={step === 1 ? 'flex' : 'none'} step={step} />
      <EditModules display={step === 2 ? 'flex' : 'none'} step={step} moduleId={moduleId} />
      <AdminSettings display={step === 3 ? 'flex' : 'none'} step={step} moduleId={moduleId} />
      <Review display={step === 4 ? 'flex' : 'none'} step={step} moduleId={moduleId} />
    </>
  );
};

export default ProgramCreatePage;
