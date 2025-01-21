import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ComponentProps } from 'react';

type SortableProps = {
  children?: React.ReactNode;
  items: UniqueIdentifier[];
  setItems: (items: UniqueIdentifier[]) => void;
  sortingStrategy?: typeof verticalListSortingStrategy;
  modifiers: ComponentProps<typeof DndContext>['modifiers'];
  disabled?: boolean;
} & ComponentProps<typeof DndContext>;

export function Sortable({ children, items, setItems, sortingStrategy, modifiers, disabled, ...props }: SortableProps) {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={disabled ? [] : sensors}
      collisionDetection={closestCenter}
      modifiers={disabled ? [] : modifiers}
      onDragEnd={
        disabled
          ? undefined
          : ({ active, over }) => {
              if (over && active.id !== over.id) {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                if (activeIndex !== overIndex) setItems(arrayMove(items, activeIndex, overIndex));
              }
            }
      }
      {...props}
    >
      <SortableContext items={items} strategy={sortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
