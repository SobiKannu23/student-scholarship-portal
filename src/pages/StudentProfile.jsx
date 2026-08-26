import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import { useStudentProfile } from "../hooks/useStudentProfile";
import { sectionsConfig } from "../data/profileSectionsConfig";
import { studentNavLinks } from "../config/studentNavLinks";

export default function StudentProfile() {
  const { profile, loading, completion } = useStudentProfile();

  if (loading || !profile) {
    return (
      <Layout links={studentNavLinks}>
        <p className="text-sm text-gray-500">Loading profile...</p>
      </Layout>
    );
  }

  return (
    <Layout links={studentNavLinks}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">My Profile</h1>
          <p className="text-sm text-gray-500">Review your saved details across all sections.</p>
        </div>
        <Link to="/student/profile/edit">
          <Button>Edit Profile</Button>
        </Link>
      </div>

      <Card className="mb-6">
        <ProgressBar percentage={completion} label="Profile Completion" />
      </Card>

      {sectionsConfig.map((section) => {
        const data = profile[section.key] || {};
        const visibleFields = section.fields.filter((field) => {
          if (section.key === "disability" && field.name !== "hasDisability") {
            return data.hasDisability === "Yes";
          }
          return true;
        });

        return (
          <Card key={section.key} title={section.label} className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {visibleFields.map((field) => (
                <div key={field.name}>
                  <p className="text-gray-500">{field.label}</p>
                  <p className="text-gray-800 font-medium">{data[field.name] || "-"}</p>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </Layout>
  );
}