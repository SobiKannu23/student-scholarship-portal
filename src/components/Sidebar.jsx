import { NavLink } from "react-router-dom";

// Icons are looked up by path here in the UI layer only — studentNavLinks.js
// and officerNavLinks.js stay pure data (label + path), unchanged.
const ICONS = {
  "/student/dashboard": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  "/student/profile": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  "/student/calendar": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  "/student/documents": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7a2 2 0 012-2h2a2 2 0 012 2v10M5 21h14a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0014.586 3H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  "/student/applications": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  "/officer/dashboard": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6m-6 0H5a2 2 0 01-2-2V7a2 2 0 012-2h3m6 0h3a2 2 0 012 2v10a2 2 0 01-2 2h-3m-6-14v4m6-4v4" />
    </svg>
  ),
  "/officer/applications": (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

const DEFAULT_ICON = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export default function Sidebar({ links, isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onClose}></div>}

      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white border-r border-gray-200 z-30 transform transition-transform duration-200 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="px-4 pt-5 pb-3">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Main Menu</p>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium border-l-4 transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-900 border-blue-800"
                    : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? "text-blue-800" : "text-gray-400 group-hover:text-gray-500"}>
                    {ICONS[link.path] || DEFAULT_ICON}
                  </span>
                  <span>{link.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100">
          <div className="bg-blue-50 rounded-lg px-3 py-3">
            <p className="text-xs font-medium text-blue-900">Need Help?</p>
            <p className="text-[11px] text-blue-700 mt-0.5 leading-relaxed">
              Contact your district scholarship office for support.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}