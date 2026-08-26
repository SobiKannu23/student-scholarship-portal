export default function FormInput({ label, name, value, onChange, type = "text", placeholder = "", error, required = false }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
          error ? "border-red-400 focus:ring-red-400" : "border-gray-300 focus:ring-blue-700"
        }`}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}