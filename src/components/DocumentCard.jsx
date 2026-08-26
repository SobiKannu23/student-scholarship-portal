import { Link } from "react-router-dom";
import Card from "./Card";
import Button from "./Button";
import StatusBadge from "./StatusBadge";
import { useAuth } from "../context/AuthContext";
import { getDocumentStatus, getDocumentDaysRemaining } from "../utils/documentStatus";
import { formatDisplayDate } from "../utils/dateHelpers";
import { removeDocument } from "../services/mockDocumentService";

export default function DocumentCard({ document, onRemoved }) {
  const { user } = useAuth();
  const status = getDocumentStatus(document.expiryDate);
  const daysRemaining = getDocumentDaysRemaining(document.expiryDate);

  const handleRemove = async () => {
    if (!window.confirm(`Remove "${document.name}"? This cannot be undone.`)) return;
    const updated = await removeDocument(user.id, document.id);
    if (onRemoved) onRemoved(updated);
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">{document.name}</h3>
          <p className="text-xs text-gray-500">{document.type}</p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="text-xs text-gray-500 mb-4 space-y-0.5">
        <p>Issued: {formatDisplayDate(document.issueDate)}</p>
        <p>Expires: {formatDisplayDate(document.expiryDate)}</p>
        {status === "Expired" && (
          <p className="text-red-600 font-medium">Expired {Math.abs(daysRemaining)} day(s) ago</p>
        )}
        {status === "Expiring Soon" && (
          <p className="text-amber-600 font-medium">
            {daysRemaining === 0 ? "Expires today" : `Expires in ${daysRemaining} day(s)`}
          </p>
        )}
        {document.fileName && <p className="truncate">File: {document.fileName}</p>}
      </div>

      <div className="flex gap-2">
        <Link to={`/student/documents/${document.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">View Details</Button>
        </Link>
        {onRemoved && (
          <Button variant="danger" onClick={handleRemove}>Remove</Button>
        )}
      </div>
    </Card>
  );
}