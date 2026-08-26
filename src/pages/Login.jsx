import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Already logged in? Skip the login form entirely — send them to their dashboard.
  useEffect(() => {
    if (user) {
      navigate(user.role === "student" ? "/student/dashboard" : "/officer/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(email, password);
      // Role comes from the matched mock user record — no manual role selector needed
      navigate(user.role === "student" ? "/student/dashboard" : "/officer/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm p-6">
        <p className="text-xs text-blue-800 font-medium">Government of Tamil Nadu</p>
        <h1 className="text-xl font-bold text-gray-800 mb-1">Sign in to your account</h1>
        <p className="text-sm text-gray-500 mb-6">Student or Officer, use your registered email.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" fullWidth disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          New student?{" "}
          <Link to="/register" className="text-blue-800 font-medium">
            Create an account
          </Link>
        </p>

        <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-500">
          <p className="font-medium mb-1">Demo credentials</p>
          <p>Student: arun.kumar@example.com / student123</p>
          <p>Officer: priya.raman@tn.gov.in / officer123</p>
        </div>
      </div>
    </div>
  );
}