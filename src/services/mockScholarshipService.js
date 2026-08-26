import { scholarships } from "../data/scholarshipData";
import { mockApiCall } from "./mockApiClient";

export async function getAllScholarships() {
  await mockApiCall(null, 400);
  return scholarships;
}

export async function getScholarshipById(id) {
  await mockApiCall(null, 300);
  return scholarships.find((s) => s.id === id) || null;
}