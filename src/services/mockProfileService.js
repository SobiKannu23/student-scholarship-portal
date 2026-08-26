import { studentProfileSeed } from "../data/studentProfileDetails";
import { emptyProfile } from "../utils/profileSchema";
import { mockApiCall } from "./mockApiClient";

const PROFILE_KEY = "sspt_student_profiles";

function readAllProfiles() {
  const raw = localStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : {};
}

function writeAllProfiles(profiles) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
}

// Fetches a student's profile, seeding it on first access:
// - Known demo user (STU1001) -> seeded from studentProfileDetails.js
// - New registrant -> blank schema, with name/phone pre-filled from their signup
export async function getProfile(userId, seedHints = {}) {
    await mockApiCall(null, 300);
  const allProfiles = readAllProfiles();

  if (allProfiles[userId]) {
    return allProfiles[userId];
  }

  const seed = studentProfileSeed[userId];
  const initialProfile = seed
    ? JSON.parse(JSON.stringify(seed))
    : {
        ...JSON.parse(JSON.stringify(emptyProfile)),
        personal: {
          ...emptyProfile.personal,
          fullName: seedHints.name || "",
          phone: seedHints.phone || "",
        },
      };

  allProfiles[userId] = initialProfile;
  writeAllProfiles(allProfiles);
  return initialProfile;
}

// Merges new data into one section only, leaving other sections untouched
export async function updateProfileSection(userId, sectionKey, sectionData) {
    await mockApiCall(null, 500);
  const allProfiles = readAllProfiles();
  const existing = allProfiles[userId] || JSON.parse(JSON.stringify(emptyProfile));

  const updated = {
    ...existing,
    [sectionKey]: { ...existing[sectionKey], ...sectionData },
  };

  allProfiles[userId] = updated;
  writeAllProfiles(allProfiles);
  return updated;
}