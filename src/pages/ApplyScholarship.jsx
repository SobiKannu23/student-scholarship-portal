import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import StepIndicator from "../components/StepIndicator";
import { useAuth } from "../context/AuthContext";
import { useStudentProfile } from "../hooks/useStudentProfile";
import { studentNavLinks } from "../config/studentNavLinks";
import { getScholarshipById } from "../services/mockScholarshipService";
import { getStudentDocuments } from "../services/mockDocumentService";
import {
  getApplicationByScholarship,
  submitApplication,
} from "../services/mockApplicationService";
import { getScholarshipStatus } from "../utils/scholarshipStatus";
import { getDocumentStatus } from "../utils/documentStatus";
import { formatDisplayDate } from "../utils/dateHelpers";

const STEP_LABELS = ["Confirm Details", "Documents & Submit"];

export default function ApplyScholarship() {
  const { id } = useParams();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useStudentProfile();
  const navigate = useNavigate();

  const [scholarship, setScholarship] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [existingApplication, setExistingApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedApplication, setSubmittedApplication] = useState(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setNotFound(false);

    Promise.all([
      getScholarshipById(id),
      getStudentDocuments(user.id),
      getApplicationByScholarship(user.id, id),
    ]).then(([scholarshipData, documentsData, applicationData]) => {
      if (!scholarshipData) {
        setNotFound(true);
      } else {
        setScholarship(scholarshipData);
        setDocuments(documentsData);
        setExistingApplication(applicationData);
      }
      setLoading(false);
    });
  }, [id, user]);

  if (loading || profileLoading) {
    return (
      <Layout links={studentNavLinks}>
        <p className="text-sm text-gray-500">Loading application form...</p>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout links={studentNavLinks}>
        <Card>
          <p className="text-sm text-gray-600 mb-3">This scholarship could not be found.</p>
          <Link to="/student/calendar">
            <Button variant="secondary">Back to Calendar</Button>
          </Link>
        </Card>
      </Layout>
    );
  }

  // Already submitted before this page loaded — show status, no form
  if (existingApplication && !submittedApplication) {
    return (
      <Layout links={studentNavLinks}>
        <Card title="Application Already Submitted">
          <div className="flex items-center gap-3 mb-3">
            <StatusBadge status={existingApplication.status} />
            <span className="text-sm text-gray-600">
              Submitted on {formatDisplayDate(existingApplication.submittedDate)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            You have already applied for <span className="font-medium">{scholarship.title}</span>.
            Application ID: <span className="font-medium">{existingApplication.id}</span>
          </p>
          <Link to={`/student/calendar/${scholarship.id}`}>
            <Button variant="secondary">Back to Scholarship Details</Button>
          </Link>
        </Card>
      </Layout>
    );
  }

  const scholarshipStatus = getScholarshipStatus(scholarship.openDate, scholarship.closeDate);

  // Scholarship isn't open — block applying
  if (scholarshipStatus !== "Open" && !submittedApplication) {
    return (
      <Layout links={studentNavLinks}>
        <Card title="Applications Not Open">
          <div className="flex items-center gap-3 mb-3">
            <StatusBadge status={scholarshipStatus} />
          </div>
                    <p className="text-sm text-gray-600 mb-4">
            You have already applied for <span className="font-medium">{scholarship.title}</span>.
            Application ID: <span className="font-medium">{existingApplication.id}</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={`/student/applications/${existingApplication.id}`}>
              <Button>View Application Journey</Button>
            </Link>
            <Link to={`/student/calendar/${scholarship.id}`}>
              <Button variant="secondary">Back to Scholarship Details</Button>
            </Link>
          </div>
        </Card>
      </Layout>
    );
  }

  // Post-submission confirmation view
  if (submittedApplication) {
    return (
      <Layout links={studentNavLinks}>
        <Card title="Application Submitted Successfully">
          <div className="flex items-center gap-3 mb-3">
            <StatusBadge status={submittedApplication.status} />
            <span className="text-sm text-gray-600">
              Submitted on {formatDisplayDate(submittedApplication.submittedDate)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">
            Your application for <span className="font-medium">{scholarship.title}</span> has been recorded.
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Application ID: <span className="font-medium">{submittedApplication.id}</span>
          </p>
            <div className="flex flex-wrap gap-3">
            <Link to={`/student/applications/${submittedApplication.id}`}>
              <Button>View Application Journey</Button>
            </Link>
            <Link to="/student/dashboard">
              <Button variant="secondary">Go to Dashboard</Button>
            </Link>
            <Link to="/student/calendar">
              <Button variant="secondary">Back to Calendar</Button>
            </Link>
          </div>
        </Card>
      </Layout>
    );
  }

  // ---- Step 1 validation: core profile fields must be filled ----
  const missingFields = [];
  if (!profile?.personal?.fullName) missingFields.push("Full Name");
  if (!profile?.academic?.college) missingFields.push("College");
  if (!profile?.family?.annualIncome) missingFields.push("Annual Income");
  if (!profile?.category?.community) missingFields.push("Community");
  if (!profile?.location?.district) missingFields.push("District");
  const profileIncomplete = missingFields.length > 0;

  // ---- Step 2: match required documents against uploaded documents ----
  const documentChecklist = scholarship.documentsRequired.map((requiredName) => {
    const match = documents.find((doc) => doc.name === requiredName);
    const status = match ? getDocumentStatus(match.expiryDate) : "Not Uploaded";
    return { name: requiredName, status, expiryDate: match?.expiryDate || null };
  });
  const hasBlockingDocIssue = documentChecklist.some(
    (doc) => doc.status === "Not Uploaded" || doc.status === "Expired"
  );

    const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await submitApplication(user.id, scholarship.id, {
        studentName: user.name,
        scholarshipTitle: scholarship.title,
        category: scholarship.category,
        documentsSubmitted: documentChecklist.map((doc) => ({
          name: doc.name,
          status: doc.status === "Not Uploaded" ? "Not Uploaded" : "Uploaded",
        })),
      });
      setSubmittedApplication(result);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Layout links={studentNavLinks}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Apply for Scholarship</h1>
        <p className="text-sm text-gray-500">{scholarship.title}</p>
      </div>

      <StepIndicator steps={STEP_LABELS} currentStep={step} />

      {step === 1 && (
        <>
          <Card title="Scholarship Details" className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <p><span className="font-medium text-gray-700">Provider:</span> {scholarship.provider}</p>
              <p><span className="font-medium text-gray-700">Category:</span> {scholarship.category}</p>
              <p><span className="font-medium text-gray-700">Amount:</span> {scholarship.amount}</p>
              <p><span className="font-medium text-gray-700">Closes:</span> {formatDisplayDate(scholarship.closeDate)}</p>
            </div>
          </Card>

          <Card title="Your Details" className="mb-4">
            {profileIncomplete ? (
              <div className="bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-md p-3">
                <p className="font-medium mb-1">Please complete your profile before applying.</p>
                <p>Missing: {missingFields.join(", ")}</p>
                <Link to="/student/profile/edit" className="text-blue-800 font-medium underline mt-2 inline-block">
                  Complete Profile
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <p><span className="font-medium text-gray-700">Name:</span> {profile.personal.fullName}</p>
                <p><span className="font-medium text-gray-700">College:</span> {profile.academic.college}</p>
                <p><span className="font-medium text-gray-700">Community:</span> {profile.category.community}</p>
                <p><span className="font-medium text-gray-700">District:</span> {profile.location.district}</p>
                <p>
                  <span className="font-medium text-gray-700">Annual Income:</span>{" "}
                  ₹{Number(profile.family.annualIncome).toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </Card>

          <div className="flex justify-between">
            <Link to={`/student/calendar/${scholarship.id}`}>
              <Button variant="secondary">Cancel</Button>
            </Link>
            <Button onClick={() => setStep(2)} disabled={profileIncomplete}>
              Next: Documents
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <Card title="Required Documents" className="mb-4">
            <ul className="divide-y divide-gray-100">
              {documentChecklist.map((doc) => (
                <li key={doc.name} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-gray-700">{doc.name}</span>
                  <StatusBadge status={doc.status} />
                </li>
              ))}
            </ul>
            {hasBlockingDocIssue && (
              <div className="mt-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
                Resolve missing or expired documents in the{" "}
                <Link to="/student/documents" className="underline font-medium">Document Tracker</Link>{" "}
                before submitting this application.
              </div>
            )}
          </Card>

          <Card title="Review and Confirm" className="mb-4">
            <label className="flex items-start gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              I confirm that the details and documents shown above are accurate to the best of my knowledge.
            </label>
          </Card>

          <div className="flex justify-between">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button
              onClick={handleSubmit}
              disabled={!agreed || hasBlockingDocIssue || submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
}