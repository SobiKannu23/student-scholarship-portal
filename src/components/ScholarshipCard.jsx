import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";
import StatusBadge from "./StatusBadge";
import { getScholarshipStatus, getDaysRemaining } from "../utils/scholarshipStatus";
import { formatDisplayDate } from "../utils/dateHelpers";

export default function ScholarshipCard({ scholarship }) {
  const status = getScholarshipStatus(scholarship.openDate, scholarship.closeDate);
  const daysRemaining = getDaysRemaining(scholarship.closeDate);

  return (
    <Card>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{scholarship.title}</h3>
          <p className="text-xs text-gray-500">{scholarship.provider}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <p className="text-xs text-gray-500 mb-3">{scholarship.category} · {scholarship.amount}</p>

      <div className="text-xs text-gray-500 mb-4 space-y-0.5">
        <p>Opens: {formatDisplayDate(scholarship.openDate)}</p>
        <p>Closes: {formatDisplayDate(scholarship.closeDate)}</p>
        {status === "Open" && daysRemaining >= 0 && (
          <p className="text-amber-600 font-medium">
            {daysRemaining === 0 ? "Closes today" : `${daysRemaining} day(s) remaining`}
          </p>
        )}
      </div>

      <Link to={`/student/calendar/${scholarship.id}`}>
        <Button variant="secondary" className="w-full">View Details</Button>
      </Link>
    </Card>
  );
}