import Card from "./Card";
import StatusBadge from "./StatusBadge";
import { formatDisplayDate } from "../utils/dateHelpers";

export default function AwardDetailsCard({ award }) {
  return (
    <Card title="Award Details">
      <div className="flex items-center gap-3 mb-3">
        <StatusBadge status={award.awardStatus} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
        <p><span className="font-medium text-gray-700">Scholarship Amount:</span> {award.scholarshipAmount}</p>
        <p><span className="font-medium text-gray-700">Approval Date:</span> {formatDisplayDate(award.approvalDate)}</p>
        <p><span className="font-medium text-gray-700">Disbursement Mode:</span> {award.disbursementMode}</p>
      </div>

      {award.remarks && (
        <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3 mt-3">
          {award.remarks}
        </p>
      )}
    </Card>
  );
}