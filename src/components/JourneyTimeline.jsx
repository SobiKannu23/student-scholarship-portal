import { formatDisplayDate } from "../utils/dateHelpers";

const dotStyles = {
  Completed: "bg-green-600",
  "In Progress": "bg-amber-500",
  Pending: "bg-gray-300",
};

const textStyles = {
  Completed: "text-green-700",
  "In Progress": "text-amber-600",
  Pending: "text-gray-400",
};

export default function JourneyTimeline({ stages }) {
  return (
    <ol className="relative border-l-2 border-gray-200 ml-2">
      {stages.map((stage, index) => (
        <li
          key={stage.name}
          className={`relative ml-5 ${index !== stages.length - 1 ? "pb-6" : ""}`}
        >
          <span
            className={`absolute -left-[25px] top-0.5 w-4 h-4 rounded-full border-2 border-white ${
              dotStyles[stage.status] || "bg-gray-300"
            }`}
          ></span>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h3 className="text-sm font-semibold text-gray-800">{stage.name}</h3>
            <span className={`text-xs font-medium ${textStyles[stage.status] || "text-gray-400"}`}>
              {stage.status}
            </span>
          </div>

          {stage.date && (
            <p className="text-xs text-gray-500 mt-0.5">{formatDisplayDate(stage.date)}</p>
          )}

          <p className="text-sm text-gray-600 mt-1">{stage.comment || "Awaiting update."}</p>
        </li>
      ))}
    </ol>
  );
}