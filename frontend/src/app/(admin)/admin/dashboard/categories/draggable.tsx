"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Category as CategoryType, Product } from "@/types/api";
import Category from "./category";

type Props = {
  items: CategoryType[];
  setItems: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

export default function DraggableCategoryList({ items, setItems }: Props) {
  const ids = items.map((c) => c.id);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((cats) => {
        const oldIndex = cats.findIndex((c) => c.id === active.id);
        const newIndex = cats.findIndex((c) => c.id === over.id);
        return arrayMove(cats, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2 w-full">
          {items.map((cat) => (
            <Category key={cat.id} category={cat} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
