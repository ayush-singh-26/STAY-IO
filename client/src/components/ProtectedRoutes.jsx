import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Spinner from './Loader/Spinner';

const ProtectedRoutes = ({ children }) => {
  const { status, loading } = useSelector((store) => store.auth);

  if (loading) {
    return <Spinner />;
  }

  if (!status) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AuthenticatedUser = ({ children }) => {
  const { status } = useSelector(store => store.auth);

  if (status) {
    return <Navigate to="/" />;
  }

  return children;
};


const RoleProtectedRoute = ({ children, roles }) => {
  const { userData, status, loading } = useSelector(store => store.auth);

  if (loading) {
    return <Spinner />;
  }

  if (!status) return <Navigate to="/login" />;

  if (!roles.includes(userData?.role)) return <Navigate to="/" />;

  return children;
};



export {
  ProtectedRoutes,
  AuthenticatedUser,
  RoleProtectedRoute
}
