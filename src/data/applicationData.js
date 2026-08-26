// Mock applications per student, keyed by user ID. Only tracks the fact that an
// application was submitted (status "Submitted") — approval/rejection workflow
// belongs to a future officer-side module and is intentionally not built here.
export const studentApplications = {
  STU1001: [
    {
      id: "APP001",
      scholarshipId: "SCH002",
      status: "Submitted",
      submittedDate: "2026-06-20",
      status: "Approved",
    },
  ],
};