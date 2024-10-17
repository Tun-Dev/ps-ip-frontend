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
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
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
} & ComponentProps<typeof DndContext>;

export function Sortable({ children, items, setItems, ...props }: SortableProps) {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={({ active, over }) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = over ? items.indexOf(over.id) : -1;
        if (activeIndex !== overIndex) setItems(arrayMove(items, activeIndex, overIndex));
      }}
      {...props}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}
