import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import PrimaryButton from "../PrimaryButton";
import CloudUploadIcon from "../svg_icons/CloudUploadIcon";
import CoverDropzone from "./CoverDropzone";
import SortableMediaCard from "./SortableMediaCard";
import { COVER_DROPZONE_ID } from "./constants";
import { createUploadItem } from "./utils";

export default function MediaStep({
  files,
  setFiles,
  coverFileId,
  setCoverFileId,
  onBack,
  onNext,
}) {
  const [activeDragId, setActiveDragId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const coverItem = useMemo(
    () => files.find((item) => item.id === coverFileId) ?? null,
    [files, coverFileId]
  );

  const onGalleryDrop = React.useCallback(
    (acceptedFiles) => {
      const nextItems = acceptedFiles.map((file, index) => createUploadItem(file, `gallery-${index}`));
      setFiles((prev) => [...prev, ...nextItems]);
    },
    [setFiles]
  );

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps,
    isDragActive: isGalleryDragActive,
    open: openGalleryPicker,
  } = useDropzone({
    onDrop: onGalleryDrop,
    multiple: true,
    noClick: true,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
  });

  const handleRemove = (id) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((item) => item.id === id);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });

    setCoverFileId((prev) => (prev === id ? null : prev));
  };

  const handleDragStart = (event) => {
    setActiveDragId(String(event.active.id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveDragId(null);
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (overId === COVER_DROPZONE_ID) {
      setCoverFileId(activeId);
      return;
    }

    if (activeId === overId) return;

    setFiles((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === activeId);
      const newIndex = prev.findIndex((item) => item.id === overId);
      if (oldIndex < 0 || newIndex < 0) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleDragCancel = () => {
    setActiveDragId(null);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Media</h2>
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
          <span className="inline-flex h-2 w-2 rounded-full bg-sky-500" />
          {files.length} image{files.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="mt-4 rounded-2xl from-sky-50 to-cyan-50 p-4 sm:p-5">
        <div
          {...getGalleryRootProps()}
          className={`rounded-2xl border-2 border-dashed p-6 transition sm:p-8 ${
            isGalleryDragActive
              ? "border-sky-400 bg-white"
              : "border-sky-300/90 bg-white/75 hover:border-sky-400 hover:bg-white"
          }`}
        >
          <input {...getGalleryInputProps()} />
          <div className="flex flex-col items-center text-center">
            <div className="rounded-2xl p-4 text-sky-500">
              <CloudUploadIcon className="h-20 w-auto text-sky-500" />
            </div>
            <p className="text-base font-semibold text-slate-700">Drag your image here or 
              <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openGalleryPicker();
              }}
              className="ml-2 inline-flex items-center text-sm font-semibold text-sky-700"
            >
              Browse
            </button></p>
            
            <p className="mt-2 text-xs text-slate-400">Support: JPG, JPEG, PNG, WEBP</p>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="mt-6">
          {files.length ? (
            <SortableContext items={files.map((item) => item.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {files.map((item) => (
                  <SortableMediaCard
                    key={item.id}
                    item={item}
                    onRemove={handleRemove}
                    isCover={item.id === coverFileId}
                  />
                ))}
              </div>
            </SortableContext>
          ) : (
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-10 text-center">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.08),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.08),transparent_42%)]" />
              <div className="relative">
                <p className="text-sm font-semibold text-slate-700">Your gallery is empty</p>
                <p className="mt-1 text-sm text-slate-500">Upload a few photos to build a preview grid for the event page.</p>
              </div>
            </div>
          )}
        </div>

        <CoverDropzone
          coverItem={coverItem}
          hasFiles={files.length > 0}
          activeDragId={activeDragId}
          onClear={() => setCoverFileId(null)}
        />
      </DndContext>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-40">
          <PrimaryButton className="mt-0 bg-white hover:bg-sky-50 text-sm" onClick={onBack}>
            Back
          </PrimaryButton>
        </div>
        <div className="w-full sm:max-w-40">
          <PrimaryButton className="mt-0 rounded-xl text-sm" onClick={onNext}>
            Next
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
