'use client';

import { Flex, Icon } from '@chakra-ui/react';
import { Select, components } from 'chakra-react-select';
import { MdArrowDropDown } from 'react-icons/md';

import type { DropdownOption } from '@/types';
import type { DropdownIndicatorProps, GroupBase, OptionProps, Props } from 'chakra-react-select';

import colors from '@/shared/chakra/colors';

const DropdownIndicator = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon as={MdArrowDropDown} boxSize="1.25rem" color="primary.600" />
    </components.DropdownIndicator>
  );
};

const OptionComponent = <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>({
  children,
  ...props
}: OptionProps<Option, IsMulti, Group>) => {
  const icon = (props.data as DropdownOption)?.icon;
  return (
    <components.Option {...props}>
      <Flex gap="2" align="center" fontSize="0.8125rem" fontWeight="semibold">
        {icon && <Icon as={icon} boxSize="1rem" color="primary.600" />}
        {children}
      </Flex>
    </components.Option>
  );
};

export const Dropdown = <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  props: Props<Option, IsMulti, Group>
) => {
  return (
    <Select
      components={{ DropdownIndicator, Option: OptionComponent, IndicatorSeparator: null }}
      variant="primary"
      instanceId="dropdown"
      menuPosition="fixed"
      chakraStyles={{
        menuList: (styles) => ({ ...styles, bgColor: 'primary.50' }),
        inputContainer: (styles) => ({ ...styles, py: '0.25rem' }),
        placeholder: (styles) => ({ ...styles, color: 'text' }),
      }}
      styles={{
        option: (styles, { isSelected, isFocused }) => ({
          ...styles,
          color: colors.text,
          backgroundColor: isSelected ? colors.primary[200] : isFocused ? colors.primary[100] : colors.primary[50],
          ':hover': { backgroundColor: isSelected ? colors.primary[200] : colors.primary[100] },
        }),
      }}
      {...props}
    />
  );
};
