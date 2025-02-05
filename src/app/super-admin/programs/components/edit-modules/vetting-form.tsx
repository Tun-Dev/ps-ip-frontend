import { Box, HStack, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { memo, useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import { useGetModules } from '@/hooks/useGetModules';
import { useProgramForm } from '@/providers/form-provider';
import AutomatedVettingForm from './automated-vetting-form';
import ManualVettingForm from './manual-vetting-form';

const VettingForm = memo(() => {
  const { control, register, getValues, setValue } = useProgramForm();
  const vettingType = useWatch({ control, name: 'vettingForm.type' });
  const { data: modules } = useGetModules();
  const programModules = getValues('programModules');

  useEffect(() => {
    if (!modules) return;
    setValue(
      'programModules',
      programModules.map((module) => {
        const vettingModule = modules.body.find((md) => md.name === 'Vetting');

        if (!vettingModule) return module;

        const manual = vettingModule.moduleGuidelines.find((guideline) => guideline.identifier === 'MANUAL');
        const automatic = vettingModule.moduleGuidelines.find((guideline) => guideline.identifier === 'AUTOMATIC');

        if (!manual || !automatic) return module;

        return { ...module, guidelines: [vettingType === 'manual' ? manual.id : automatic.id] };
      })
    );
  }, [vettingType, programModules, setValue, modules]);

  return (
    <Box>
      <RadioGroup mb="6" defaultValue={getValues('vettingForm.type')}>
        <HStack gap="8">
          <Radio value="manual" {...register('vettingForm.type')}>
            <Text as="span" variant="Body2Semibold" color="primary.500">
              Manual Vetting
            </Text>
          </Radio>
          <Radio value="automated" {...register('vettingForm.type')}>
            <Text as="span" variant="Body2Semibold" color="primary.500">
              Automated Vetting
            </Text>
          </Radio>
        </HStack>
      </RadioGroup>
      <ManualVettingForm display={vettingType === 'manual' ? 'block' : 'none'} />
      <AutomatedVettingForm display={vettingType === 'automated' ? 'block' : 'none'} />
    </Box>
  );
});

VettingForm.displayName = 'VettingForm';

export default VettingForm;
