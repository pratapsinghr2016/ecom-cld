import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { privateRoutes, publicRoutes, specialRoutes } from "./routeConfig";

interface AppRouterProps {
  isAuthenticated?: boolean;
}

const AppRouter = ({ isAuthenticated = false }: AppRouterProps) => {
  return (
    <Routes>
      {/* Public Routes */}
      {publicRoutes.map((route) => {
        const Component = route.component;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <PublicRoute isAuthenticated={isAuthenticated}>
                <Component />
              </PublicRoute>
            }
          />
        );
      })}
    </Routes>
  );
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        {publicRoutes.map((route) => {
          const Component = route.component;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <Component />
                </PublicRoute>
              }
            />
          );
        })}

        {/* Private Routes */}
        {privateRoutes.map((route) => {
          const Component = route.component;
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Component />
                </PrivateRoute>
              }
            />
          );
        })}

        {/* Special Routes (404, etc.) */}
        {specialRoutes.map((route) => {
          const Component = route.component;
          return (
            <Route key={route.path} path={route.path} element={<Component />} />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
