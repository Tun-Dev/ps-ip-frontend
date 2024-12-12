import { Box, HStack, Radio, RadioGroup, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useWatch } from 'react-hook-form';

import { useProgramForm } from '@/providers/form-provider';
import AutomatedVettingForm from './automated-vetting-form';
import ManualVettingForm from './manual-vetting-form';

const VettingForm = memo(() => {
  const { control, register, getValues } = useProgramForm();
  const vettingType = useWatch({ control, name: 'vettingForm.type' });

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
