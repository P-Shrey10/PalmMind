import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import App from "../App.tsx";
import AuthLayout from "../AuthLayout.tsx";
import Login from "../component/Login.tsx";
import SignUp from "../component/SignUp.tsx";
import DashboardDetail from "../component/DashboardDetail.tsx";
import RegisterDetail from "../component/RegisterDetail.tsx";
import WorkspaceDetail from "../component/WorkspaceDetail.tsx";
import DataManagementDetail from "../component/DataManagementDetail.tsx";
import SettingDetail from "../component/SettingDetail.tsx";

const Router = () => {
  const [cookies] = useCookies(["authToken"]); // Access the authentication token
  const isAuthenticated = !!cookies.authToken; // Check if token exists

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes (No Header/Footer) */}
        <Route element={<AuthLayout />}>
          {/* Redirect to Dashboard if already logged in */}
          <Route
            path="login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="signup"
            element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
          />
        </Route>

        {/* Main Routes (With Header/Footer) */}
        <Route element={<App />}>
          {/* Redirect to Login if not authenticated */}
          <Route
            path="/"
            element={
              isAuthenticated ? <DashboardDetail /> : <Navigate to="/login" />
            }
          />
          <Route
            path="register"
            element={
              isAuthenticated ? <RegisterDetail /> : <Navigate to="/login" />
            }
          />
          <Route
            path="workspace"
            element={
              isAuthenticated ? <WorkspaceDetail /> : <Navigate to="/login" />
            }
          />
          <Route
            path="data-management"
            element={
              isAuthenticated ? (
                <DataManagementDetail />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="settings"
            element={
              isAuthenticated ? <SettingDetail /> : <Navigate to="/login" />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
