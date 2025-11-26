import "./Dashboard.css";

import SalesDashboard from "./SalespersonDashboard";
import AccountantDashboard from "./AccountantDashboard";
import ManagerDashboard from "./ManagerDashboard";
import { useAuth, useUserOnlyPage } from "../Authentication/AuthContext";

export default function Dashboard() {
    useUserOnlyPage();

    const { user } = useAuth();

    const renderScreen = () => {
        switch (user?.type) {
            case "salesperson":
                return <SalesDashboard />;
            case "accountant":
                return <AccountantDashboard />;
            case "manager":
                return <ManagerDashboard />;
            default:
                return <h2>Unknown role</h2>;
        }
    };

    return <div className="dashboard">{renderScreen()}</div>;
}

