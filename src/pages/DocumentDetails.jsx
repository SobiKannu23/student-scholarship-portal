import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { studentNavLinks } from "../config/studentNavLinks";
import { getDocumentById } from "../services/mockDocumentService";
import { getDocumentStatus, getDocumentDaysRemaining } from "../utils/documentStatus";
import { formatDisplayDate } from "../utils/dateHelpers";

export default function DocumentDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setNotFound(false);
    getDocumentById(user.id, id).then((data) => {
      if (!data) {
        setNotFound(true);
      } else {
        setDocument(data);
      }
      setLoading(false);
    });
  }, [user, id]);

  if (loading) {
    return (
      <Layout links={studentNavLinks}>
        <p className="text-sm text-gray-500">Loading document details...</p>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout links={studentNavLinks}>
        <Card>
          <p className="text-sm text-gray-600 mb-3">This document could not be found.</p>
          <Link to="/student/documents">
            <Button variant="secondary">Back to Document Tracker</Button>
          </Link>
        </Card>
      </Layout>
    );
  }

  const status = getDocumentStatus(document.expiryDate);
  const daysRemaining = getDocumentDaysRemaining(document.expiryDate);

  return (
    <Layout links={studentNavLinks}>
      <Link to="/student/documents" className="text-sm text-blue-800 font-medium">
        &larr; Back to Document Tracker
      </Link>

      <Card className="mt-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-800">{document.name}</h1>
            <p className="text-sm text-gray-500">{document.type}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        <p className="text-sm text-gray-600 mb-4">{document.description}</p>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
          <p><span className="font-medium text-gray-700">Document Number:</span> {document.documentNumber}</p>
          <p><span className="font-medium text-gray-700">Issuing Authority:</span> {document.issuingAuthority}</p>
        </div>

        {document.fileData && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Uploaded File</p>
                        {document.fileType === "application/pdf" ? (
              <a
                href={document.fileData}
                download={document.fileName}
                className="inline-block text-sm text-blue-800 font-medium underline"
              >
                Download {document.fileName}
              </a>
            ) : (
              <a href={document.fileData} download={document.fileName} target="_blank" rel="noreferrer">
                <img
                  src={document.fileData}
                  alt={document.fileName}
                  className="max-w-xs rounded-md border border-gray-200"
                />
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
          <p>Issue Date: <span className="font-medium text-gray-800">{formatDisplayDate(document.issueDate)}</span></p>
          <p>Expiry Date: <span className="font-medium text-gray-800">{formatDisplayDate(document.expiryDate)}</span></p>
          {status === "Expired" && (
            <p className="sm:col-span-2 text-red-600 font-medium">
              This document expired {Math.abs(daysRemaining)} day(s) ago. Please renew it as soon as possible.
            </p>
          )}
          {status === "Expiring Soon" && (
            <p className="sm:col-span-2 text-amber-600 font-medium">
              {daysRemaining === 0 ? "This document expires today." : `This document expires in ${daysRemaining} day(s).`} Consider renewing it soon.
            </p>
          )}
          {status === "Valid" && (
            <p className="sm:col-span-2 text-green-600 font-medium">
              This document is valid and does not require renewal at this time.
            </p>
          )}
        </div>
      </Card>
    </Layout>
  );
}