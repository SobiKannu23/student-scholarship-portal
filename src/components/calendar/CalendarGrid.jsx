import { Link } from "react-router-dom";
import { getMonthMatrix, toDateKey, isSameDay } from "../../utils/dateHelpers";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_VISIBLE_EVENTS = 2;

export default function CalendarGrid({ year, month, eventsMap }) {
  const weeks = getMonthMatrix(year, month);
  const today = new Date();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="p-2 text-center text-xs font-semibold text-gray-500">
            {label}
          </div>
        ))}
      </div>

      <div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 border-b border-gray-100 last:border-b-0">
            {week.map((day) => {
              const dateKey = toDateKey(day);
              const isCurrentMonth = day.getMonth() === month;
              const isToday = isSameDay(day, today);
              const events = eventsMap[dateKey] || [];
              const visibleEvents = events.slice(0, MAX_VISIBLE_EVENTS);
              const hiddenCount = events.length - visibleEvents.length;

              return (
                <div
                  key={dateKey}
                  className={`min-h-[92px] border-r border-gray-100 last:border-r-0 p-1.5 ${
                    isCurrentMonth ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                      isToday
                        ? "bg-blue-700 text-white font-semibold"
                        : isCurrentMonth
                        ? "text-gray-700"
                        : "text-gray-350"
                    }`}
                  >
                    {day.getDate()}
                  </span>

                  <div className="mt-1 space-y-1">
                    {visibleEvents.map((event, idx) => (
                      <Link
                        key={`${event.id}-${event.type}-${idx}`}
                        to={`/student/calendar/${event.id}`}
                        className={`block truncate text-[10px] leading-tight px-1 py-0.5 rounded ${
                          event.type === "open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                        title={event.title}
                      >
                        {event.title}
                      </Link>
                    ))}
                    {hiddenCount > 0 && (
                      <p className="text-[10px] text-gray-400">+{hiddenCount} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}