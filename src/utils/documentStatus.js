// Mirrors the pattern used in scholarshipStatus.js — status is always derived
// from today's date vs expiryDate, never stored, so it's always accurate.
export function getDocumentStatus(expiryDate, referenceDate = new Date()) {
  const daysRemaining = getDocumentDaysRemaining(expiryDate, referenceDate);
  if (daysRemaining < 0) return "Expired";
  if (daysRemaining <= 30) return "Expiring Soon";
  return "Valid";
}

export function getDocumentDaysRemaining(expiryDate, referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  return Math.round((expiry - ref) / (1000 * 60 * 60 * 24));
}