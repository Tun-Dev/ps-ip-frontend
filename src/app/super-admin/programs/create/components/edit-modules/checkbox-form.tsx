import { Checkbox, CheckboxGroup, Heading, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

import { useProgramForm } from '@/providers/form-provider';

type CheckboxFormProps = {
  index: number;
  display?: string;
};

const CheckboxForm = ({ index, display }: CheckboxFormProps) => {
  const { register, getValues } = useProgramForm();
  const sections = getValues(`editModules.checkboxForm.${index}.sections`);

  return (
    <Stack display={display} spacing="5">
      {sections.length > 1 && (
        <InputGroup maxW="20rem">
          <InputLeftElement pointerEvents="none" color="primary.600">
            <MdSearch />
          </InputLeftElement>
          <Input placeholder="Search Program Data point" variant="primary" pl="2.5rem" />
        </InputGroup>
      )}
      {sections.map((section, idx) => (
        <CheckboxGroup key={idx}>
          <Stack spacing="2" align="start">
            {section.heading && (
              <Heading as="h3" variant="Body1Semibold" color="primary.500">
                {section.heading}
              </Heading>
            )}
            <Stack spacing="3.5" align="start">
              {section.fields.map((field, i) => (
                <Checkbox key={i} {...register(`editModules.checkboxForm.${index}.sections.${idx}.fields.${i}.value`)}>
                  {field.label}
                </Checkbox>
              ))}
            </Stack>
          </Stack>
        </CheckboxGroup>
      ))}
    </Stack>
  );
};

export default CheckboxForm;
