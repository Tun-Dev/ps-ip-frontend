'use client';

import { useProgramStore } from '@/providers/programs-store-provider';
import AdminSettings from '../../components/admin-settings';
import EditModules from '../../components/edit-modules';
import Review from '../../components/review';
import SelectModules from '../../components/select-modules';

const ProgramEditPage = () => {
  const step = useProgramStore((state) => state.step);
  return (
    <>
      <SelectModules display={step === 1 ? 'block' : 'none'} />
      <EditModules display={step === 2 ? 'block' : 'none'} />
      <AdminSettings display={step === 3 ? 'block' : 'none'} />
      <Review display={step === 4 ? 'block' : 'none'} />
    </>
  );
};

export default ProgramEditPage;
