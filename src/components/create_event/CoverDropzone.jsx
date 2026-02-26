import React from "react";
import { useDroppable } from "@dnd-kit/core";
import CloudUploadIcon from "../svg_icons/CloudUploadIcon";
import { COVER_DROPZONE_ID } from "./constants";

export default function CoverDropzone({ coverItem, hasFiles, activeDragId, onClear }) {
  const { isOver, setNodeRef } = useDroppable({
    id: COVER_DROPZONE_ID,
  });
  const isDraggingGalleryItem = Boolean(activeDragId);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-800">Event Cover</p>
        {coverItem ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-rose-500 transition hover:text-rose-600"
          >
            Clear cover
          </button>
        ) : null}
      </div>

      <div
        ref={setNodeRef}
        className={`mt-3 mx-auto relative max-w-xl overflow-hidden rounded-2xl border-2 border-dashed p-3 transition ${
          isOver
            ? "border-sky-500 bg-sky-50 shadow-[0_0_0_6px_rgba(14,165,233,0.12)]"
            : "border-sky-300 bg-sky-50/70"
        }`}
      >
        {coverItem ? (
          <div className="relative aspect-[4/3]">
            <img
              src={coverItem.previewUrl}
              alt="Event cover preview"
              className="h-full w-full rounded-xl object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />
            <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/40 bg-slate-900/60 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              Cover image
            </div>
          </div>
        ) : (
          <div className="relative aspect-[4/3] rounded-xl bg-[#dceef9]">
            <div className="absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_28%_24%,rgba(14,165,233,0.12),transparent_46%),radial-gradient(circle_at_78%_78%,rgba(56,189,248,0.12),transparent_42%)]" />
            <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
              <div className="rounded-[22px] bg-white/0 p-3 text-sky-500">
                <CloudUploadIcon className="h-20 w-auto text-sky-500" />
              </div>
              <p className="text-sm font-semibold text-sky-800">Drag photo here for cover</p>
              <p className="mt-1 text-xs text-sky-700/80">
                {hasFiles ? "Drop from gallery" : "Upload images first"}
              </p>
            </div>
          </div>
        )}

        {isDraggingGalleryItem && !isOver ? (
          <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent" />
        ) : null}
      </div>
    </div>
  );
}