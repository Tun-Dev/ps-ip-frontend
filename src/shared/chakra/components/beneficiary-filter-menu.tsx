/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button, Flex, Input, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import { MdClose, MdFilterList } from 'react-icons/md';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Dropdown } from './dropdown';
import { useGetStates } from '@/hooks/useGetStates';
import { FormStatus } from '@/utils';

export type BeneficiaryFilters = {
  gender?: 'Male' | 'Female';
  state?: number;
  lga?: number;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  status?: FormStatus;
};

type Props = {
  value: BeneficiaryFilters; // applied filters from parent
  onApply: (filters: BeneficiaryFilters) => void;
  onReset?: () => void;
  buttonSize?: 'sm' | 'md' | 'lg';
  minWidth?: string | number;
  storageKey?: string; // base key for localStorage
};

const isBrowser = typeof window !== 'undefined';

export const BeneficiaryFilterMenu = ({
  value,
  onApply,
  onReset,
  minWidth = '400px',
  storageKey = 'beneficiary-filters',
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  // ----- localStorage helpers -----
  const draftKey = `${storageKey}:draft`;
  const appliedKey = `${storageKey}:applied`;

  const loadJSON = useCallback((key: string): BeneficiaryFilters | null => {
    if (!isBrowser) return null;
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as BeneficiaryFilters) : null;
    } catch {
      return null;
    }
  }, []);

  const saveJSON = useCallback((key: string, data: BeneficiaryFilters) => {
    if (!isBrowser) return;
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {
      /* ignore quota errors */
    }
  }, []);

  const clearKey = useCallback((key: string) => {
    if (!isBrowser) return;
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, []);

  // ----- pending (unapplied) selections -----
  const [pendingGender, setPendingGender] = useState<'Male' | 'Female' | null>(value.gender ?? null);
  const [pendingState, setPendingState] = useState<number | null>(value.state ?? null);
  const [pendingLga, setPendingLga] = useState<number | null>(value.lga ?? null);
  const [pendingStartDate, setPendingStartDate] = useState<string>(value.startDate ?? '');
  const [pendingEndDate, setPendingEndDate] = useState<string>(value.endDate ?? '');
  const [pendingStatus, setPendingStatus] = useState<FormStatus | null>(value.status ?? null);

  // initialize pending from localStorage draft (or from applied value if no draft exists)
  useEffect(() => {
    const draft = loadJSON(draftKey);
    const source: BeneficiaryFilters = draft ?? value ?? {};
    setPendingGender(source.gender ?? null);
    setPendingState(source.state ?? null);
    setPendingLga(source.lga ?? null);
    setPendingStartDate(source.startDate ?? '');
    setPendingEndDate(source.endDate ?? '');
    setPendingStatus(source.status ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  const { data: statesData } = useGetStates(true);

  const genderOptions = useMemo(
    () => [
      { label: 'Male', value: 'Male' as const },
      { label: 'Female', value: 'Female' as const },
    ],
    []
  );

  const statusOptions = useMemo(
    () => [
      { label: 'Pending', value: FormStatus.PENDING },
      { label: 'Approved', value: FormStatus.APPROVED },
      { label: 'Disapproved', value: FormStatus.DISAPPROVED },
      { label: 'Whitelisted', value: FormStatus.WHITELISTED },
      { label: 'Recommended', value: FormStatus.RECOMMENDED },
      { label: 'Disbursed', value: FormStatus.DISBURSED },
    ],
    []
  );

  const stateOptions = useMemo(
    () => statesData?.body?.map((s) => ({ label: s.name, value: s.id })) ?? [],
    [statesData]
  );

  const lgaOptions = useMemo(() => {
    if (!pendingState) return [];
    const state = statesData?.body?.find((s) => s.id === pendingState);
    return state?.LGAs?.map((l) => ({ label: l.name, value: l.id })) ?? [];
  }, [pendingState, statesData]);

  // ----- helpers for comparison / normalization -----
  const normalize = (f: BeneficiaryFilters): BeneficiaryFilters => ({
    gender: f.gender ?? undefined,
    state: f.state ?? undefined,
    lga: f.lga ?? undefined,
    startDate: f.startDate || undefined,
    endDate: f.endDate || undefined,
    status: f.status ?? undefined,
  });

  const pendingObject = useMemo<BeneficiaryFilters>(
    () =>
      normalize({
        gender: pendingGender ?? undefined,
        state: pendingState ?? undefined,
        lga: pendingLga ?? undefined,
        startDate: pendingStartDate || undefined,
        endDate: pendingEndDate || undefined,
        status: pendingStatus ?? undefined,
      }),
    [pendingGender, pendingState, pendingLga, pendingStartDate, pendingEndDate, pendingStatus]
  );

  const appliedObject = useMemo<BeneficiaryFilters>(() => normalize(value ?? {}), [value]);

  const isUnchanged = useMemo(
    () => JSON.stringify(pendingObject) === JSON.stringify(appliedObject),
    [pendingObject, appliedObject]
  );

  const appliedCount = useMemo(() => {
    let c = 0;
    if (value.gender) c++;
    if (value.state) c++;
    if (value.lga) c++;
    if (value.startDate || value.endDate) c++;
    if (value.status) c++;
    return c;
  }, [value]);

  // Close on outside click -> save draft (do NOT apply)
  const handleMenuClose = () => {
    setIsOpen(false);
    saveJSON(draftKey, pendingObject); // persist unfinished choices
  };

  const handleApply = () => {
    saveJSON(draftKey, pendingObject);
    saveJSON(appliedKey, pendingObject);
    onApply(pendingObject);
    setIsOpen(false);
  };

  // IMPORTANT: previously this only cleared draft/pending.
  // Now it also clears the applied filters and notifies the parent.
  const handleReset = () => {
    setPendingGender(null);
    setPendingState(null);
    setPendingLga(null);
    setPendingStartDate('');
    setPendingEndDate('');
    setPendingStatus(null);

    clearKey(draftKey);
    clearKey(appliedKey);

    onApply({}); // clear in parent so table resets immediately
    onReset?.();
  };

  return (
    <Menu isOpen={isOpen} closeOnSelect={false} closeOnBlur={false}>
      <MenuButton
        as={Button}
        rightIcon={<MdFilterList width="15px" height="15px" />}
        fontSize="12px"
        bg="none"
        rounded="6px"
        border="1px solid"
        borderColor="#343434"
        flexShrink={0}
        h="32px"
        px="10px"
        onClick={() => setIsOpen((v) => !v)}
      >
        Filter{appliedCount ? ` (${appliedCount})` : ''}
      </MenuButton>

      <MenuList p="24px" w="400px" minW={minWidth} rounded="12px">
        <Flex direction="column" gap="3">
          <Flex
            borderBottom="1px solid"
            borderBottomColor="#EBEBEB"
            pb="8px"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text variant="Body1Bold" color="text">
              Filter
            </Text>

            <Button onClick={handleMenuClose} p="0" boxSize="20px" minW="0">
              <MdClose />
            </Button>
          </Flex>

          <Flex gap="3" flexDir="column">
            <Text w="180px" variant="Body2Semibold" color="grey.500">
              Gender
            </Text>
            <Dropdown
              variant="whiteDropdown"
              placeholder="Select gender"
              options={genderOptions as any}
              value={pendingGender ? ({ label: pendingGender, value: pendingGender } as any) : (null as any)}
              onChange={(opt: any) => setPendingGender(opt?.value ?? null)}
              isClearable
            />
          </Flex>

          <Flex gap="3" flexDir="column">
            <Text w="180px" variant="Body2Semibold" color="grey.500">
              Status
            </Text>
            <Dropdown
              variant="whiteDropdown"
              placeholder="Select status"
              options={statusOptions as any}
              value={pendingStatus ? (statusOptions.find((o) => o.value === pendingStatus) as any) : (null as any)}
              onChange={(opt: any) => setPendingStatus(opt?.value ?? null)}
              isClearable
            />
          </Flex>

          <Flex gap="3" flexDir="column">
            <Text w="180px" variant="Body2Semibold" color="grey.500">
              State
            </Text>
            <Dropdown
              variant="whiteDropdown"
              placeholder="Select state"
              options={stateOptions as any}
              value={pendingState != null ? (stateOptions.find((o) => o.value === pendingState) as any) : (null as any)}
              onChange={(opt: any) => {
                setPendingState(opt?.value ?? null);
                setPendingLga(null);
              }}
              isClearable
            />
          </Flex>

          <Flex gap="3" flexDir="column">
            <Text w="180px" variant="Body2Semibold" color="grey.500">
              LGA
            </Text>
            <Dropdown
              id="test"
              variant="whiteDropdown"
              placeholder="Select LGA"
              options={lgaOptions as any}
              value={pendingLga != null ? (lgaOptions.find((o) => o.value === pendingLga) as any) : (null as any)}
              onChange={(opt: any) => setPendingLga(opt?.value ?? null)}
              isDisabled={!pendingState}
              isClearable
            />
          </Flex>

          <Flex gap="3" flexDir="column">
            <Text w="180px" variant="Body2Semibold" color="grey.500">
              Date range
            </Text>
            <Flex gap="2" flex="1">
              <Input
                type="date"
                value={pendingStartDate}
                placeholder="From"
                onChange={(e) => setPendingStartDate(e.target.value)}
              />
              <Text as="span" alignSelf="center">
                to
              </Text>
              <Input
                type="date"
                value={pendingEndDate}
                onChange={(e) => setPendingEndDate(e.target.value)}
                min={pendingStartDate || undefined}
              />
            </Flex>
          </Flex>

          <Flex justify="space-between" pt="2" gap="16px">
            <Button variant="secondary" size="sm" w="full" onClick={handleReset}>
              Reset Filter
            </Button>
            <Button
              variant="primary"
              size="sm"
              w="full"
              onClick={handleApply}
              isDisabled={isUnchanged} // <- disabled when no changes vs applied
            >
              Apply Filter
            </Button>
          </Flex>
        </Flex>
      </MenuList>
    </Menu>
  );
};
