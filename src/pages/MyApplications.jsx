import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { studentNavLinks } from "../config/studentNavLinks";
import { getApplicationsByStudent } from "../services/mockApplicationService";
import { getScholarshipById } from "../services/mockScholarshipService";
import { formatDisplayDate } from "../utils/dateHelpers";

export default function MyApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getApplicationsByStudent(user.id).then(async (apps) => {
      const enriched = await Promise.all(
        apps.map(async (app) => {
          const scholarship = await getScholarshipById(app.scholarshipId);
          return { ...app, scholarshipTitle: scholarship?.title || "Unknown Scholarship" };
        })
      );
      setApplications(enriched);
      setLoading(false);
    });
  }, [user]);

  return (
    <Layout links={studentNavLinks}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">My Applications</h1>
        <p className="text-sm text-gray-500">
          Track the review journey of every scholarship you have applied for.
        </p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading applications...</p>
      ) : applications.length === 0 ? (
        <Card>
          <p className="text-sm text-gray-600 mb-3">You have not applied for any scholarships yet.</p>
            <Link to="/student/scholarships">
            <Button variant="secondary">Browse Scholarships</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-semibold text-gray-800">{app.scholarshipTitle}</h3>
                <StatusBadge status={app.status} />
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Submitted: {formatDisplayDate(app.submittedDate)}
              </p>
              <Link to={`/student/applications/${app.id}`}>
                <Button variant="secondary" className="w-full">View Journey</Button>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
}