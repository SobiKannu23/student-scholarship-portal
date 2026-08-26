import Button from "../Button";

export default function FormSection({ title, description, children, onSubmit, saving, saved }) {
  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-6">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>

      <div className="mt-5 flex items-center gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Section"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved successfully.</span>}
      </div>
    </form>
  );
}