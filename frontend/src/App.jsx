
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";

import Home from "./pages/Home";
import JobsPage from "./pages/Jobs";  
import Applications from "./pages/Applications";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ResumePage from "./pages/ResumePage"; 
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavbarWrapper />
      </Router>
    </AuthProvider>
  );
};

// NavbarWrapper handles conditional rendering of Navbar
const NavbarWrapper = () => {
  const location = useLocation();

  // Show Navbar only if NOT on login/register
  const showNavbar =
    location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage /> 
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resume"
          element={
            <ProtectedRoute>
              <ResumePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
