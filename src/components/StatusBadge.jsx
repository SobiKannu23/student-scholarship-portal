const statusStyles = {
  Open: "bg-green-100 text-green-700",
  Upcoming: "bg-blue-100 text-blue-700",
  Closed: "bg-gray-200 text-gray-600",
    "Valid": "bg-green-100 text-green-700",
  "Expiring Soon": "bg-amber-100 text-amber-700",
  "Expired": "bg-gray-200 text-gray-600",
  "Not Uploaded": "bg-red-100 text-red-700",
  "Submitted": "bg-blue-100 text-blue-700",
  "Approved": "bg-green-100 text-green-700",
  "Rejected": "bg-red-100 text-red-700",
  "Awarded": "bg-green-100 text-green-700",
  "Pending": "bg-amber-100 text-amber-700",
  "Uploaded": "bg-green-100 text-green-700",
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || "bg-gray-200 text-gray-600";
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}