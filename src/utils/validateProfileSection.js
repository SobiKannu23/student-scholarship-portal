import {
  isRequired,
  isValidPhone,
  isValidPincode,
  isValidIFSC,
  isValidAccountNumber,
  isValidYear,
  isInRange,
  isNumeric,
} from "./validators";

// Returns an { fieldName: "error message" } object. Empty object means the section is valid.
export function validateProfileSection(sectionKey, data) {
  const errors = {};

  switch (sectionKey) {
    case "personal":
      if (!isRequired(data.fullName)) errors.fullName = "Full name is required.";
      if (!isRequired(data.dateOfBirth)) errors.dateOfBirth = "Date of birth is required.";
      if (!isRequired(data.gender)) errors.gender = "Gender is required.";
      if (!isRequired(data.phone)) errors.phone = "Phone number is required.";
      else if (!isValidPhone(data.phone)) errors.phone = "Enter a valid 10-digit mobile number.";
      break;

    case "academic":
      if (!isRequired(data.college)) errors.college = "College name is required.";
      if (!isRequired(data.department)) errors.department = "Department is required.";
      if (!isRequired(data.course)) errors.course = "Course is required.";
      if (!isRequired(data.yearOfStudy)) errors.yearOfStudy = "Year of study is required.";
      if (!isRequired(data.admissionYear)) errors.admissionYear = "Admission year is required.";
      else if (!isValidYear(data.admissionYear)) errors.admissionYear = "Enter a valid year (e.g. 2023).";
      if (!isRequired(data.rollNumber)) errors.rollNumber = "Roll number is required.";
      if (!isRequired(data.cgpa)) errors.cgpa = "CGPA is required.";
      else if (!isNumeric(data.cgpa) || !isInRange(data.cgpa, 0, 10)) errors.cgpa = "CGPA must be between 0 and 10.";
      break;

    case "family":
      if (!isRequired(data.fatherName)) errors.fatherName = "Father's name is required.";
      if (!isRequired(data.motherName)) errors.motherName = "Mother's name is required.";
      if (!isRequired(data.guardianOccupation)) errors.guardianOccupation = "Occupation is required.";
      if (!isRequired(data.annualIncome)) errors.annualIncome = "Annual income is required.";
      else if (!isNumeric(data.annualIncome)) errors.annualIncome = "Enter a valid amount.";
      if (!isRequired(data.numberOfSiblings)) errors.numberOfSiblings = "Please enter number of siblings.";
      else if (!isNumeric(data.numberOfSiblings)) errors.numberOfSiblings = "Enter a valid number.";
      break;

    case "category":
      if (!isRequired(data.community)) errors.community = "Community is required.";
      if (!isRequired(data.religion)) errors.religion = "Religion is required.";
      if (!isRequired(data.isMinority)) errors.isMinority = "Please select an option.";
      break;

    case "disability":
      if (!isRequired(data.hasDisability)) errors.hasDisability = "Please select an option.";
      if (data.hasDisability === "Yes") {
        if (!isRequired(data.disabilityType)) errors.disabilityType = "Disability type is required.";
        if (!isRequired(data.disabilityPercentage)) {
          errors.disabilityPercentage = "Disability percentage is required.";
        } else if (!isNumeric(data.disabilityPercentage) || !isInRange(data.disabilityPercentage, 1, 100)) {
          errors.disabilityPercentage = "Enter a value between 1 and 100.";
        }
      }
      break;

    case "location":
      if (!isRequired(data.doorNo)) errors.doorNo = "Door number is required.";
      if (!isRequired(data.street)) errors.street = "Street is required.";
      if (!isRequired(data.village)) errors.village = "Village/Town is required.";
      if (!isRequired(data.taluk)) errors.taluk = "Taluk is required.";
      if (!isRequired(data.district)) errors.district = "District is required.";
      if (!isRequired(data.state)) errors.state = "State is required.";
      if (!isRequired(data.pincode)) errors.pincode = "Pincode is required.";
      else if (!isValidPincode(data.pincode)) errors.pincode = "Enter a valid 6-digit pincode.";
      if (!isRequired(data.residenceType)) errors.residenceType = "Please select residence type.";
      break;

    case "bank":
      if (!isRequired(data.accountHolderName)) errors.accountHolderName = "Account holder name is required.";
      if (!isRequired(data.bankName)) errors.bankName = "Bank name is required.";
      if (!isRequired(data.accountNumber)) errors.accountNumber = "Account number is required.";
      else if (!isValidAccountNumber(data.accountNumber)) errors.accountNumber = "Enter a valid account number (9-18 digits).";
      if (!isRequired(data.ifscCode)) errors.ifscCode = "IFSC code is required.";
      else if (!isValidIFSC(data.ifscCode)) errors.ifscCode = "Enter a valid IFSC code (e.g. IDIB0001234).";
      if (!isRequired(data.branch)) errors.branch = "Branch name is required.";
      break;

    default:
      break;
  }

  return errors;
}
