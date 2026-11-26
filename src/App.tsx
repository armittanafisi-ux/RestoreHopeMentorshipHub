import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/NavBar";
import Goals from "./components/Goals";
import Profile from "./components/Profile";
import MenteeGoals from "./components/MenteeGoals";
import AdminMatching from "./components/AdminMatching";
import MatchDetails from "./components/MatchDetails";
import AdminGoalsView from "./components/AdminGoalsView";

export default function App() {
  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
        <Route path = "/goals" element = {<Goals />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentee-dashboard" element={<MenteeGoals />} />
        <Route path="/admin-matching" element={<AdminMatching />} />
        <Route path="/match-details/:id" element={<MatchDetails />} />
        <Route path="/admin-goals" element={<AdminGoalsView />} />
    </Routes>
    </BrowserRouter>
  );
}
