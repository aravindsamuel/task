import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import MainPage from "./pages/MainPage";
import useAuth from "./hooks/useAuth";

function PrivateRoute({ children }) {
  const isAuth = useAuth();
  if (isAuth === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-14 h-14 border-4 border-transparent border-t-blue-500 border-l-blue-400 rounded-full animate-spin shadow-lg shadow-blue-300"></div>
      </div>
    );
  }
  return isAuth ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
