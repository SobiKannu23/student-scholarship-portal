import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Used as the catch-all route ("*") so any unknown or mistyped URL sends the
// user somewhere valid for their session instead of a blank page:
// unauthenticated -> /login, student -> their dashboard, officer -> theirs.
export default function RoleBasedRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "student") return <Navigate to="/student/dashboard" replace />;
  if (user.role === "officer") return <Navigate to="/officer/dashboard" replace />;
  return <Navigate to="/login" replace />;
}