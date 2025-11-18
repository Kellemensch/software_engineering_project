import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import SubmitReceipt from "./SubmitReceipt";
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
