import {
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SkeletonText,
  Spinner,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { type ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { MdSearch } from 'react-icons/md';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetDataPoints } from '@/hooks/useGetDataPoints';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { DataPoint } from '@/types';

const CheckboxForm = memo(({ moduleId }: { moduleId: number }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const { isLoading, isPlaceholderData } = useGetDataPoints({ query: debouncedQuery });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);

  return (
    <Stack spacing="5">
      <InputGroup maxW="20rem">
        <InputLeftElement pointerEvents="none" color="primary.600">
          {isPlaceholderData ? <Spinner size="xs" /> : <MdSearch />}
        </InputLeftElement>
        <Input placeholder="Search Program Data point" variant="primary" pl="2.5rem" onChange={handleInputChange} />
      </InputGroup>
      {isLoading ? <LoadingSkeleton /> : <RenderGroup debouncedQuery={debouncedQuery} moduleId={moduleId} />}
    </Stack>
  );
});

CheckboxForm.displayName = 'CheckboxForm';

const RenderGroup = memo(({ debouncedQuery, moduleId }: { debouncedQuery: string; moduleId: number }) => {
  const [checkedDataPoints, setCheckedDataPoints] = useState<
    Map<string, { dataPoint: DataPoint; isRequired: boolean }>
  >(new Map());
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const moduleIndex = Array.from(selectedModuleIds.ids).indexOf(moduleId);
  const { setValue, getValues } = useProgramForm();
  const programModules = getValues('programModules');

  const { data, isPlaceholderData } = useGetDataPoints({ query: debouncedQuery });

  useEffect(() => {
    const dataPoints = Array.from(checkedDataPoints.values());
    setValue(
      'programModules',
      programModules.map((module) => (module.moduleId === moduleId ? { ...module, dataPoints } : module))
    );
  }, [moduleId, checkedDataPoints, programModules, setValue, moduleIndex]);

  const dataPointEntries = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.body.dataPoints);
  }, [data]);

  const handleCheckboxChange = useCallback((dataPoint: DataPoint) => {
    setCheckedDataPoints((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(dataPoint.id)) newMap.delete(dataPoint.id);
      else newMap.set(dataPoint.id, { dataPoint, isRequired: false });
      return newMap;
    });
  }, []);

  const handleCompulsoryChange = useCallback((dataPoint: DataPoint, isRequired: boolean) => {
    setCheckedDataPoints((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(dataPoint.id)) newMap.set(dataPoint.id, { dataPoint, isRequired });
      return newMap;
    });
  }, []);

  return dataPointEntries.map(([heading, dataPoints]) => (
    <CheckboxGroup key={heading}>
      <Stack spacing="2">
        <Heading as="h3" variant="Body1Semibold" color="primary.500" alignSelf="start">
          {heading}
        </Heading>
        <Stack spacing="3">
          {dataPoints.map((field) => {
            const checkedDataPoint = checkedDataPoints.get(field.id);
            return (
              <Flex
                key={field.id}
                align="center"
                justify="space-between"
                rounded="0.5rem"
                border="1px solid"
                borderColor="grey.200"
                p="2"
              >
                <Checkbox
                  isDisabled={isPlaceholderData}
                  isChecked={!!checkedDataPoint}
                  onChange={() => handleCheckboxChange(field)}
                >
                  {field.question}
                </Checkbox>
                <Flex align="center" gap="0.625rem">
                  <Text as="label" htmlFor={`${field.question}-is-compulsory`} color="grey.500" variant="Body2Regular">
                    Mark as Compulsory
                  </Text>
                  <Switch
                    id={`${field.question}-is-compulsory`}
                    isDisabled={isPlaceholderData || !checkedDataPoint}
                    isChecked={checkedDataPoint?.isRequired || false}
                    onChange={(e) => handleCompulsoryChange(field, e.target.checked)}
                  />
                </Flex>
              </Flex>
            );
          })}
        </Stack>
      </Stack>
    </CheckboxGroup>
  ));
});

RenderGroup.displayName = 'RenderGroup';

const LoadingSkeleton = () => (
  <Stack spacing="2">
    <SkeletonText noOfLines={2} maxW="8rem" />
    <Stack spacing="3">
      {Array.from({ length: 10 }, (_, i) => (
        <Flex
          key={i}
          align="center"
          justify="space-between"
          rounded="0.5rem"
          border="1px solid"
          borderColor="grey.200"
          p="2"
        >
          <Checkbox isDisabled>
            <SkeletonText noOfLines={2}>Loading</SkeletonText>
          </Checkbox>
          <Flex align="center" gap="0.625rem">
            <Text color="grey.500" variant="Body2Regular">
              Mark as Compulsory
            </Text>
            <Switch isDisabled />
          </Flex>
        </Flex>
      ))}
    </Stack>
  </Stack>
);

export default CheckboxForm;
