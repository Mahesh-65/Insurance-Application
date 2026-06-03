import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminPlansPage from './pages/admin/AdminPlansPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import UserDashboardPage from './pages/user/UserDashboardPage';
import ApplyInsurancePage from './pages/user/ApplyInsurancePage';
import ApplicationStatusPage from './pages/user/ApplicationStatusPage';
import ProfilePage from './pages/user/ProfilePage';
import ProtectedRoute from './components/common/ProtectedRoute';

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/admin/dashboard"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminDashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/plans"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminPlansPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/applications"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminApplicationsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute role="ADMIN">
          <AdminUsersPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/dashboard"
      element={
        <ProtectedRoute role="USER">
          <UserDashboardPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/apply"
      element={
        <ProtectedRoute role="USER">
          <ApplyInsurancePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/status"
      element={
        <ProtectedRoute role="USER">
          <ApplicationStatusPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/profile"
      element={
        <ProtectedRoute role="USER">
          <ProfilePage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
