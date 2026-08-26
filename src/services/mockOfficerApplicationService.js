import { officerApplications } from "../data/officerApplicationsData";
import { mockApiCall } from "./mockApiClient";
import { updateStudentApplicationStatus } from "./mockApplicationService";

const OFFICER_APPLICATIONS_KEY = "sspt_officer_applications";

function readAllApplications() {
  const raw = localStorage.getItem(OFFICER_APPLICATIONS_KEY);
  return raw ? JSON.parse(raw) : null;
}

function writeAllApplications(applications) {
  localStorage.setItem(OFFICER_APPLICATIONS_KEY, JSON.stringify(applications));
}

// Seeds from officerApplicationsData.js on first access, so approve/reject
// decisions persist across refreshes without mutating the original mock data.
function ensureSeeded() {
  let applications = readAllApplications();
  if (!applications) {
    applications = JSON.parse(JSON.stringify(officerApplications));
    writeAllApplications(applications);
  }
  return applications;
}

export async function getApplicationCounts() {
  await mockApiCall(null, 400);
  const applications = ensureSeeded();
  const counts = { total: applications.length, pending: 0, approved: 0, rejected: 0 };
  applications.forEach((app) => {
    if (app.status === "Pending") counts.pending += 1;
    if (app.status === "Approved") counts.approved += 1;
    if (app.status === "Rejected") counts.rejected += 1;
  });
  return counts;
}

export async function getRecentApplications(limit = 5) {
  await mockApiCall(null, 400);
  const applications = ensureSeeded();
  return [...applications]
    .sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate))
    .slice(0, limit);
}

export async function getAllApplications() {
  await mockApiCall(null, 400);
  return ensureSeeded();
}

export async function getApplicationDetailsById(id) {
  await mockApiCall(null, 300);
  const applications = ensureSeeded();
  return applications.find((app) => app.id === id) || null;
}

export async function getFilterOptions() {
  await mockApiCall(null, 200);
  const applications = ensureSeeded();
  const scholarshipTitles = [...new Set(applications.map((a) => a.scholarshipTitle))];
  const categories = [...new Set(applications.map((a) => a.category))];
  return { scholarshipTitles, categories };
}

// Records an officer's review decision against an application: updates its
// status and stores the comment, decision date, and reviewing officer's name.
export async function submitReview(applicationId, decision, comment, officerName) {
  await mockApiCall(null, 500);
  const applications = ensureSeeded();
  const index = applications.findIndex((app) => app.id === applicationId);
  if (index === -1) throw new Error("Application not found.");

  const updated = {
    ...applications[index],
    status: decision,
    reviewComment: comment,
    reviewedDate: new Date().toISOString().slice(0, 10),
    reviewedBy: officerName,
  };

  applications[index] = updated;
  writeAllApplications(applications);

  // Mirror the decision back into the student's own application record so
  // My Applications / Application Journey reflect the officer's review.
  if (updated.studentId) {
    updateStudentApplicationStatus(updated.studentId, applicationId, decision);
  }

  return updated;
}
// Called by the student-side submitApplication so a real submission appears
// in the officer's CRM list alongside the seeded demo applications. Skips
// duplicates (e.g. if called twice for the same application ID).
export function addApplicationRecord(record) {
  const applications = ensureSeeded();
  const alreadyExists = applications.some((app) => app.id === record.id);
  if (alreadyExists) return applications;

  applications.push(record);
  writeAllApplications(applications);
  return applications;
}