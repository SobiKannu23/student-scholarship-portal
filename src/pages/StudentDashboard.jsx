import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useAuth } from "../context/AuthContext";
import { useStudentProfile } from "../hooks/useStudentProfile";
import { studentDashboardData } from "../data/studentProfile";
import { studentNavLinks } from "../config/studentNavLinks";
import { getAllScholarships } from "../services/mockScholarshipService";
import { getScholarshipStatus } from "../utils/scholarshipStatus";
import { getStudentDocuments } from "../services/mockDocumentService";
import { getDocumentStatus } from "../utils/documentStatus";

export default function StudentDashboard() {
  const { user } = useAuth();
  const { profile, loading, completion } = useStudentProfile();
  const dashboardExtras = studentDashboardData[user?.id];

  const [scholarshipCounts, setScholarshipCounts] = useState(null);
  const [documentCounts, setDocumentCounts] = useState(null);
  // Loads the calendar summary independently of the profile, so a slow profile
  // fetch never blocks the calendar widget (and vice versa).
  useEffect(() => {
    let isMounted = true;
    getAllScholarships().then((all) => {
      if (!isMounted) return;
      const counts = { Open: 0, Upcoming: 0 };
      all.forEach((s) => {
        const status = getScholarshipStatus(s.openDate, s.closeDate);
        if (status === "Open") counts.Open += 1;
        if (status === "Upcoming") counts.Upcoming += 1;
      });
      setScholarshipCounts(counts);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
  if (!user) return;
  let isMounted = true;
  getStudentDocuments(user.id).then((docs) => {
    if (!isMounted) return;
    const counts = { "Expiring Soon": 0, Expired: 0 };
    docs.forEach((doc) => {
      const status = getDocumentStatus(doc.expiryDate);
      if (status === "Expiring Soon") counts["Expiring Soon"] += 1;
      if (status === "Expired") counts.Expired += 1;
    });
    setDocumentCounts(counts);
  });
  return () => {
    isMounted = false;
  };
}, [user]);

  const academic = profile?.academic;
  const location = profile?.location;
  const category = profile?.category;
  const family = profile?.family;

  return (
    <Layout links={studentNavLinks}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Welcome, {user?.name}</h1>
        <p className="text-sm text-gray-500">Here is a summary of your scholarship activity.</p>
      </div>

      <Card className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1">
            <ProgressBar percentage={loading ? 0 : completion} label="Profile Completion" />
          </div>
          <Link to="/student/profile">
            <Button variant="secondary">
              {completion < 100 ? "Complete Profile" : "View Profile"}
            </Button>
          </Link>
        </div>
      </Card>

      <Card title="Profile Summary" className="mb-6">
        {loading ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : academic?.college ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
            <p><span className="font-medium text-gray-700">College:</span> {academic.college}</p>
            <p><span className="font-medium text-gray-700">Course:</span> {academic.course}</p>
            <p><span className="font-medium text-gray-700">Year:</span> {academic.yearOfStudy}</p>
            <p><span className="font-medium text-gray-700">District:</span> {location?.district}</p>
            <p><span className="font-medium text-gray-700">Community:</span> {category?.community}</p>
            <p>
              <span className="font-medium text-gray-700">Annual Income:</span>{" "}
              {family?.annualIncome ? `₹${Number(family.annualIncome).toLocaleString("en-IN")}` : "-"}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Your profile is not yet complete.{" "}
            <Link to="/student/profile/edit" className="text-blue-800 font-medium">
              Add your details
            </Link>{" "}
            to get started.
          </p>
        )}
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               <Card title="My Scholarships" subtitle="Browse and track">
  {dashboardExtras ? (
    <div className="text-sm text-gray-600 space-y-1 mb-3">
      <p>Applied: {dashboardExtras.scholarshipsSummary.totalApplied}</p>
      <p>Approved: {dashboardExtras.scholarshipsSummary.approved}</p>
      <p>Pending: {dashboardExtras.scholarshipsSummary.pending}</p>
    </div>
  ) : (
    <p className="text-sm text-gray-400 mb-3">No scholarships applied yet.</p>
  )}
  <div className="flex gap-2">
    <Link to="/student/scholarships" className="flex-1">
      <Button className="w-full">Apply Now</Button>
    </Link>
    <Link to="/student/applications" className="flex-1">
      <Button variant="secondary" className="w-full">My Applications</Button>
    </Link>
  </div>
</Card>

        <Card title="Opportunity Calendar" subtitle="Deadlines and openings">
          {scholarshipCounts ? (
            <div className="text-sm text-gray-600 space-y-1 mb-3">
              <p>Currently Open: <span className="font-medium text-green-700">{scholarshipCounts.Open}</span></p>
              <p>Upcoming: <span className="font-medium text-blue-700">{scholarshipCounts.Upcoming}</span></p>
            </div>
          ) : (
            <p className="text-sm text-gray-400 mb-3">Loading calendar...</p>
          )}
          <Link to="/student/calendar">
            <Button variant="secondary" className="w-full">View Calendar</Button>
          </Link>
        </Card>

        <Card title="Document Tracker" subtitle="Verification status">
          {dashboardExtras ? (
            <ul className="text-sm text-gray-600 space-y-1">
              {dashboardExtras.documentTracker.slice(0, 3).map((doc) => (
                <li key={doc.name} className="flex justify-between">
                  <span>{doc.name}</span>
                  <span className={doc.status === "Verified" ? "text-green-600" : "text-amber-600"}>
                    {doc.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No documents uploaded yet.</p>
          )}
        </Card>

        <Card title="Application Journey" subtitle="Current stage">
          {dashboardExtras ? (
            <p className="text-sm text-gray-600">
              {dashboardExtras.applicationJourney.find((s) => !s.completed)?.stage || "Completed"}
            </p>
          ) : (
            <p className="text-sm text-gray-400">Start your first application to see progress here.</p>
          )}
        </Card>
      </div>
    </Layout>
  );
}