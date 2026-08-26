import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import FormSection from "../components/form/FormSection";
import FormInput from "../components/form/FormInput";
import FormSelect from "../components/form/FormSelect";
import { useStudentProfile } from "../hooks/useStudentProfile";
import { validateProfileSection } from "../utils/validateProfileSection";
import { sectionsConfig } from "../data/profileSectionsConfig";
import { studentNavLinks } from "../config/studentNavLinks";

export default function EditProfile() {
  const { profile, loading, saveSection } = useStudentProfile();
  const [activeSectionKey, setActiveSectionKey] = useState(sectionsConfig[0].key);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [savedSection, setSavedSection] = useState(null);

  const activeSection = sectionsConfig.find((s) => s.key === activeSectionKey);

  useEffect(() => {
    if (profile && activeSection) {
      setFormData(profile[activeSection.key] || {});
      setErrors({});
      setSavedSection(null);
    }
  }, [profile, activeSectionKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateProfileSection(activeSectionKey, formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      await saveSection(activeSectionKey, formData);
      setSavedSection(activeSectionKey);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !activeSection) {
    return (
      <Layout links={studentNavLinks}>
        <p className="text-sm text-gray-500">Loading profile...</p>
      </Layout>
    );
  }

  const visibleFields = activeSection.fields.filter((field) => {
    if (activeSectionKey === "disability" && field.name !== "hasDisability") {
      return formData.hasDisability === "Yes";
    }
    return true;
  });

  return (
    <Layout links={studentNavLinks}>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">Edit Profile</h1>
        <p className="text-sm text-gray-500">Update each section and save it individually.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-56 flex-shrink-0">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 space-y-1">
            {sectionsConfig.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveSectionKey(section.key)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  activeSectionKey === section.key
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <FormSection
            title={activeSection.label}
            description={activeSection.description}
            onSubmit={handleSubmit}
            saving={saving}
            saved={savedSection === activeSectionKey}
          >
            {visibleFields.map((field) =>
              field.type === "select" ? (
                <FormSelect
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  options={field.options}
                  error={errors[field.name]}
                  required
                />
              ) : (
                <FormInput
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type === "date" ? "date" : "text"}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  error={errors[field.name]}
                  required
                />
              )
            )}
          </FormSection>
        </div>
      </div>
    </Layout>
  );
}