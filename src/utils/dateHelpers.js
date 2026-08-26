function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

// Normalizes any date input to a "YYYY-MM-DD" string — used as a lookup key
// so events can be matched to calendar grid cells regardless of time-of-day.
export function toDateKey(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function isSameDay(a, b) {
  return toDateKey(a) === toDateKey(b);
}

export function formatDisplayDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getMonthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

// Returns a 6x7 grid of Date objects covering the full month, padded with
// trailing days from the previous/next month so every week row has 7 cells.
export function getMonthMatrix(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  const gridStart = new Date(year, month, 1 - startDayOfWeek);

  const weeks = [];
  const cursor = new Date(gridStart);

  for (let w = 0; w < 6; w += 1) {
    const week = [];
    for (let d = 0; d < 7; d += 1) {
      week.push(new Date(cursor));
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}