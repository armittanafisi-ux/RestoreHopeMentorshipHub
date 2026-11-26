import { Routes, Route, Outlet, Link } from "react-router";
import GoalsActionPage from "./pages/GoalsActionPage";
import GoalsPage from "./pages/GoalsPage";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

// Shared navbar for the task and goal pages.
function GoalsLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRoles={["mentor", "mentee"]}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute allowedRoles={["mentor", "mentee"]}>
            <GoalsLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<GoalsActionPage />} />
        <Route path="/goals" element={<GoalsPage />} />
      </Route>

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
  );
}