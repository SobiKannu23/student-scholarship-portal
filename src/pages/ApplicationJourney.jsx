import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import JourneyTimeline from "../components/JourneyTimeline";
import AwardDetailsCard from "../components/AwardDetailsCard";
import { useAuth } from "../context/AuthContext";
import { studentNavLinks } from "../config/studentNavLinks";
import { getApplicationById } from "../services/mockApplicationService";
import { getScholarshipById } from "../services/mockScholarshipService";
import { getApplicationJourney } from "../services/mockApplicationJourneyService";
import { formatDisplayDate } from "../utils/dateHelpers";

export default function ApplicationJourney() {
  const { id } = useParams();
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [scholarship, setScholarship] = useState(null);
  const [journey, setJourney] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setNotFound(false);

    getApplicationById(user.id, id).then(async (applicationData) => {
      if (!applicationData) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      const [scholarshipData, journeyData] = await Promise.all([
        getScholarshipById(applicationData.scholarshipId),
        getApplicationJourney(applicationData),
      ]);
      setApplication(applicationData);
      setScholarship(scholarshipData);
      setJourney(journeyData);
      setLoading(false);
    });
  }, [user, id]);

  if (loading) {
    return (
      <Layout links={studentNavLinks}>
        <p className="text-sm text-gray-500">Loading application journey...</p>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout links={studentNavLinks}>
        <Card>
          <p className="text-sm text-gray-600 mb-3">This application could not be found.</p>
          <Link to="/student/applications">
            <Button variant="secondary">Back to My Applications</Button>
          </Link>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout links={studentNavLinks}>
      <Link to="/student/applications" className="text-sm text-blue-800 font-medium">
        &larr; Back to My Applications
      </Link>

      <Card className="mt-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-800">{scholarship?.title}</h1>
            <p className="text-sm text-gray-500">{scholarship?.provider}</p>
          </div>
          <StatusBadge status={application.status} />
        </div>
        <p className="text-sm text-gray-600">
          Application ID: <span className="font-medium">{application.id}</span> · Submitted on{" "}
          {formatDisplayDate(application.submittedDate)}
        </p>
      </Card>

      <Card title="Application Journey" className="mb-4">
        <JourneyTimeline stages={journey.stages} />
      </Card>

      {journey.award && application.status === "Approved" && (
        <AwardDetailsCard award={journey.award} />
      )}
    </Layout>
  );
}