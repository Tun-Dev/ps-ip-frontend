'use client';

import React, { useEffect, useState } from 'react';
import { Box, Textarea } from '@chakra-ui/react';
import { useProgramForm } from '@/providers/form-provider';

export function BulletPointTextArea() {
  const {
    setValue,
    formState: { errors },
    getValues,
  } = useProgramForm();
  const initial = getValues('eligibilityCriteria');
  const [text, setText] = useState('');

  console.log(initial);

  useEffect(() => {
    if (initial && initial.length > 0) {
      const bulletText = initial.map((item) => `• ${item}`).join('\n');
      setText(bulletText);
    }
  }, [initial]);

  // Extract bullet points as an array of strings
  const getBulletPoints = (rawText: string) => {
    // Split on each new line, strip leading "• " if it exists, and filter out empty lines
    return rawText
      .split('\n')
      .map((line) => line.replace(/^•\s*/, '')) // remove the leading '• '
      .filter((line) => line.trim() !== '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const target = e.currentTarget;
      const { selectionStart, selectionEnd } = target;

      // Insert new line plus bullet
      const before = text.slice(0, selectionStart);
      const after = text.slice(selectionEnd);
      const newText = before + '\n• ' + after;
      setText(newText);

      // Move the cursor right after the inserted bullet
      requestAnimationFrame(() => {
        target.selectionStart = selectionStart + 3; // jump past "\n• "
        target.selectionEnd = selectionStart + 3;
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;
    if (newValue === '') {
      setText('');
      setValue('eligibilityCriteria', []);
      return;
    }
    if (text === '') {
      newValue = `• ${newValue}`;
    }
    setText(newValue);
    const bulletPoints = getBulletPoints(newValue);
    setValue('eligibilityCriteria', bulletPoints);
  };

  return (
    <Box>
      <Textarea
        rows={5}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        border="1px dashed"
        borderColor={!!errors.eligibilityCriteria ? 'red' : 'grey.300'}
        placeholder="Type and press Enter to add a new bullet..."
      />
    </Box>
  );
}
