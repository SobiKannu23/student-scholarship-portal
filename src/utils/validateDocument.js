import { isRequired } from "./validators";
import { isAllowedFileType, isAllowedFileSize } from "./fileHelpers";

// Validates the "Add Document" form fields before saving
export function validateDocumentForm(data, file) {
  const errors = {};

  if (!isRequired(data.name)) errors.name = "Document name is required.";
  if (!isRequired(data.type)) errors.type = "Document type is required.";
  if (!isRequired(data.documentNumber)) errors.documentNumber = "Document number is required.";
  if (!isRequired(data.issuingAuthority)) errors.issuingAuthority = "Issuing authority is required.";
  if (!isRequired(data.issueDate)) errors.issueDate = "Issue date is required.";
  if (!isRequired(data.expiryDate)) {
    errors.expiryDate = "Expiry date is required.";
  } else if (data.issueDate && new Date(data.expiryDate) <= new Date(data.issueDate)) {
    errors.expiryDate = "Expiry date must be after the issue date.";
  }

  if (!file) {
    errors.file = "Please select a file to upload.";
  } else if (!isAllowedFileType(file)) {
    errors.file = "Only PDF, JPG, and PNG files are allowed.";
  } else if (!isAllowedFileSize(file)) {
    errors.file = "File size must be under 2 MB.";
  }

  return errors;
}