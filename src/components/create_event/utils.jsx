export function createUploadItem(file, suffix = "") {
  return {
    id: `${file.name}-${file.lastModified}-${suffix}-${Math.random().toString(36).slice(2, 8)}`,
    file,
    name: file.name,
    progress: 100,
    previewUrl: URL.createObjectURL(file),
  };
}
