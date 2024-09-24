import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '../../common/hooks/redux'


export default function ProtectedRoute({ element }: { element: ReactNode }) {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
};