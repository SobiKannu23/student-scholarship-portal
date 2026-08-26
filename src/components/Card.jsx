export default function Card({ title, subtitle, icon, children, footer, onClick, className = "" }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 shadow-sm p-5 ${
        onClick ? "cursor-pointer hover:shadow-md transition-shadow" : ""
      } ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center justify-between mb-3">
          <div>
            {title && <h3 className="text-base font-semibold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          </div>
          {icon && <div className="text-blue-800">{icon}</div>}
        </div>
      )}
      <div>{children}</div>
      {footer && <div className="mt-4 pt-3 border-t border-gray-100">{footer}</div>}
    </div>
  );
}