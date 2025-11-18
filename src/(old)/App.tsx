import { Route, Routes } from "react-router";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { AuthContextProvider } from "./AuthContext";

function App() {
    return (
        <AuthContextProvider>
            <Routes>
                <Route index element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </AuthContextProvider>
    );
}

export default App;
