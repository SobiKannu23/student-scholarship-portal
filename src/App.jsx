import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";
import StudentProfile from "./pages/StudentProfile";
import EditProfile from "./pages/EditProfile";
import ScholarshipCalendar from "./pages/ScholarshipCalendar";
import ScholarshipDetails from "./pages/ScholarshipDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import DocumentTracker from "./pages/DocumentTracker";
import DocumentDetails from "./pages/DocumentDetails";
import ApplyScholarship from "./pages/ApplyScholarship";
import MyApplications from "./pages/MyApplications";
import ApplicationJourney from "./pages/ApplicationJourney";
import OfficerApplications from "./pages/OfficerApplications";
import OfficerApplicationDetails from "./pages/OfficerApplicationDetails";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import Scholarships from "./pages/Scholarships";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute role="student">
            <StudentProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile/edit"
        element={
          <ProtectedRoute role="student">
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/calendar"
        element={
          <ProtectedRoute role="student">
            <ScholarshipCalendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/calendar/:id"
        element={
          <ProtectedRoute role="student">
            <ScholarshipDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/officer/dashboard"
        element={
          <ProtectedRoute role="officer">
            <OfficerDashboard />
          </ProtectedRoute>
        }
      />
            <Route
        path="/student/documents"
        element={
          <ProtectedRoute role="student">
            <DocumentTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/documents/:id"
        element={
          <ProtectedRoute role="student">
            <DocumentDetails />
          </ProtectedRoute>
        }
      />
            <Route
        path="/student/apply/:id"
        element={
          <ProtectedRoute role="student">
            <ApplyScholarship />
          </ProtectedRoute>
        }
      />
            <Route
        path="/student/applications"
        element={
          <ProtectedRoute role="student">
            <MyApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/applications/:id"
        element={
          <ProtectedRoute role="student">
            <ApplicationJourney />
          </ProtectedRoute>
        }
      />

            <Route
        path="/officer/applications"
        element={
          <ProtectedRoute role="officer">
            <OfficerApplications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/officer/applications/:id"
        element={
          <ProtectedRoute role="officer">
            <OfficerApplicationDetails />
          </ProtectedRoute>
        }
      />
            <Route path="*" element={<RoleBasedRedirect />} />
                  <Route
        path="/student/scholarships"
        element={
          <ProtectedRoute role="student">
            <Scholarships />
          </ProtectedRoute>
        }
      />
    </Routes>
    
    
  );
}