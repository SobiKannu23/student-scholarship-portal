import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { officerNavLinks } from "../config/officerNavLinks";
import {
  getApplicationDetailsById,
  submitReview,
} from "../services/mockOfficerApplicationService";
import { getScholarshipById } from "../services/mockScholarshipService";
import { formatDisplayDate } from "../utils/dateHelpers";

export default function OfficerApplicationDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [application, setApplication] = useState(null);
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");
  const [pendingDecision, setPendingDecision] = useState(null); // "Approved" | "Rejected" | null
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    getApplicationDetailsById(id).then(async (appData) => {
      if (!appData) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const scholarshipData = await getScholarshipById(appData.scholarshipId);
      setApplication(appData);
      setScholarship(scholarshipData);
      setComment(appData.reviewComment || "");
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Layout links={officerNavLinks}>
        <p className="text-sm text-gray-500">Loading application details...</p>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout links={officerNavLinks}>
        <Card>
          <p className="text-sm text-gray-600 mb-3">This application could not be found.</p>
          <Link to="/officer/applications">
            <Button variant="secondary">Back to Applications</Button>
          </Link>
        </Card>
      </Layout>
    );
  }

  const isPending = application.status === "Pending";

  const handleChooseDecision = (decision) => {
    if (comment.trim() === "") {
      setCommentError("Please add a review comment before making a decision.");
      return;
    }
    setCommentError("");
    setPendingDecision(decision);
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const updated = await submitReview(application.id, pendingDecision, comment.trim(), user?.name);
      setApplication(updated);
      setPendingDecision(null);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout links={officerNavLinks}>
      <Link to="/officer/applications" className="text-sm text-blue-800 font-medium">
        &larr; Back to Applications
      </Link>

      <Card className="mt-4 mb-4" title="Application Details">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{application.scholarshipTitle}</h2>
            <p className="text-sm text-gray-500">Application ID: {application.id}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <p><span className="font-medium text-gray-700">Student Name:</span> {application.studentName}</p>
          <p><span className="font-medium text-gray-700">Student ID:</span> {application.studentId || "-"}</p>
          <p><span className="font-medium text-gray-700">Category:</span> {application.category}</p>
          <p><span className="font-medium text-gray-700">Submitted Date:</span> {formatDisplayDate(application.submittedDate)}</p>
          <p><span className="font-medium text-gray-700">Scholarship Amount:</span> {scholarship?.amount || "-"}</p>
        </div>
      </Card>

      <Card className="mb-4" title="Documents Submitted">
        <ul className="divide-y divide-gray-100">
          {application.documentsSubmitted.map((doc) => (
            <li key={doc.name} className="flex items-center justify-between py-2 text-sm">
              <span className="text-gray-700">{doc.name}</span>
              <StatusBadge status={doc.status} />
            </li>
          ))}
        </ul>
      </Card>

      {isPending ? (
        <Card title="Review and Decision">
          <label className="block text-sm font-medium text-gray-700 mb-1">Review Comment</label>
          <textarea
            rows={4}
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              if (e.target.value.trim() !== "") setCommentError("");
            }}
            placeholder="Enter your remarks on eligibility, documents, or any observations..."
            className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
              commentError ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-700"
            }`}
          />
          {commentError && <p className="text-xs text-red-600 mt-1">{commentError}</p>}

          {pendingDecision === null ? (
            <div className="flex gap-3 mt-4">
              <Button onClick={() => handleChooseDecision("Approved")}>Approve</Button>
              <Button variant="danger" onClick={() => handleChooseDecision("Rejected")}>Reject</Button>
            </div>
          ) : (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
              <p className="text-sm text-amber-700 font-medium mb-3">
                Confirm: {pendingDecision} this application? This decision will be recorded and cannot be undone here.
              </p>
              <div className="flex gap-3">
                <Button onClick={handleConfirm} disabled={submitting}>
                  {submitting ? "Submitting..." : `Confirm ${pendingDecision}`}
                </Button>
                <Button variant="secondary" onClick={() => setPendingDecision(null)} disabled={submitting}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      ) : (
        <Card title="Review Decision">
          <div className="flex items-center gap-3 mb-3">
            <StatusBadge status={application.status} />
            <span className="text-sm text-gray-600">
              Reviewed by {application.reviewedBy} on {formatDisplayDate(application.reviewedDate)}
            </span>
          </div>
          <p className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
            {application.reviewComment}
          </p>
        </Card>
      )}
    </Layout>
  );
}