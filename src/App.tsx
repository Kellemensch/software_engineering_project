import { useState } from "react";
import { Route, Routes } from "react-router";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";

function App() {
    return (
        <Routes>
            <Route index element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default App;
