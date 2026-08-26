import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();

  // Wait for the localStorage check before deciding — avoids a flash-redirect to /login on refresh
  if (loading) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    const fallback = user.role === "student" ? "/student/dashboard" : "/officer/dashboard";
    return <Navigate to={fallback} replace />;
  }

  return children;
}