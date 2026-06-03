import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { auth } = useAuth();

  if (!auth.token || !auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (role && auth.user.role !== role) {
    return <Navigate to={auth.user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  return children;
};

export default ProtectedRoute;
