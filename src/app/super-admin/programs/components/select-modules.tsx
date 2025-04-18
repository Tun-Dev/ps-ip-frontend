'use client';

import { Box, BoxProps, Heading, SimpleGrid } from '@chakra-ui/react';
import { CSS } from '@dnd-kit/utilities';
import React, { memo } from 'react';
import { useFieldArray } from 'react-hook-form';

import { useGetModules } from '@/hooks/useGetModules';
import { useProgramForm } from '@/providers/form-provider';
import { useProgramStore } from '@/providers/programs-store-provider';
import { ModuleCard } from '@/shared/chakra/components';
import { Sortable } from '@/shared/chakra/components/form-builder/sortable'; // Your Sortable component
import { renameKey } from '@/utils';
import { rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { useParams, usePathname } from 'next/navigation';

export interface DndHandleProps {
  dragHandleProps?: React.HTMLAttributes<HTMLElement> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref?: React.Ref<any>;
  };
}

function SortableItem({ id, children }: { id: number; children: React.ReactElement<DndHandleProps> }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {React.isValidElement(children)
        ? React.cloneElement(children, {
            dragHandleProps: {
              ref: setActivatorNodeRef,
              ...listeners,
              ...attributes,
            },
          })
        : children}
    </div>
  );
}

const SelectModules = memo((props: BoxProps) => {
  const pathname = usePathname();
  const { programID, folderID } = useParams();
  const selectedModuleIds = useProgramStore((state) => state.selectedModules);
  const setSelectedModuleIds = useProgramStore((state) => state.setSelectedModules);
  const setActiveModuleId = useProgramStore((state) => state.setActiveModuleId);
  const setStep = useProgramStore((state) => state.setStep);
  const {
    form: { getValues, setValue, control },
  } = useProgramForm();

  const isEditing = pathname === `/super-admin/programs/${folderID}/edit/${programID}`;

  const { data: modules } = useGetModules();
  const { fields, replace } = useFieldArray({ name: 'programModules', control });

  const handleRemove = (moduleId: number) => {
    const updatedSelectedModuleIds = new Set(selectedModuleIds.ids);
    updatedSelectedModuleIds.delete(moduleId);
    setSelectedModuleIds({ ids: updatedSelectedModuleIds });
    const programModules = getValues('programModules');
    const filteredModules = programModules.filter((md) => md.moduleId !== moduleId);
    setValue('programModules', filteredModules);
  };

  return (
    <Box py="6" w="full" {...props}>
      <Heading variant="Body2Semibold" color="grey.500" mb="4">
        Selected Modules
      </Heading>

      <Sortable
        id="select-modules"
        items={fields.map((field) => field.moduleId)}
        setItems={(item) => {
          const oldFields = getValues('programModules');
          const reorderedFields = item.map((id) => oldFields.find((field) => field.moduleId === id)!);
          setSelectedModuleIds({ ids: new Set(item as number[]) });
          replace(reorderedFields);
        }}
        sortingStrategy={rectSortingStrategy}
        modifiers={[]}
        disabled={isEditing}
      >
        <SimpleGrid columns={3} spacingX="12" spacingY="8">
          {fields.map((field, index) => {
            const moduleData = modules?.body.find((md) => md.id === field.moduleId);
            if (!moduleData) return null;
            const correctedModule = renameKey(moduleData, 'name', 'module');

            return (
              <SortableItem key={field.moduleId} id={field.moduleId}>
                <ModuleCard
                  module={correctedModule}
                  number={index + 1}
                  status="Edit"
                  onClick={() => {
                    setStep(2);
                    setActiveModuleId(field.moduleId);
                  }}
                  onRemove={() => handleRemove(field.moduleId)}
                  isDragging={isEditing ? false : true}
                />
              </SortableItem>
            );
          })}
        </SimpleGrid>
      </Sortable>
    </Box>
  );
});

SelectModules.displayName = 'SelectModules';

export default SelectModules;
