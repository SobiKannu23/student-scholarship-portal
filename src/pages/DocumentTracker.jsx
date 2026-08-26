import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import DocumentCard from "../components/DocumentCard";
import FormInput from "../components/form/FormInput";
import { useAuth } from "../context/AuthContext";
import { studentNavLinks } from "../config/studentNavLinks";
import { getStudentDocuments, addDocument } from "../services/mockDocumentService";
import { getDocumentStatus } from "../utils/documentStatus";
import { validateDocumentForm } from "../utils/validateDocument";
import { fileToBase64, formatFileSize } from "../utils/fileHelpers";

const STATUS_FILTERS = ["All", "Valid", "Expiring Soon", "Expired"];

export default function DocumentTracker() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");

  const emptyForm = {
    name: "",
    type: "",
    documentNumber: "",
    issuingAuthority: "",
    issueDate: "",
    expiryDate: "",
    description: "",
  };
    const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    getStudentDocuments(user.id).then((data) => {
      setDocuments(data);
      setLoading(false);
    });
  }, [user]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0] || null);
  };

   const handleAddDocument = async (e) => {
    e.preventDefault();
    const errors = validateDocumentForm(formData, selectedFile);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    try {
      const fileData = await fileToBase64(selectedFile);
      await addDocument(user.id, {
        ...formData,
        fileData,
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        fileSize: selectedFile.size,
      });
      const updated = await getStudentDocuments(user.id);
      setDocuments(updated);
      setFormData(emptyForm);
      setSelectedFile(null);
      setFormErrors({});
      setShowAddForm(false);
    } finally {
      setSaving(false);
    }
  };

    const handleDocumentRemoved = (updatedList) => {
    setDocuments(updatedList);
  };

  const counts = useMemo(() =>  {
    const result = { Valid: 0, "Expiring Soon": 0, Expired: 0 };
    documents.forEach((doc) => {
      const status = getDocumentStatus(doc.expiryDate);
      result[status] += 1;
    });
    return result;
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    return documents
      .filter((doc) => statusFilter === "All" || getDocumentStatus(doc.expiryDate) === statusFilter)
      .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));
  }, [documents, statusFilter]);

  return (
    <Layout links={studentNavLinks}>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Document Expiry Tracker</h1>
          <p className="text-sm text-gray-500">
            Monitor the validity of your submitted documents and renew them before they expire.
          </p>
        </div>
        <Button onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? "Cancel" : "Add Document"}
        </Button>
      </div>

      {showAddForm && (
        <Card title="Add New Document" className="mb-6">
          <form onSubmit={handleAddDocument} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Document Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              placeholder="e.g. Community Certificate"
              error={formErrors.name}
              required
            />
            <FormInput
              label="Document Type"
              name="type"
              value={formData.type}
              onChange={handleFormChange}
              placeholder="e.g. Identity / Community Proof"
              error={formErrors.type}
              required
            />
            <FormInput
              label="Document Number"
              name="documentNumber"
              value={formData.documentNumber}
              onChange={handleFormChange}
              placeholder="e.g. TN-CC-2026-12345"
              error={formErrors.documentNumber}
              required
            />
            <FormInput
              label="Issuing Authority"
              name="issuingAuthority"
              value={formData.issuingAuthority}
              onChange={handleFormChange}
              placeholder="e.g. Tahsildar Office, Salem"
              error={formErrors.issuingAuthority}
              required
            />
            <FormInput
              label="Issue Date"
              name="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={handleFormChange}
              error={formErrors.issueDate}
              required
            />
            <FormInput
              label="Expiry Date"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={handleFormChange}
              error={formErrors.expiryDate}
              required
            />
                        <div className="sm:col-span-2">
              <FormInput
                label="Description (optional)"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                placeholder="Brief note about this document"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload File (PDF, JPG, PNG) <span className="text-red-600">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-blue-800 file:text-white file:text-sm file:font-medium hover:file:bg-blue-900"
              />
              {selectedFile && (
                <p className="text-xs text-gray-500 mt-1">
                  {selectedFile.name} ({formatFileSize(selectedFile.size)})
                </p>
              )}
              {formErrors.file && <p className="text-xs text-red-600 mt-1">{formErrors.file}</p>}
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Document"}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">Loading documents...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card title="Valid">
              <p className="text-3xl font-bold text-green-600">{counts.Valid}</p>
            </Card>
            <Card title="Expiring Soon">
              <p className="text-3xl font-bold text-amber-600">{counts["Expiring Soon"]}</p>
            </Card>
            <Card title="Expired">
              <p className="text-3xl font-bold text-red-600">{counts.Expired}</p>
            </Card>
          </div>

          {counts["Expiring Soon"] > 0 && (
            <div className="mb-6 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-md p-3">
              You have {counts["Expiring Soon"]} document(s) expiring within 30 days. Please renew them soon to avoid delays in scholarship processing.
            </div>
          )}
          {counts.Expired > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md p-3">
              You have {counts.Expired} expired document(s). Renew them immediately as expired documents may not be accepted.
            </div>
          )}

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

                   {filteredDocuments.length === 0 ? (
            <p className="text-sm text-gray-500">No documents match this filter.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} onRemoved={handleDocumentRemoved} />
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}