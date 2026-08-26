// Placeholder data for dashboard widgets that aren't backed by real scholarship
// logic yet (that comes in a later module). Not part of the editable profile.
export const studentDashboardData = {
  STU1001: {
    scholarshipsSummary: {
      totalApplied: 3,
      approved: 1,
      pending: 1,
      rejected: 1,
    },
    documentTracker: [
      { name: "Community Certificate", status: "Verified" },
      { name: "Income Certificate", status: "Verified" },
      { name: "Aadhaar Card", status: "Verified" },
      { name: "Previous Year Marksheet", status: "Pending" },
    ],
    applicationJourney: [
      { stage: "Application Submitted", completed: true },
      { stage: "Document Verification", completed: true },
      { stage: "Eligibility Screening", completed: false },
      { stage: "Approval", completed: false },
      { stage: "Fund Disbursement", completed: false },
    ],
  },
};