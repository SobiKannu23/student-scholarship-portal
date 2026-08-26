import { studentDocuments } from "../data/documentData";
import { mockApiCall } from "./mockApiClient";

const DOCUMENTS_KEY = "sspt_student_documents";

function readAllDocuments() {
  const raw = localStorage.getItem(DOCUMENTS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writeAllDocuments(all) {
  localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(all));
}

// Seeds a student's document list from documentData.js on first access
// (STU1001 gets the demo set; any other student starts with an empty list),
// same pattern as mockProfileService.js / mockApplicationService.js.
function ensureSeeded(all, userId) {
  if (!all[userId]) {
    all[userId] = studentDocuments[userId]
      ? JSON.parse(JSON.stringify(studentDocuments[userId]))
      : [];
    writeAllDocuments(all);
  }
  return all[userId];
}

export async function getStudentDocuments(userId) {
  await mockApiCall(null, 400);
  const all = readAllDocuments();
  return ensureSeeded(all, userId);
}

export async function getDocumentById(userId, docId) {
  await mockApiCall(null, 300);
  const all = readAllDocuments();
  const docs = ensureSeeded(all, userId);
  return docs.find((d) => d.id === docId) || null;
}

// Adds a new document for a student and persists it. Mirrors the shape of
// the seeded mock documents so DocumentCard/DocumentDetails work unchanged.
// Adds a new document for a student and persists it, including the uploaded
// file as a base64 data URL (fileData) plus its original name/type/size —
// there is no backend, so the file itself lives entirely in localStorage.
export async function addDocument(userId, documentData) {
  await mockApiCall(null, 500);
  const all = readAllDocuments();
  const docs = ensureSeeded(all, userId);

  const newDocument = {
    id: `DOC${Date.now().toString().slice(-6)}`,
    name: documentData.name,
    type: documentData.type,
    documentNumber: documentData.documentNumber,
    issuingAuthority: documentData.issuingAuthority,
    issueDate: documentData.issueDate,
    expiryDate: documentData.expiryDate,
    description: documentData.description || "",
    fileData: documentData.fileData || null,
    fileName: documentData.fileName || null,
    fileType: documentData.fileType || null,
    fileSize: documentData.fileSize || null,
  };

  docs.push(newDocument);
  all[userId] = docs;
  writeAllDocuments(all);
  return newDocument;
}

// Removes a student's document by ID and persists the change.
export async function removeDocument(userId, docId) {
  await mockApiCall(null, 300);
  const all = readAllDocuments();
  const docs = ensureSeeded(all, userId);
  const updated = docs.filter((d) => d.id !== docId);
  all[userId] = updated;
  writeAllDocuments(all);
  return updated;
}