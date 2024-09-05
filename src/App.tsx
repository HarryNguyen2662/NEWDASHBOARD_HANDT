import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserMainPage from "./pages/UserMainPage/UserMainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProjectRatingPage from "./pages/RatingPage/ProjectRatingPage";
import ServiceRatingPage from "./pages/RatingPage/ServiceProviderRatingPage";
import Navbar from "./components/Navbar/Navbar";
import NoPage from "./pages/404Page/NoPage";
import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import SingleProjectPage from "./pages/ProjectPages/SingleProjectPage";
import AllProjectsPage from "./pages/ProjectPages/AllProjectsPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MemberSearchPage from "./pages/MemberSearchPage/MemberSearchPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <UserMainPage />
            </AuthenticatedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<AllProjectsPage />} />
          <Route path="projects/:projectId" element={<SingleProjectPage />} />
          <Route path="members/:memberId" element={<ProfilePage />} />
          <Route path="members" element={<MemberSearchPage />} />
          {/* <Route path="my-posts" element={<div>Your Posts</div>} /> */}
        </Route>

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/rate-project"
          element={
            <AuthenticatedRoute>
              <ProjectRatingPage />
            </AuthenticatedRoute>
          }
        />

        <Route
          path="/rate-service"
          element={
            <AuthenticatedRoute>
              <ServiceRatingPage />
            </AuthenticatedRoute>
          }
        />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
