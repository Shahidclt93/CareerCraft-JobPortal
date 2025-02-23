import React from "react";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsofService from "./pages/TermsofService.jsx";
import Jobs from "./pages/Jobs.jsx";
import Profile from "./pages/Profile.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Companies from "./pages/admin/Companies.jsx";
import CompanyCreate from "./pages/admin/CompanyCreate.jsx";
import CompanySetup from "./pages/admin/CompanySetup.jsx";
import AdminJobs from "./pages/admin/AdminJobs.jsx";
import PostJob from "./pages/admin/PostJob.jsx";
import Applicants from "./pages/admin/Applicants.jsx";
import ProtectedRoute from "./components/adminComponents/ProtectedRoute.jsx";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/job/:id",
    element: <JobDetails />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/privacyPolicy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/termsofService",
    element: <TermsofService />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/home",
    element: <Home />,
  },
 
  // /admin
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/create",
    element: (
      <ProtectedRoute>
        {" "}
        <PostJob />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}

export default App;
