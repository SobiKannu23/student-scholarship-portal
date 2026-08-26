import { studentApplications } from "../data/applicationData";
import { mockApiCall } from "./mockApiClient";
import { addApplicationRecord } from "./mockOfficerApplicationService";

const APPLICATIONS_KEY = "sspt_student_applications";

function readAllApplications() {
  const raw = localStorage.getItem(APPLICATIONS_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writeAllApplications(all) {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(all));
}

// Seeds a student's application list from applicationData.js on first access,
// same pattern as mockProfileService.js
function ensureSeeded(all, userId) {
  if (!all[userId]) {
    all[userId] = studentApplications[userId]
      ? JSON.parse(JSON.stringify(studentApplications[userId]))
      : [];
    writeAllApplications(all);
  }
  return all[userId];
}

export async function getApplicationsByStudent(userId) {
  await mockApiCall(null, 300);
  const all = readAllApplications();
  return ensureSeeded(all, userId);
}

export async function getApplicationByScholarship(userId, scholarshipId) {
  await mockApiCall(null, 300);
  const all = readAllApplications();
  const applications = ensureSeeded(all, userId);
  return applications.find((a) => a.scholarshipId === scholarshipId) || null;
}

export async function getApplicationById(userId, applicationId) {
  await mockApiCall(null, 300);
  const all = readAllApplications();
  const applications = ensureSeeded(all, userId);
  return applications.find((a) => a.id === applicationId) || null;
}

export async function submitApplication(userId, scholarshipId, meta = {}) {
  await mockApiCall(null, 600);
  const all = readAllApplications();
  const applications = ensureSeeded(all, userId);

  const existing = applications.find((a) => a.scholarshipId === scholarshipId);
  if (existing) return existing; // guard against duplicate submission

  const newApplication = {
    id: `APP${Date.now().toString().slice(-6)}`,
    scholarshipId,
    status: "Submitted",
    submittedDate: new Date().toISOString().slice(0, 10),
  };

  applications.push(newApplication);
  all[userId] = applications;
  writeAllApplications(all);

  // Mirror this submission into the Officer CRM store so it appears
  // alongside the seeded demo applications, without altering them.
  addApplicationRecord({
    id: newApplication.id,
    studentId: userId,
    studentName: meta.studentName || "Unknown Student",
    scholarshipId,
    scholarshipTitle: meta.scholarshipTitle || "Unknown Scholarship",
    category: meta.category || "N/A",
    status: "Pending",
    submittedDate: newApplication.submittedDate,
    documentsSubmitted: meta.documentsSubmitted || [],
  });

  return newApplication;
}

// Called by the officer-side submitReview so an approve/reject decision
// reflects back into the student's own application record (My Applications,
// Application Journey).
export function updateStudentApplicationStatus(userId, applicationId, status) {
  const all = readAllApplications();
  const applications = ensureSeeded(all, userId);
  const index = applications.findIndex((a) => a.id === applicationId);
  if (index === -1) return null;

  applications[index] = { ...applications[index], status };
  all[userId] = applications;
  writeAllApplications(all);
  return applications[index];
}