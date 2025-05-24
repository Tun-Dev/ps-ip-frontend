import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SkeletonText,
  Spinner,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { type ChangeEvent, Dispatch, memo, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { MdSearch } from 'react-icons/md';

import { useDebounce } from '@/hooks/useDebounce';
import { useGetDataPoints } from '@/hooks/useGetDataPoints';
import { useGetModules } from '@/hooks/useGetModules';
import { useGetProgramById } from '@/hooks/useGetProgramById';
import { useProgramForm } from '@/providers/form-provider';
import { DataPoint } from '@/types';
import { useParams } from 'next/navigation';

const CheckboxForm = memo(({ moduleId }: { moduleId: number }) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);
  const [pageSize, setPageSize] = useState(999);

  const { isLoading, isPlaceholderData } = useGetDataPoints({ query: debouncedQuery, pageSize });

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value), []);

  return (
    <Stack spacing="5">
      <InputGroup maxW="20rem">
        <InputLeftElement pointerEvents="none" color="primary.600">
          {isPlaceholderData ? <Spinner size="xs" /> : <MdSearch />}
        </InputLeftElement>
        <Input
          placeholder="Search Program Data point"
          variant="primary"
          pl="2.5rem"
          fontSize="13px"
          onChange={handleInputChange}
        />
      </InputGroup>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <RenderGroup
          debouncedQuery={debouncedQuery}
          moduleId={moduleId}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      )}
    </Stack>
  );
});

CheckboxForm.displayName = 'CheckboxForm';

type RenderGroupProps = {
  debouncedQuery: string;
  moduleId: number;
  pageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
};

const RenderGroup = memo(({ debouncedQuery, moduleId, pageSize, setPageSize }: RenderGroupProps) => {
  const {
    form: { setValue, getValues },
  } = useProgramForm();
  const programModules = getValues('programModules');

  const { data, isPlaceholderData } = useGetDataPoints({ query: debouncedQuery, pageSize });
  const { programID } = useParams();
  const { response: program } = useGetProgramById(programID?.toString());
  const { data: modules } = useGetModules();

  const dataPointEntries = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.body.data);
  }, [data]);

  const hasMoreData = useMemo(() => {
    if (!data) return false;
    const { total, currentPage } = data.body;
    return currentPage * pageSize < total;
  }, [data, pageSize]);

  const [checkedDataPoints, setCheckedDataPoints] = useState<
    Map<string, { dataPoint: DataPoint; isRequired: boolean }>
  >(() => {
    const map = new Map();
    const defaultDataPoints = dataPointEntries.find(([heading]) => heading === 'Default');
    // If there is no program (only when creating and not editing) or default data points, return an empty map
    if (program || !defaultDataPoints) return map;
    const [, dataPoints] = defaultDataPoints;
    dataPoints.forEach((dataPoint) => map.set(dataPoint.id, { dataPoint, isRequired: true }));
    return map;
  });

  const [allCompulsory, setAllCompulsory] = useState(false);

  const toggleCompulsory = () => {
    const shouldMakeCompulsory = !allCompulsory;

    setCheckedDataPoints((prev) => {
      const newMap = new Map(prev);
      prev.forEach((value, key) => {
        newMap.set(key, { dataPoint: value.dataPoint, isRequired: shouldMakeCompulsory });
      });
      return newMap;
    });
  };

  // Check if all selected data points are compulsory when the selection changes
  useEffect(() => {
    if (checkedDataPoints.size === 0) {
      setAllCompulsory(false);
      return;
    }

    const allRequired = Array.from(checkedDataPoints.values()).every((item) => item.isRequired);
    setAllCompulsory(allRequired);
  }, [checkedDataPoints]);

  useEffect(() => {
    if (!program) return;
    setCheckedDataPoints((prev) => {
      const newMap = new Map(prev);

      const foundModule = program.body.programModules.find((module) => {
        const foundId = modules?.body.find((md) => md.name === module.module)?.id ?? 0;
        return foundId === moduleId;
      });

      const isInvalidModule = foundModule?.module !== 'Application' && foundModule?.module !== 'Enumeration';

      if (!foundModule || !foundModule.form || isInvalidModule) return newMap;

      foundModule.form.questions.forEach((question) => {
        if (question.dataPoint)
          newMap.set(question.dataPoint, {
            dataPoint: {
              id: question.dataPoint,
              format: { options: question.options, type: question.type },
              question: question.question,
              type: question.question,
              createdAt: question.createdAt,
              updatedAt: question.updatedAt,
            },
            isRequired: question.mandatory,
          });
      });
      return newMap;
    });
  }, [moduleId, modules, program]);

  useEffect(() => {
    const dataPoints = Array.from(checkedDataPoints.values());
    setValue(
      'programModules',
      programModules.map((module) => (module.moduleId === moduleId ? { ...module, dataPoints } : module))
    );
  }, [checkedDataPoints, moduleId, programModules, setValue]);

  return (
    <>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="3">
          <Text variant="Body1Semibold">Select Data Points</Text>
          {checkedDataPoints.size > 0 && (
            <Text variant="Body1Regular" color="primary.500">
              ({checkedDataPoints.size} Selected)
            </Text>
          )}
        </Flex>
        <Button
          variant="link"
          color="secondary.500"
          onClick={toggleCompulsory}
          isDisabled={checkedDataPoints.size === 0}
        >
          <Text as="span" variant="Body2Semibold">
            {allCompulsory ? 'Unmark all as Compulsory' : 'Mark all as Compulsory'}
          </Text>
        </Button>
      </Flex>
      <Stack spacing="4">
        <Accordion allowMultiple>
          {dataPointEntries.map(([heading, dataPoints]) => (
            <CollapsibleGroup
              key={heading}
              heading={heading}
              dataPoints={dataPoints}
              isPlaceholderData={isPlaceholderData}
              checkedDataPoints={checkedDataPoints}
              setCheckedDataPoints={setCheckedDataPoints}
            />
          ))}
        </Accordion>
        {hasMoreData && (
          <Flex justify="end" gap="2" align="center" color="grey.500">
            {isPlaceholderData && <Spinner size="xs" />}
            <Button
              variant="link"
              size="sm"
              color="inherit"
              onClick={() => setPageSize((prev) => prev + 20)}
              disabled={isPlaceholderData}
            >
              Load more
            </Button>
          </Flex>
        )}
      </Stack>
    </>
  );
});

RenderGroup.displayName = 'RenderGroup';

type CollapsibleGroupProps = {
  heading: string;
  dataPoints: DataPoint[];
  isPlaceholderData: boolean;
  checkedDataPoints: Map<string, { dataPoint: DataPoint; isRequired: boolean }>;
  setCheckedDataPoints: Dispatch<SetStateAction<Map<string, { dataPoint: DataPoint; isRequired: boolean }>>>;
};

const CollapsibleGroup = memo(
  ({ heading, dataPoints, isPlaceholderData, checkedDataPoints, setCheckedDataPoints }: CollapsibleGroupProps) => {
    const handleCheckboxChange = useCallback(
      (dataPoint: DataPoint) => {
        setCheckedDataPoints((prev) => {
          const newMap = new Map(prev);
          if (newMap.has(dataPoint.id)) newMap.delete(dataPoint.id);
          else newMap.set(dataPoint.id, { dataPoint, isRequired: false });
          return newMap;
        });
      },
      [setCheckedDataPoints]
    );

    const handleCompulsoryChange = useCallback(
      (dataPoint: DataPoint, isRequired: boolean) => {
        setCheckedDataPoints((prev) => {
          const newMap = new Map(prev);
          if (newMap.has(dataPoint.id)) newMap.set(dataPoint.id, { dataPoint, isRequired });
          return newMap;
        });
      },
      [setCheckedDataPoints]
    );

    return (
      <AccordionItem _first={{ borderTop: 'none' }}>
        <h3>
          <AccordionButton px="0">
            <Text as="span" flex="1" textAlign="left" variant="Body1Semibold" color="primary.500">
              {heading}
            </Text>
            <AccordionIcon color="primary.500" />
          </AccordionButton>
        </h3>
        <AccordionPanel px="0">
          <Stack spacing="3">
            {dataPoints.map((field) => {
              const isChecked = checkedDataPoints.has(field.id);
              const isRequired = checkedDataPoints.get(field.id)?.isRequired || false;

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
                    isChecked={isChecked}
                    onChange={() => handleCheckboxChange(field)}
                  >
                    {field.question}
                  </Checkbox>
                  <Flex align="center" gap="0.625rem">
                    <Text
                      as="label"
                      htmlFor={`${field.question}-is-compulsory`}
                      color="grey.500"
                      variant="Body2Regular"
                    >
                      Mark as Compulsory
                    </Text>
                    <Switch
                      id={`${field.question}-is-compulsory`}
                      isDisabled={isPlaceholderData || !isChecked}
                      isChecked={isRequired}
                      onChange={(e) => handleCompulsoryChange(field, e.target.checked)}
                    />
                  </Flex>
                </Flex>
              );
            })}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    );
  }
);

CollapsibleGroup.displayName = 'CollapsibleGroup';

const LoadingSkeleton = () => (
  <>
    <Flex align="center" justify="space-between">
      <Text variant="Body1Semibold">Select Data Points</Text>
      <Button variant="link" color="secondary.500" isDisabled>
        <Text as="span" variant="Body2Semibold">
          Mark all as Compulsory
        </Text>
      </Button>
    </Flex>
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
  </>
);

export default CheckboxForm;
