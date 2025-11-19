import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./NavigationBar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Profile";
import SubmitReceipt from "./SubmitReceipt";
import Review from "./Review";
import History from "./History/History";
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
          <Route path="/review" element={<Review />} />
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
