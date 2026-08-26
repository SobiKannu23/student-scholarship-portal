import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import StatusBadge from "../components/StatusBadge";
import Pagination from "../components/Pagination";
import { officerNavLinks } from "../config/officerNavLinks";
import { getAllApplications, getFilterOptions } from "../services/mockOfficerApplicationService";
import { formatDisplayDate } from "../utils/dateHelpers";

const STATUS_FILTERS = ["All", "Pending", "Approved", "Rejected"];
const PAGE_SIZE = 4;

const SORT_OPTIONS = [
  { value: "dateDesc", label: "Newest First" },
  { value: "dateAsc", label: "Oldest First" },
  { value: "nameAsc", label: "Student Name (A-Z)" },
  { value: "nameDesc", label: "Student Name (Z-A)" },
];

export default function OfficerApplications() {
  const [applications, setApplications] = useState([]);
  const [filterOptions, setFilterOptions] = useState({ scholarshipTitles: [], categories: [] });
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [scholarshipFilter, setScholarshipFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dateDesc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Promise.all([getAllApplications(), getFilterOptions()]).then(([apps, options]) => {
      setApplications(apps);
      setFilterOptions(options);
      setLoading(false);
    });
  }, []);

  // Reset to page 1 whenever any filter/search/sort changes, so a user never
  // lands on an empty page after narrowing the result set.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, scholarshipFilter, categoryFilter, sortBy]);

  const filteredApplications = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const result = applications.filter((app) => {
      const matchesSearch =
        term === "" ||
        app.studentName.toLowerCase().includes(term) ||
        app.scholarshipTitle.toLowerCase().includes(term);
      const matchesStatus = statusFilter === "All" || app.status === statusFilter;
      const matchesScholarship =
        scholarshipFilter === "All" || app.scholarshipTitle === scholarshipFilter;
      const matchesCategory = categoryFilter === "All" || app.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesScholarship && matchesCategory;
    });

    result.sort((a, b) => {
      if (sortBy === "dateDesc") return new Date(b.submittedDate) - new Date(a.submittedDate);
      if (sortBy === "dateAsc") return new Date(a.submittedDate) - new Date(b.submittedDate);
      if (sortBy === "nameAsc") return a.studentName.localeCompare(b.studentName);
      if (sortBy === "nameDesc") return b.studentName.localeCompare(a.studentName);
      return 0;
    });

    return result;
  }, [applications, searchTerm, statusFilter, scholarshipFilter, categoryFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredApplications.length / PAGE_SIZE));
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <Layout links={officerNavLinks}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Application Management</h1>
        <p className="text-sm text-gray-500">Search, filter, and review scholarship applications.</p>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading applications...</p>
      ) : (
        <>
          <Card className="mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Student or scholarship name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scholarship</label>
                <select
                  value={scholarshipFilter}
                  onChange={(e) => setScholarshipFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                  <option value="All">All Scholarships</option>
                  {filterOptions.scholarshipTitles.map((title) => (
                    <option key={title} value={title}>{title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                  <option value="All">All Categories</option>
                  {filterOptions.categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-700"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
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

          <Card>
            <p className="text-xs text-gray-500 mb-3">
              Showing {filteredApplications.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
              -{Math.min(currentPage * PAGE_SIZE, filteredApplications.length)} of {filteredApplications.length} applications
            </p>

            {filteredApplications.length === 0 ? (
              <p className="text-sm text-gray-500">No applications match the current filters.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                      <tr className="border-b border-gray-200 text-gray-500">
                      <th className="py-2 pr-4 font-medium">Application ID</th>
                      <th className="py-2 pr-4 font-medium">Student</th>
                      <th className="py-2 pr-4 font-medium">Student ID</th>
                      <th className="py-2 pr-4 font-medium">Scholarship</th>
                      <th className="py-2 pr-4 font-medium">Category</th>
                      <th className="py-2 pr-4 font-medium">Submitted</th>
                      <th className="py-2 pr-4 font-medium">Status</th>
                      <th className="py-2 pr-4 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedApplications.map((app) => (
                      <tr key={app.id} className="border-b border-gray-100 last:border-b-0">
                        <td className="py-2 pr-4 text-gray-700">{app.id}</td>
                        <td className="py-2 pr-4 text-gray-700">{app.studentName}</td>
                        <td className="py-2 pr-4 text-gray-500">{app.studentId || "-"}</td>
                        <td className="py-2 pr-4 text-gray-700">{app.scholarshipTitle}</td>
                        <td className="py-2 pr-4 text-gray-500">{app.category}</td>
                        <td className="py-2 pr-4 text-gray-500">{formatDisplayDate(app.submittedDate)}</td>
                        <td className="py-2 pr-4">
                          <StatusBadge status={app.status} />
                        </td>
                        <td className="py-2 pr-4">
                          <Link to={`/officer/applications/${app.id}`}>
                            <Button variant="secondary">View</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </Card>
        </>
      )}
    </Layout>
  );
}