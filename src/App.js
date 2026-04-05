import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import Dashboard from "./pages/Dashboard";
import WaterQuality from "./pages/WaterQuality";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./components/Chatbot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Navbar />
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/submit" element={
            <ProtectedRoute>
              <Navbar />
              <SubmitComplaint />
            </ProtectedRoute>
          } />
          <Route path="/track" element={
            <ProtectedRoute>
              <Navbar />
              <TrackComplaint />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/water-quality" element={
            <ProtectedRoute>
              <Navbar />
              <WaterQuality />
            </ProtectedRoute>
          } />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
        <Chatbot />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;