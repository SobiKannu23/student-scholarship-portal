import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../context/AuthContext";
import { officerProfiles } from "../data/officerProfile";
import { getApplicationCounts, getRecentApplications } from "../services/mockOfficerApplicationService";
import { formatDisplayDate } from "../utils/dateHelpers";
import { officerNavLinks } from "../config/officerNavLinks";

const links = [{ label: "CRM Dashboard", path: "/officer/dashboard" }];

export default function OfficerDashboard() {
  const { user } = useAuth();
  const profile = officerProfiles[user?.id];

  const [counts, setCounts] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getApplicationCounts(), getRecentApplications(5)]).then(
      ([countsData, recentData]) => {
        setCounts(countsData);
        setRecentApplications(recentData);
        setLoading(false);
      }
    );
  }, []);

  const statCards = [
    { label: "Total Applications", value: counts?.total, color: "text-blue-800" },
    { label: "Pending", value: counts?.pending, color: "text-amber-600" },
    { label: "Approved", value: counts?.approved, color: "text-green-600" },
    { label: "Rejected", value: counts?.rejected, color: "text-red-600" },
  ];

  return (
      <Layout links={officerNavLinks}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Welcome, {user?.name}</h1>
        <p className="text-sm text-gray-500">{profile?.designation} — {profile?.department}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((s) => (
          <Card key={s.label} title={s.label}>
            <p className={`text-3xl font-bold ${s.color}`}>{loading ? "-" : s.value}</p>
          </Card>
        ))}
      </div>

            <Card
        title="Recent Applications"
        subtitle="Latest submissions across all students"
        footer={
          <Link to="/officer/applications">
            <Button variant="secondary">View All Applications</Button>
          </Link>
        }
      >
        {loading ? (
          <p className="text-sm text-gray-500">Loading recent applications...</p>
        ) : recentApplications.length === 0 ? (
          <p className="text-sm text-gray-500">No applications have been submitted yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500">
                  <th className="py-2 pr-4 font-medium">Student</th>
                  <th className="py-2 pr-4 font-medium">Scholarship</th>
                  <th className="py-2 pr-4 font-medium">Submitted</th>
                  <th className="py-2 pr-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="border-b border-gray-100 last:border-b-0">
                    <td className="py-2 pr-4 text-gray-700">{app.studentName}</td>
                    <td className="py-2 pr-4 text-gray-700">{app.scholarshipTitle}</td>
                    <td className="py-2 pr-4 text-gray-500">{formatDisplayDate(app.submittedDate)}</td>
                    <td className="py-2 pr-4">
                      <StatusBadge status={app.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </Layout>
  );
}