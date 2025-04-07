import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Layout from "./components/layout/Layout";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import DashboardPage from "./pages/DashBoardPage";
import HomePage from "./pages/HomePage";

import TemplatesPage from "./pages/templates/TemplatesPage";
import NewTemplatePage from "./pages/templates/NewTemplatePage";
import EditTemplatePage from "./pages/templates/EditTemplatePage";

import FlowsPage from "./pages/flows/FlowsPage";
import NewFlowPage from "./pages/flows/NewFlowPage";
import EditFlowPage from "./pages/flows/EditFlowPage";
import RunFlowPage from "./pages/flows/RunFlowPage"

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="templates"
          element={
            <ProtectedRoute>
              <TemplatesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="templates/new"
          element={
            <ProtectedRoute>
              <NewTemplatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="templates/edit/:id"
          element={
            <ProtectedRoute>
              <EditTemplatePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="flows"
          element={
            <ProtectedRoute>
              <FlowsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="flows/new"
          element={
            <ProtectedRoute>
              <NewFlowPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="flows/edit/:id"
          element={
            <ProtectedRoute>
              <EditFlowPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="run-flow"
          element={
            <ProtectedRoute>
              <RunFlowPage />
            </ProtectedRoute>
          }
        />

      </Route>
    </Routes>
  );
};

export default App;
