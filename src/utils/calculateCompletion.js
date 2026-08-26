import { sectionsConfig } from "../data/profileSectionsConfig";

// Walks every field defined in profileSectionsConfig.js and checks whether it's filled.
// Disability sub-fields only count when hasDisability === "Yes", so an unaffected
// student isn't penalized for leaving them blank.
export function calculateProfileCompletion(profile) {
  if (!profile) return 0;

  let totalFields = 0;
  let filledFields = 0;

  sectionsConfig.forEach((section) => {
    const sectionData = profile[section.key] || {};

    section.fields.forEach((field) => {
      const isConditionalDisabilityField = section.key === "disability" && field.name !== "hasDisability";
      if (isConditionalDisabilityField && sectionData.hasDisability !== "Yes") {
        return; // skip counting this field entirely
      }

      totalFields += 1;
      const value = sectionData[field.name];
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        filledFields += 1;
      }
    });
  });

  return totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);
}