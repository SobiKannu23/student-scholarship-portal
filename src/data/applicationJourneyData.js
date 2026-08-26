// Mock officer-review timeline and award data, keyed by application ID.
// Only applications that have progressed through review (the seeded APP001)
// have a full stage history here. Any application without an entry is
// treated as freshly submitted — see mockApplicationJourneyService.js.
export const applicationJourneys = {
  APP001: {
    stages: [
      {
        name: "Submitted",
        status: "Completed",
        date: "2026-06-20",
        comment: "Application submitted successfully by the student.",
      },
      {
        name: "Document Verification",
        status: "Completed",
        date: "2026-06-25",
        comment: "All submitted documents were verified against originals.",
      },
      {
        name: "Officer Review",
        status: "Completed",
        date: "2026-07-02",
        comment: "Eligibility criteria checked and confirmed by the district officer.",
      },
      {
        name: "Approved",
        status: "Completed",
        date: "2026-07-10",
        comment: "Application approved for scholarship disbursement.",
      },
    ],
  },
};

export const awardDetails = {
  APP001: {
    awardStatus: "Awarded",
    scholarshipAmount: "Rs. 10,000",
    approvalDate: "2026-07-10",
    disbursementMode: "Direct Bank Transfer",
    remarks: "The awarded amount will be credited within 15 working days of approval.",
  },
};