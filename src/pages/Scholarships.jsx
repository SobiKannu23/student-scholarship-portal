import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import ScholarshipCard from "../components/ScholarshipCard";
import { studentNavLinks } from "../config/studentNavLinks";
import { getAllScholarships } from "../services/mockScholarshipService";
import { getScholarshipStatus } from "../utils/scholarshipStatus";

const STATUS_FILTERS = ["All", "Open", "Upcoming", "Closed"];

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    getAllScholarships().then((data) => {
      setScholarships(data);
      setLoading(false);
    });
  }, []);

  const filteredScholarships = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return scholarships
      .filter((s) => {
        const matchesSearch =
          term === "" ||
          s.title.toLowerCase().includes(term) ||
          s.category.toLowerCase().includes(term) ||
          s.provider.toLowerCase().includes(term);
        const matchesStatus =
          statusFilter === "All" || getScholarshipStatus(s.openDate, s.closeDate) === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(a.openDate) - new Date(b.openDate));
  }, [scholarships, searchTerm, statusFilter]);

  return (
    <Layout links={studentNavLinks}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Scholarships</h1>
        <p className="text-sm text-gray-500">
          Browse available scholarships and apply directly from here.
        </p>
      </div>

      <Card className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Scholarship name, provider, or category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>
        </div>

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

      {loading ? (
        <p className="text-sm text-gray-500">Loading scholarships...</p>
      ) : filteredScholarships.length === 0 ? (
        <Card>
          <p className="text-sm text-gray-500">No scholarships match your search or filter.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredScholarships.map((s) => (
            <ScholarshipCard key={s.id} scholarship={s} />
          ))}
        </div>
      )}
    </Layout>
  );
}