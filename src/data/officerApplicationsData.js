// Mock scholarship applications across all students, for the Officer CRM overview.
// Kept separate from the per-student application records used in the student-side
// Application Journey (Module 6), since the officer needs a cross-student view
// rather than a single student's own applications.
// documentsSubmitted describes what the officer sees during review.
// reviewComment/reviewedDate/reviewedBy are only present once an officer has
// actually reviewed the application (set via submitReview in the service).
export const officerApplications = [
  {
    id: "APP001",
    studentName: "Arun Kumar",
    scholarshipTitle: "Post-Matric Scholarship for SC/ST Students",
    scholarshipId: "SCH002",
    category: "Community-Based",
    status: "Approved",
    submittedDate: "2026-06-20",
    documentsSubmitted: [
      { name: "Community Certificate", status: "Uploaded" },
      { name: "Income Certificate", status: "Uploaded" },
      { name: "Aadhaar Card", status: "Uploaded" },
      { name: "College Bonafide Certificate", status: "Uploaded" },
    ],
    reviewComment: "All documents verified and eligibility criteria met. Approved for disbursement.",
    reviewedDate: "2026-07-10",
    reviewedBy: "Priya Raman",
  },
  {
    id: "APP101",
    studentName: "Divya Shankar",
    scholarshipTitle: "Tamil Nadu Chief Minister's Merit Scholarship",
    scholarshipId: "SCH001",
    category: "Merit-cum-Means",
    status: "Pending",
    submittedDate: "2026-07-05",
    documentsSubmitted: [
      { name: "Community Certificate", status: "Uploaded" },
      { name: "Income Certificate", status: "Uploaded" },
      { name: "Previous Year Marksheet", status: "Uploaded" },
      { name: "Bank Passbook Copy", status: "Pending" },
    ],
  },
  {
    id: "APP102",
    studentName: "Karthik Raja",
    scholarshipTitle: "National Means-cum-Merit Scholarship",
    scholarshipId: "SCH003",
    category: "Merit-cum-Means",
    status: "Pending",
    submittedDate: "2026-09-10",
    documentsSubmitted: [
      { name: "Income Certificate", status: "Uploaded" },
      { name: "Previous Year Marksheet", status: "Uploaded" },
      { name: "Aadhaar Card", status: "Uploaded" },
      { name: "Bank Passbook Copy", status: "Uploaded" },
    ],
  },
  {
    id: "APP103",
    studentName: "Lakshmi Priya",
    scholarshipTitle: "Minority Welfare Scholarship",
    scholarshipId: "SCH004",
    category: "Minority",
    status: "Rejected",
    submittedDate: "2026-08-20",
    documentsSubmitted: [
      { name: "Minority Community Certificate", status: "Uploaded" },
      { name: "Income Certificate", status: "Not Uploaded" },
      { name: "Previous Year Marksheet", status: "Uploaded" },
    ],
    reviewComment: "Income Certificate was not submitted. Application does not meet eligibility requirements.",
    reviewedDate: "2026-08-28",
    reviewedBy: "Priya Raman",
  },
  {
    id: "APP104",
    studentName: "Mohamed Faizal",
    scholarshipTitle: "Engineering Excellence Scholarship",
    scholarshipId: "SCH007",
    category: "Merit-cum-Means",
    status: "Approved",
    submittedDate: "2026-08-05",
    documentsSubmitted: [
      { name: "Semester Mark Sheets", status: "Uploaded" },
      { name: "Income Certificate", status: "Uploaded" },
      { name: "College Bonafide Certificate", status: "Uploaded" },
    ],
    reviewComment: "Strong academic record and all documents in order. Approved.",
    reviewedDate: "2026-08-12",
    reviewedBy: "Priya Raman",
  },
  {
    id: "APP105",
    studentName: "Nandhini Raj",
    scholarshipTitle: "First Graduate Family Scholarship",
    scholarshipId: "SCH006",
    category: "Merit-cum-Means",
    status: "Pending",
    submittedDate: "2026-05-15",
    documentsSubmitted: [
      { name: "Family Declaration Form", status: "Uploaded" },
      { name: "Income Certificate", status: "Uploaded" },
      { name: "Previous Year Marksheet", status: "Uploaded" },
    ],
  },
];