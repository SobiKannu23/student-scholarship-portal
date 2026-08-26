import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import ScholarshipCard from "../components/ScholarshipCard";
import CalendarGrid from "../components/calendar/CalendarGrid";
import CalendarLegend from "../components/calendar/CalendarLegend";
import { studentNavLinks } from "../config/studentNavLinks";
import { getAllScholarships } from "../services/mockScholarshipService";
import { getScholarshipStatus } from "../utils/scholarshipStatus";
import { getMonthLabel } from "../utils/dateHelpers";
import { buildEventsMap } from "../utils/calendarEvents";

const STATUS_FILTERS = ["All", "Open", "Upcoming", "Closed"];

export default function ScholarshipCalendar() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("calendar"); // "calendar" | "list"
  const [statusFilter, setStatusFilter] = useState("All");
  const [cursorDate, setCursorDate] = useState(new Date());

  useEffect(() => {
    getAllScholarships().then((data) => {
      setScholarships(data);
      setLoading(false);
    });
  }, []);

  const eventsMap = useMemo(() => buildEventsMap(scholarships), [scholarships]);

  const filteredScholarships = useMemo(() => {
    return scholarships
      .filter((s) => {
        if (statusFilter === "All") return true;
        return getScholarshipStatus(s.openDate, s.closeDate) === statusFilter;
      })
      .sort((a, b) => new Date(a.openDate) - new Date(b.openDate));
  }, [scholarships, statusFilter]);

  const year = cursorDate.getFullYear();
  const month = cursorDate.getMonth();

  const goToPrevMonth = () => setCursorDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCursorDate(new Date(year, month + 1, 1));
  const goToToday = () => setCursorDate(new Date());

  return (
    <Layout links={studentNavLinks}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Scholarship Opportunity Calendar</h1>
          <p className="text-sm text-gray-500">
            Track opening dates, closing dates, and important deadlines for available scholarships.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "calendar" ? "primary" : "secondary"}
            onClick={() => setViewMode("calendar")}
          >
            Calendar View
          </Button>
          <Button
            variant={viewMode === "list" ? "primary" : "secondary"}
            onClick={() => setViewMode("list")}
          >
            List View
          </Button>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading scholarship calendar...</p>
      ) : viewMode === "calendar" ? (
        <>
          <Card className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={goToPrevMonth}>Prev</Button>
                <span className="text-sm font-semibold text-gray-800 w-36 text-center">
                  {getMonthLabel(year, month)}
                </span>
                <Button variant="secondary" onClick={goToNextMonth}>Next</Button>
                <Button variant="secondary" onClick={goToToday}>Today</Button>
              </div>
              <CalendarLegend />
            </div>
          </Card>

          <CalendarGrid year={year} month={month} eventsMap={eventsMap} />
        </>
      ) : (
        <>
          <Card className="mb-4">
            <div className="flex flex-wrap gap-2">
              {STATUS_FILTERS.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
                    statusFilter === status
                      ? "bg-blue-800 text-white border-blue-800"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </Card>

          {filteredScholarships.length === 0 ? (
            <p className="text-sm text-gray-500">No scholarships match this filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredScholarships.map((s) => (
                <ScholarshipCard key={s.id} scholarship={s} />
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}