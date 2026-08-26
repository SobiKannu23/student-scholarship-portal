import { applicationJourneys, awardDetails } from "../data/applicationJourneyData";
import { mockApiCall } from "./mockApiClient";
// Builds the timeline for a given application. Seeded applications return
// their full mock review history and award info. Any other application
// (freshly submitted via Module 5) returns a timeline with only the
// "Submitted" stage completed and the rest pending, since no officer
// review workflow exists yet — that belongs to a future module.
export async function getApplicationJourney(application) {
  await mockApiCall(null, 300);

  const seededJourney = applicationJourneys[application.id];
  if (seededJourney) {
    return {
      stages: seededJourney.stages,
      award: awardDetails[application.id] || null,
    };
  }

  return {
    stages: [
      {
        name: "Submitted",
        status: "Completed",
        date: application.submittedDate,
        comment: "Your application has been received and is queued for verification.",
      },
      { name: "Document Verification", status: "Pending", date: null, comment: null },
      { name: "Officer Review", status: "Pending", date: null, comment: null },
      { name: "Approved / Rejected", status: "Pending", date: null, comment: null },
    ],
    award: null,
  };
}