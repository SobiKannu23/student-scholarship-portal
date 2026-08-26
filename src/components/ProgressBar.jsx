export default function ProgressBar({ percentage, label }) {
  const clamped = Math.min(100, Math.max(0, percentage));
  const color = clamped >= 80 ? "bg-green-600" : clamped >= 40 ? "bg-amber-500" : "bg-red-500";

  return (
    <div>
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-medium text-gray-700">{clamped}%</span>
        </div>
      )}
      <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${clamped}%` }}></div>
      </div>
    </div>
  );
}