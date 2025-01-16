'use client';

import { useProgramStore } from '@/providers/programs-store-provider';
import AdminSettings from '../../../components/admin-settings';
import EditModules from '../../../components/edit-modules';
import Review from '../../../components/review';
import SelectModules from '../../../components/select-modules';
import ProgramDetails from '../../../components/program-details';

const ProgramEditPage = () => {
  const step = useProgramStore((state) => state.step);
  return (
    <>
      <ProgramDetails display={step === 1 ? 'flex' : 'none'} />
      <SelectModules display={step === 2 ? 'block' : 'none'} />
      <EditModules display={step === 3 ? 'block' : 'none'} />
      <AdminSettings display={step === 4 ? 'block' : 'none'} />
      <Review display={step === 5 ? 'block' : 'none'} />
    </>
  );
};

export default ProgramEditPage;
