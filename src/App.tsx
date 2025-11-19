import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./NavigationBar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile";
import SubmitReceipt from "./SubmitReceipt";
import ReviewReceipt from "./ReviewReceipt";
import History from "./History";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

function AppContent() {
  const location = useLocation();

  const authenticationRoutes = ["/login", "/register"];
  const hideNavbar = authenticationRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<History />} />

          <Route path="/submitReceipt" element={<SubmitReceipt />} />
          <Route path="/reviewReceipt" element={<ReviewReceipt />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
