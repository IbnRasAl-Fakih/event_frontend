import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });
}

async function getCroppedImage(imageSrc, pixelCrop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas context is not available");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return canvas.toDataURL("image/png");
}

export default function PhotoEditorModal({ imageSrc, onClose, onSave }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((_croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = useCallback(async () => {
    if (!croppedAreaPixels || isSaving) return;
    setIsSaving(true);
    try {
      const result = await getCroppedImage(imageSrc, croppedAreaPixels);
      onSave(result);
    } finally {
      setIsSaving(false);
    }
  }, [croppedAreaPixels, imageSrc, isSaving, onSave]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/35 p-4 backdrop-blur-[2px] backdrop-brightness-110">
      <div className="w-full max-w-2xl rounded-3xl border border-white/70 bg-white/95 p-5 shadow-[0_30px_80px_-35px_rgba(15,23,42,0.45)] sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base font-semibold text-slate-800">Edit profile photo</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-red-200/90 bg-red-50/70 text-sm font-medium text-red-400 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            aria-label="Close editor"
          >
            <span aria-hidden="true" className="translate-y-[-1px] text-lg">
              ×
            </span>
          </button>
        </div>

        <div className="mt-4 h-[300px] overflow-hidden rounded-2xl bg-slate-100 sm:h-[360px]">
          <div className="relative h-full w-full">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              cropShape="round"
              showGrid={false}
              aspect={1}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/3 top-0 h-full w-px bg-white/60" />
              <div className="absolute left-2/3 top-0 h-full w-px bg-white/60" />
              <div className="absolute left-0 top-1/3 h-px w-full bg-white/60" />
              <div className="absolute left-0 top-2/3 h-px w-full bg-white/60" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSaving ? "Saving..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}