import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  redirectTo?: string;
}

const PublicRoute = ({
  children,
  isAuthenticated = false,
  redirectTo = "/dashboard",
}: PublicRouteProps) => {
  // If user is authenticated and tries to access public routes like login/register,
  // redirect them to the dashboard or home page
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
