'use client';

import { useProgramForm } from '@/providers/form-provider';
import { Textarea } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';

type CriteriaItem = { id: number | null; criteria: string };
type EligibilityCriteria = CriteriaItem[] | string[];
type InputEvent<T> = {
  e: T;
  value: EligibilityCriteria;
  onChange: (value: EligibilityCriteria) => void;
};

export function BulletPointTextArea() {
  const {
    form: { formState, control },
  } = useProgramForm();

  // Handle both string[] and CriteriaItem[] in the formatted output
  const getFormattedText = useCallback(
    (value: EligibilityCriteria) =>
      value.map((item) => (typeof item === 'string' ? `• ${item}` : `• ${item.criteria}`)).join('\n'),
    []
  );

  const handleChange = useCallback(({ e, value, onChange }: InputEvent<React.ChangeEvent<HTMLTextAreaElement>>) => {
    const lines = e.target.value
      .split('\n')
      .map((line) => line.replace(/^•\s*/, '')) // Remove bullets but preserve spaces
      .filter((line) => line !== ''); // Remove empty lines

    if (value.length > 0 && typeof value[0] === 'object') {
      // Convert text back to CriteriaItem[]
      const updatedList: CriteriaItem[] = lines.map((line, index) => ({
        id: (value as CriteriaItem[])[index]?.id || null, // Preserve ID
        criteria: line,
      }));
      onChange(updatedList);
    }
    // If it was originally a string[], keep it as a string[]
    else onChange(lines);
  }, []);

  const handleKeyDown = useCallback(({ e, value, onChange }: InputEvent<React.KeyboardEvent<HTMLTextAreaElement>>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    // If the list is string[], add an empty bullet
    if (value.length === 0 || typeof value[0] === 'string') onChange([...(value as string[]), '']);
    // If the list is CriteriaItem[], add an empty object
    else onChange([...(value as CriteriaItem[]), { id: null, criteria: '' }]);
  }, []);

  return (
    <Controller
      control={control}
      name="eligibilityCriteria"
      render={({ field: { name, onBlur, onChange, value, disabled } }) => (
        <Textarea
          rows={5}
          border="1px dashed"
          borderColor={formState.errors.eligibilityCriteria ? 'red' : 'grey.300'}
          placeholder="Type and press Enter to add a new bullet..."
          value={getFormattedText(value)}
          onChange={(e) => handleChange({ e, value, onChange })}
          onKeyDown={(e) => handleKeyDown({ e, value, onChange })}
          name={name}
          onBlur={onBlur}
          isDisabled={disabled}
        />
      )}
    />
  );
}
