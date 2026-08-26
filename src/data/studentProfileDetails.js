// Full nested profile schema, seeded only for the demo student (STU1001).
// Newly registered students start with a blank profile (see mockProfileService.js).
export const studentProfileSeed = {
  STU1001: {
    personal: {
      fullName: "Arun Kumar",
      dateOfBirth: "2004-03-12",
      gender: "Male",
      phone: "9876543210",
    },
    academic: {
      college: "Government College of Engineering, Salem",
      department: "Computer Science and Engineering",
      course: "B.E. Computer Science and Engineering",
      yearOfStudy: "2nd Year",
      admissionYear: "2023",
      rollNumber: "GCE23CSE045",
      cgpa: "8.2",
    },
    family: {
      fatherName: "Kumar Selvam",
      motherName: "Meena Kumar",
      guardianOccupation: "Farmer",
      annualIncome: "185000",
      numberOfSiblings: "1",
    },
    category: {
      community: "BC",
      religion: "Hindu",
      isMinority: "No",
    },
    disability: {
      hasDisability: "No",
      disabilityType: "",
      disabilityPercentage: "",
    },
    location: {
      doorNo: "12A",
      street: "Gandhi Street",
      village: "Ammapet",
      taluk: "Salem",
      district: "Salem",
      state: "Tamil Nadu",
      pincode: "636003",
      residenceType: "Urban",
    },
    bank: {
      accountHolderName: "Arun Kumar",
      bankName: "Indian Bank",
      accountNumber: "6547893210",
      ifscCode: "IDIB000S123",
      branch: "Salem Main Branch",
    },
  },
};