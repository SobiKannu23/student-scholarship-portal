const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024; // 2 MB — keeps localStorage usage reasonable

export function isAllowedFileType(file) {
  return ALLOWED_TYPES.includes(file.type);
}

export function isAllowedFileSize(file) {
  return file.size <= MAX_FILE_SIZE_BYTES;
}

// Converts a File object to a base64 data URL so it can be stored as plain
// text in localStorage (no backend/file storage exists in this project).
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}