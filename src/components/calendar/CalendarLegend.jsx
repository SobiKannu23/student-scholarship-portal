export default function CalendarLegend() {
  return (
    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-green-600 inline-block"></span>
        Opening Date
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span>
        Closing Date
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-700 inline-block"></span>
        Today
      </span>
    </div>
  );
}