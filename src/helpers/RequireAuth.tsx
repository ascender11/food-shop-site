import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootSate } from '../store/store';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const jwt = useSelector((s: RootSate) => s.user.jwt);

  if (!jwt) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default RequireAuth;
