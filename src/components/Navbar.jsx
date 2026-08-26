export default function Navbar({ user, onLogout, onMenuToggle }) {
  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuToggle}
            className="md:hidden p-1 rounded hover:bg-blue-800"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white mb-1"></span>
            <span className="block w-6 h-0.5 bg-white"></span>
          </button>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-tight truncate">Government of Tamil Nadu</p>
            <p className="text-xs text-blue-200 leading-tight truncate">Student Scholarship Portal</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-blue-200 capitalize">{user.role}</p>
            </div>
            <button
              onClick={onLogout}
              className="text-sm bg-blue-800 hover:bg-blue-700 px-3 py-1.5 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}