import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  redirectTo?: string;
}

const PrivateRoute = ({
  children,
  isAuthenticated = false,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
