import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import { studentNavLinks } from "../config/studentNavLinks";
import { getScholarshipById } from "../services/mockScholarshipService";
import { getScholarshipStatus, getDaysRemaining } from "../utils/scholarshipStatus";
import { formatDisplayDate } from "../utils/dateHelpers";

export default function ScholarshipDetails() {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    getScholarshipById(id).then((data) => {
      if (!data) {
        setNotFound(true);
      } else {
        setScholarship(data);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Layout links={studentNavLinks}>
        <p className="text-sm text-gray-500">Loading scholarship details...</p>
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

  const status = getScholarshipStatus(scholarship.openDate, scholarship.closeDate);
  const daysRemaining = getDaysRemaining(scholarship.closeDate);
  const sortedDates = [...scholarship.importantDates].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <Layout links={studentNavLinks}>
      <Link to="/student/calendar" className="text-sm text-blue-800 font-medium">
        &larr; Back to Calendar
      </Link>

      <Card className="mt-4 mb-4">
        
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
          <div>
            <h1 className="text-lg font-bold text-gray-800">{scholarship.title}</h1>
            <p className="text-sm text-gray-500">{scholarship.provider}</p>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
          <p><span className="font-medium text-gray-700">Category:</span> {scholarship.category}</p>
          <p><span className="font-medium text-gray-700">Amount:</span> {scholarship.amount}</p>
          <p><span className="font-medium text-gray-700">Mode:</span> {scholarship.applicationMode}</p>
        </div>

        <p className="text-sm text-gray-600 mb-4">{scholarship.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
          <p>Opens: <span className="font-medium text-gray-800">{formatDisplayDate(scholarship.openDate)}</span></p>
          <p>Closes: <span className="font-medium text-gray-800">{formatDisplayDate(scholarship.closeDate)}</span></p>
          {status === "Open" && daysRemaining >= 0 && (
            <p className="sm:col-span-2 text-amber-600 font-medium">
              {daysRemaining === 0 ? "Closes today" : `${daysRemaining} day(s) remaining to apply`}
            </p>
          )}
        </div>
         {status === "Open" && (
          <Link to={`/student/apply/${scholarship.id}`}>
            <Button className="w-full sm:w-auto mt-4">Apply Now</Button>
          </Link>
        )}
      </Card>

      <Card title="Important Dates" className="mb-4">
        <ol className="space-y-3">
          {sortedDates.map((item) => (
            <li key={item.label} className="flex items-center justify-between text-sm border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
              <span className="text-gray-600">{item.label}</span>
              <span className="font-medium text-gray-800">{formatDisplayDate(item.date)}</span>
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Eligibility Criteria" className="mb-4">
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {scholarship.eligibility.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Card>

      <Card title="Documents Typically Required">
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {scholarship.documentsRequired.map((doc) => (
            <li key={doc}>{doc}</li>
          ))}
        </ul>
      </Card>
    </Layout>
    
  );
}