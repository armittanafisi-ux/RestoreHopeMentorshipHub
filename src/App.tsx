import { BrowserRouter, Routes, Route, Link } from "react-router";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["mentor", "mentee"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["mentor", "mentee"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="*"
          element={
            <main className="p-6 text-left">
              <p>Page not found.</p>

              <Link
                to="/profile"
                className="mt-4 inline-block underline"
              >
                Go to profile
              </Link>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}