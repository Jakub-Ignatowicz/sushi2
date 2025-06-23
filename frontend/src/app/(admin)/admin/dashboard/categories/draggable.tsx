"use client";

import { useEffect, useState } from "react";
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
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Category as CategoryType } from "@/types/api";
import Category from "./category";

function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

type Props = {
  items: CategoryType[];
  setItems: (items: CategoryType[]) => void;
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
            <SortableItem key={cat.id} id={cat.id}>
              <Category category={cat} />
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
