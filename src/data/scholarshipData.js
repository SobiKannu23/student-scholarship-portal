// Dates are ISO strings (YYYY-MM-DD). Status (Open/Upcoming/Closed) is never
// stored here — it is always derived at runtime from openDate/closeDate so it's
// never stale. Spread across months so the calendar has something to show
// whichever month the student navigates to.
export const scholarships = [
  {
    id: "SCH001",
    title: "Tamil Nadu Chief Minister's Merit Scholarship",
    provider: "Directorate of Collegiate Education, Tamil Nadu",
    category: "Merit-cum-Means",
    amount: "Rs. 15,000 per annum",
    description:
      "Awarded to meritorious undergraduate students from economically weaker sections studying in government and government-aided colleges across Tamil Nadu.",
    eligibility: [
      "Must be a bona fide resident of Tamil Nadu",
      "Minimum 75% aggregate marks in the qualifying examination",
      "Annual family income below Rs. 2,50,000",
      "Studying in a recognized government or aided institution",
    ],
    documentsRequired: [
      "Community Certificate",
      "Income Certificate",
      "Previous Year Marksheet",
      "Bank Passbook Copy",
    ],
    applicationMode: "Online via TN e-Scholarship Portal (Demo)",
    openDate: "2026-07-01",
    closeDate: "2026-09-15",
    importantDates: [
      { label: "Application Start Date", date: "2026-07-01" },
      { label: "Last Date to Apply", date: "2026-09-15" },
      { label: "Document Verification Deadline", date: "2026-09-25" },
      { label: "Result Announcement", date: "2026-10-15" },
    ],
  },
  {
    id: "SCH002",
    title: "Post-Matric Scholarship for SC/ST Students",
    provider: "Adi Dravidar and Tribal Welfare Department, Tamil Nadu",
    category: "Community-Based",
    amount: "Full Tuition Fee Waiver + Rs. 10,000 maintenance allowance",
    description:
      "Central and state co-funded scheme supporting SC/ST students pursuing post-matriculation and higher education courses.",
    eligibility: [
      "Must belong to a Scheduled Caste or Scheduled Tribe community",
      "Annual family income below Rs. 2,50,000",
      "Enrolled in a recognized post-matric course",
    ],
    documentsRequired: [
      "Community Certificate",
      "Income Certificate",
      "Aadhaar Card",
      "College Bonafide Certificate",
    ],
    applicationMode: "Online via TN e-Scholarship Portal (Demo)",
    openDate: "2026-06-01",
    closeDate: "2026-08-10",
    importantDates: [
      { label: "Application Start Date", date: "2026-06-01" },
      { label: "Last Date to Apply", date: "2026-08-10" },
      { label: "Institution Verification Deadline", date: "2026-08-20" },
    ],
  },
  {
    id: "SCH003",
    title: "National Means-cum-Merit Scholarship",
    provider: "Ministry of Education, Government of India",
    category: "Merit-cum-Means",
    amount: "Rs. 12,000 per annum",
    description:
      "A central government scheme to support meritorious students from economically weaker sections to reduce the dropout rate at the higher education stage.",
    eligibility: [
      "Minimum 70% aggregate marks in the qualifying examination",
      "Annual family income below Rs. 3,50,000",
      "Studying in a state-recognized institution",
    ],
    documentsRequired: [
      "Income Certificate",
      "Previous Year Marksheet",
      "Aadhaar Card",
      "Bank Passbook Copy",
    ],
    applicationMode: "Online via National Scholarship Portal (Demo)",
    openDate: "2026-09-01",
    closeDate: "2026-10-31",
    importantDates: [
      { label: "Application Start Date", date: "2026-09-01" },
      { label: "Last Date to Apply", date: "2026-10-31" },
      { label: "Merit List Publication", date: "2026-11-20" },
    ],
  },
  {
    id: "SCH004",
    title: "Minority Welfare Scholarship",
    provider: "Tamil Nadu Minorities Welfare Department",
    category: "Minority",
    amount: "Rs. 8,000 per annum",
    description:
      "Financial assistance for students belonging to notified minority communities pursuing undergraduate and postgraduate education.",
    eligibility: [
      "Must belong to a notified minority community",
      "Annual family income below Rs. 2,00,000",
      "Minimum 60% marks in the previous academic year",
    ],
    documentsRequired: [
      "Minority Community Certificate",
      "Income Certificate",
      "Previous Year Marksheet",
    ],
    applicationMode: "Online via TN e-Scholarship Portal (Demo)",
    openDate: "2026-08-15",
    closeDate: "2026-09-30",
    importantDates: [
      { label: "Application Start Date", date: "2026-08-15" },
      { label: "Last Date to Apply", date: "2026-09-30" },
      { label: "Document Verification Deadline", date: "2026-10-10" },
    ],
  },
  {
    id: "SCH005",
    title: "Differently-Abled Students Scholarship",
    provider: "Department of Welfare of Differently Abled Persons, Tamil Nadu",
    category: "Disability",
    amount: "Rs. 18,000 per annum",
    description:
      "Supports differently-abled students in pursuing higher education by covering tuition and essential learning aid costs.",
    eligibility: [
      "Minimum 40% disability as per medical board certification",
      "Enrolled in a recognized degree or diploma program",
      "Annual family income below Rs. 3,00,000",
    ],
    documentsRequired: [
      "Disability Certificate",
      "Income Certificate",
      "College Bonafide Certificate",
      "Aadhaar Card",
    ],
    applicationMode: "Online via TN e-Scholarship Portal (Demo)",
    openDate: "2026-10-01",
    closeDate: "2026-11-15",
    importantDates: [
      { label: "Application Start Date", date: "2026-10-01" },
      { label: "Last Date to Apply", date: "2026-11-15" },
      { label: "Medical Board Verification Deadline", date: "2026-11-25" },
    ],
  },
  {
    id: "SCH006",
    title: "First Graduate Family Scholarship",
    provider: "Directorate of Collegiate Education, Tamil Nadu",
    category: "Merit-cum-Means",
    amount: "Rs. 10,000 per annum",
    description:
      "Encourages higher education among students who will be the first graduate in their immediate family.",
    eligibility: [
      "No family member holds a graduate degree",
      "Studying in a recognized undergraduate program",
      "Annual family income below Rs. 2,50,000",
    ],
    documentsRequired: [
      "Family Declaration Form",
      "Income Certificate",
      "Previous Year Marksheet",
    ],
    applicationMode: "Online via TN e-Scholarship Portal (Demo)",
    openDate: "2026-05-01",
    closeDate: "2026-07-31",
    importantDates: [
      { label: "Application Start Date", date: "2026-05-01" },
      { label: "Last Date to Apply", date: "2026-07-31" },
      { label: "Result Announcement", date: "2026-08-25" },
    ],
  },
  {
    id: "SCH007",
    title: "Engineering Excellence Scholarship",
    provider: "Tamil Nadu State-Industry Partnership Fund",
    category: "Merit-cum-Means",
    amount: "Rs. 25,000 per annum",
    description:
      "A state and industry co-funded scholarship recognizing outstanding engineering students with strong academic performance.",
    eligibility: [
      "Enrolled in a recognized B.E. / B.Tech program",
      "Minimum CGPA of 8.0",
      "Annual family income below Rs. 4,00,000",
    ],
    documentsRequired: [
      "Semester Mark Sheets",
      "Income Certificate",
      "College Bonafide Certificate",
    ],
    applicationMode: "Online via TN e-Scholarship Portal (Demo)",
    openDate: "2026-08-01",
    closeDate: "2026-08-31",
    importantDates: [
      { label: "Application Start Date", date: "2026-08-01" },
      { label: "Last Date to Apply", date: "2026-08-31" },
      { label: "Interview Round", date: "2026-09-15" },
    ],
  },
  {
    id: "SCH008",
    title: "Girl Child Higher Education Scholarship",
    provider: "Directorate of Social Welfare, Tamil Nadu",
    category: "Merit-cum-Means",
    amount: "Rs. 20,000 per annum",
    description:
      "Promotes higher education among girl students from economically weaker backgrounds across Tamil Nadu.",
    eligibility: [
      "Applicant must be a female student",
      "Annual family income below Rs. 2,50,000",
      "Minimum 65% marks in the qualifying examination",
    ],
    documentsRequired: [
      "Income Certificate",
      "Previous Year Marksheet",
      "Aadhaar Card",
    ],
    applicationMode: "Online via TN e-Scholarship Portal (Demo)",
    openDate: "2026-11-01",
    closeDate: "2026-12-31",
    importantDates: [
      { label: "Application Start Date", date: "2026-11-01" },
      { label: "Last Date to Apply", date: "2026-12-31" },
      { label: "Result Announcement", date: "2027-01-20" },
    ],
  },
];