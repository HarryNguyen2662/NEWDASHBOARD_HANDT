import React, { ReactNode, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { LoadingPage } from '../../pages/LoadingPage/LoadingPage';


const PublicRoute = ({ children }: PropsWithChildren<{}>) => {
  const { loggedInUser, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }
  
  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;