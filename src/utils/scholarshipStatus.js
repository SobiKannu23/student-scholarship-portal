// Status is always derived from today's date vs openDate/closeDate — never
// stored, so it's automatically correct no matter when the app is opened.
export function getScholarshipStatus(openDate, closeDate, referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);
  const open = new Date(openDate);
  open.setHours(0, 0, 0, 0);
  const close = new Date(closeDate);
  close.setHours(0, 0, 0, 0);

  if (ref < open) return "Upcoming";
  if (ref > close) return "Closed";
  return "Open";
}

export function getDaysRemaining(closeDate, referenceDate = new Date()) {
  const ref = new Date(referenceDate);
  ref.setHours(0, 0, 0, 0);
  const close = new Date(closeDate);
  close.setHours(0, 0, 0, 0);
  return Math.round((close - ref) / (1000 * 60 * 60 * 24));
}