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
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: DropdownIndicatorProps<Option, IsMulti, Group>
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon as={MdArrowDropDown} boxSize="1.25rem" color="primary.600" />
    </components.DropdownIndicator>
  );
};

const OptionComponent = <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
  variant: string,
  { children, ...props }: OptionProps<Option, IsMulti, Group>
) => {
  const icon = (props.data as DropdownOption)?.icon;
  return (
    <components.Option {...props}>
      <Flex gap="2" align="center" fontSize="0.8125rem" fontWeight="semibold">
        {icon && (
          <Icon
            as={icon}
            boxSize="1rem"
            color={variant === 'whiteDropdown' && props.isSelected ? 'white' : 'primary.600'}
          />
        )}
        {children}
      </Flex>
    </components.Option>
  );
};

const getStyles = (variant: string, isSelected: boolean, isFocused: boolean) => {
  if (variant === 'whiteDropdown') {
    if (isSelected) return { optionBg: colors.primary[500], hoverBg: colors.primary[500] };
    if (isFocused) return { optionBg: 'var(--chakra-colors-gray-100)', hoverBg: 'var(--chakra-colors-gray-100)' };
    return { optionBg: 'white', hoverBg: colors.primary[50] };
  }
  if (isSelected) return { optionBg: colors.primary[200], hoverBg: colors.primary[200] };
  if (isFocused) return { optionBg: colors.primary[100], hoverBg: colors.primary[100] };
  return { optionBg: colors.primary[50], hoverBg: colors.primary[100] };
};

export const Dropdown = <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>({
  variant = 'primaryDropdown',
  chakraStyles,
  ...props
}: Props<Option, IsMulti, Group>) => {
  return (
    <Select
      components={{
        DropdownIndicator,
        Option: (optionProps) => OptionComponent(variant, optionProps),
        IndicatorSeparator: null,
      }}
      variant={variant}
      instanceId="dropdown"
      // menuPosition="fixed"
      chakraStyles={{
        menuList: (styles) => ({ ...styles, bgColor: variant === 'whiteDropdown' ? 'white' : 'primary.50' }),
        inputContainer: (styles) => ({ ...styles, py: '0.25rem' }),
        placeholder: (styles) => ({ ...styles, color: 'grey.500', fontSize: '16px', fontWeight: '400' }),
        container: (styles) => ({ ...styles, w: 'full' }),
        ...chakraStyles,
      }}
      styles={{
        option: (styles, { isSelected, isFocused }) => {
          const { optionBg, hoverBg } = getStyles(variant, isSelected, isFocused);
          return {
            ...styles,
            color: variant === 'whiteDropdown' && isSelected ? 'white' : colors.text,
            backgroundColor: optionBg,
            ':hover': { backgroundColor: hoverBg },
          };
        },
      }}
      {...props}
    />
  );
};
