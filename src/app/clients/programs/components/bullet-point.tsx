'use client';

import { useProgramForm } from '@/providers/form-provider';
import { Box, Textarea } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';

type CriteriaItem = { id: number | null; criteria: string };

export function BulletPointTextArea() {
  const {
    form: {
      setValue,
      formState: { errors },
      getValues,
    },
  } = useProgramForm();

  // Get initial eligibilityCriteria (which may be an array of strings or objects)
  const initial = useMemo(() => getValues('eligibilityCriteria') || [], [getValues]);
  const [criteriaList, setCriteriaList] = useState<CriteriaItem[] | string[]>([]);

  // Load initial data
  useEffect(() => {
    if (initial.length > 0) {
      setCriteriaList(initial);
    }
  }, [initial]);

  // **Fix: Handle both string[] and CriteriaItem[] in the formatted output**
  const getFormattedText = () =>
    criteriaList.map((item) => (typeof item === 'string' ? `• ${item}` : `• ${item.criteria}`)).join('\n');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value
      .split('\n')
      .map((line) => line.replace(/^•\s*/, '').trim()) // Remove bullets
      .filter((line) => line !== ''); // Remove empty lines

    if (criteriaList.length > 0 && typeof criteriaList[0] === 'object') {
      // Convert text back to CriteriaItem[]
      const updatedList: CriteriaItem[] = lines.map((line, index) => ({
        id: (criteriaList as CriteriaItem[])[index]?.id || null, // Preserve ID
        criteria: line,
      }));
      setCriteriaList(updatedList);
      setValue('eligibilityCriteria', updatedList);
    } else {
      // If it was originally a string[], keep it as a string[]
      setCriteriaList(lines);
      setValue('eligibilityCriteria', lines);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (criteriaList.length === 0 || typeof criteriaList[0] === 'string') {
        // If the list is string[], add an empty bullet
        setCriteriaList((prev) => [...(prev as string[]), '']);
      } else {
        // If the list is CriteriaItem[], add an empty object
        setCriteriaList((prev) => [...(prev as CriteriaItem[]), { id: null, criteria: '' }]);
      }
    }
  };

  return (
    <Box>
      <Textarea
        rows={5}
        value={getFormattedText()}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        border="1px dashed"
        borderColor={errors.eligibilityCriteria ? 'red' : 'grey.300'}
        placeholder="Type and press Enter to add a new bullet..."
      />
    </Box>
  );
}
