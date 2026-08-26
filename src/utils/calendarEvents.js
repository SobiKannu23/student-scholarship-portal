import { toDateKey } from "./dateHelpers";

// Converts a flat scholarship list into a { "YYYY-MM-DD": [event, ...] } map
// so the calendar grid can look up "what happens on this day" in O(1).
export function buildEventsMap(scholarships) {
  const map = {};

  scholarships.forEach((s) => {
    const openKey = toDateKey(s.openDate);
    if (!map[openKey]) map[openKey] = [];
    map[openKey].push({ id: s.id, title: s.title, type: "open" });

    const closeKey = toDateKey(s.closeDate);
    if (!map[closeKey]) map[closeKey] = [];
    map[closeKey].push({ id: s.id, title: s.title, type: "close" });
  });

  return map;
}