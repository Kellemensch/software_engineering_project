import "./Dashboard.css";

import SalesDashboard from "./SalespersonDashboard";
import AccountantDashboard from "./AccountantDashboard";
import ManagerDashboard from "./ManagerDashboard";

export default function Dashboard() {
  
  /*
     0 = Salesperson
     1 = Accountant
     2 = Manager
  */
  let user = 1;

  const renderScreen = () => {
    switch (user) {
      case 0:
        return <SalesDashboard />;
      case 1:
        return <AccountantDashboard />;
      case 2:
        return <ManagerDashboard />;
      default:
        return <h2>Unknown role</h2>;
    }
  };

  return <div className="dashboard">{renderScreen()}</div>;
}