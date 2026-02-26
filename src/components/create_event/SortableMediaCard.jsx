import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DeleteIcon from "../svg_icons/DeleteIcon";
import GripIcon from "../svg_icons/GripIcon";

export default function SortableMediaCard({ item, onRemove, isCover }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div
        className={`relative overflow-hidden rounded-2xl border bg-white shadow-[0_18px_30px_-22px_rgba(2,132,199,0.45)] ${
          isCover ? "border-sky-500 ring-2 ring-sky-200" : "border-sky-100"
        }`}
      >
        <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-2">
          <button
            type="button"
            className="cursor-grab rounded-md bg-slate-900/55 p-1.5 pr-1 backdrop-blur active:cursor-grabbing"
            aria-label={`Reorder ${item.name}`}
            {...attributes}
            {...listeners}
          >
            <GripIcon />
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="rounded-xl border border-white/40 bg-white/90 p-2 text-rose-500 shadow-sm transition hover:bg-white"
            aria-label={`Remove ${item.name}`}
          >
            <DeleteIcon />
          </button>
        </div>

        <div className="aspect-[4/3] bg-slate-100">
          <img
            src={item.previewUrl}
            alt={item.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        </div>

        {isCover ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-sky-900/65 to-transparent p-3">
            <div className="inline-flex rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
              Event Cover
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}