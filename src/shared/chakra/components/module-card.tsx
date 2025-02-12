'use client';

import { Box, Button, Flex, Grid, Image, Stack, StackProps, Text } from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import { memo, MouseEvent, useEffect, useRef } from 'react';
import { MdArrowForward, MdCheckCircle, MdEdit, MdRefresh } from 'react-icons/md';

import { DndHandleProps } from '@/app/super-admin/programs/components/select-modules';
import type { Module } from '@/types';

type ModuleCardProps = DndHandleProps & {
  number: number;
  module: Module;
  scroll?: boolean;
  route?: string;
  isActive?: boolean;
  disabled?: boolean;
  onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
  status: 'Select' | 'Selected' | 'Completed' | 'In progress' | 'Pending' | 'Edit';
  isDragging?: boolean;
} & StackProps;

export const ModuleCard = memo((props: ModuleCardProps) => {
  const {
    number,
    module,
    status,
    scroll,
    route,
    isActive,
    disabled,
    onRemove,
    onClick,
    dragHandleProps,
    isDragging,
    ...rest
  } = props;

  const router = useRouter();
  const pathname = usePathname();
  const moduleCardRef = useRef<HTMLDivElement>(null);
  const isDisabled = status === 'Selected' || status === 'Pending' || disabled;

  useEffect(() => {
    if (scroll && pathname.includes(module.module.toLowerCase()) && moduleCardRef.current)
      moduleCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [module, pathname, scroll]);

  return (
    <Stack spacing="3" w="full" ref={moduleCardRef} {...rest}>
      <Flex
        h="156px"
        bg={isDisabled ? 'grey.200' : isActive ? 'primary.500' : 'primary.100'}
        boxShadow="card"
        borderRadius="16px"
        p="12px"
        flexDir="column"
        gap="8px"
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        onClick={isDisabled ? undefined : route ? () => router.push(route) : onClick}
        as="button"
        align="stretch"
        outline="2px solid transparent"
        _focusVisible={isDisabled ? undefined : { boxShadow: 'outline' }}
      >
        <Flex justifyContent="space-between">
          <Flex gap="4px">
            <Flex
              boxSize="20px"
              bg={isDisabled ? 'grey.400' : isActive ? 'white' : 'primary.100'}
              borderRadius="100%"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                variant={isActive ? 'Body2Bold' : 'Body2Semibold'}
                color={isDisabled ? 'white' : 'primary.500'}
                lineHeight={1}
              >
                {number}
              </Text>
            </Flex>
            <Text
              variant={isActive ? 'Body2Bold' : 'Body2Semibold'}
              color={isDisabled ? 'grey.500' : isActive ? 'white' : 'primary.500'}
            >
              {module.module}
            </Text>
          </Flex>
          {isDragging ? (
            <Grid
              // ref={setActivatorNodeRef}
              // {...listeners}
              cursor="grab"
              gridTemplateColumns="auto auto"
              gap="1"
              outlineColor="transparent"
              _focus={{ boxShadow: 'outline' }}
              style={{ touchAction: 'none' }}
              onClick={(e) => e.stopPropagation()}
              {...dragHandleProps}
            >
              {Array.from(Array(6).keys()).map((index) => (
                <Box key={index} bg="primary.400" boxSize="1" />
              ))}
            </Grid>
          ) : (
            <Flex
              boxSize="20px"
              bg={isDisabled ? 'grey.400' : 'primary.100'}
              borderRadius="100%"
              alignItems="center"
              justifyContent="center"
            >
              <MdArrowForward color={isDisabled ? 'white' : 'var(--chakra-colors-primary-500)'} />
            </Flex>
          )}
        </Flex>
        <Flex flex="1" justifyContent="center">
          <Image
            src={`/icons/${module.module}.svg`}
            alt={module.module}
            filter={isDisabled ? 'grayscale(90%)' : undefined}
          />
        </Flex>
        <Flex justifyContent="flex-end" align="center" gap="2px">
          {status === 'Edit' && (
            <MdEdit
              color={
                isDisabled
                  ? 'var(--chakra-colors-grey-400)'
                  : isActive
                    ? 'var(--chakra-colors-white)'
                    : 'var(--chakra-colors-primary-500)'
              }
              size="0.75rem"
            />
          )}
          <Text
            variant={isActive ? 'Body3Regular' : 'Body3Regular'}
            color={isDisabled ? 'grey.500' : isActive ? 'white' : 'primary.500'}
          >
            {status}
          </Text>
          {status === 'Completed' || status === 'Selected' ? (
            <MdCheckCircle
              color={
                isDisabled ? 'var(--chakra-colors-grey-400)' : isActive ? 'white' : 'var(--chakra-colors-primary-500)'
              }
              size="0.75rem"
            />
          ) : status === 'Pending' || status === 'In progress' ? (
            <MdRefresh
              color={
                isDisabled
                  ? 'var(--chakra-colors-grey-400)'
                  : status === 'In progress'
                    ? 'var(--chakra-colors-white)'
                    : 'var(--chakra-colors-primary-500)'
              }
              size="0.75rem"
            />
          ) : status === 'Select' ? (
            <Flex bgColor="primary.200" boxSize="0.75rem" rounded="full" />
          ) : null}
        </Flex>
      </Flex>
      {!!onRemove && (
        <Button variant="secondary" w="full" size="medium" onClick={onRemove}>
          Remove
        </Button>
      )}
    </Stack>
  );
});

ModuleCard.displayName = 'ModuleCard';
