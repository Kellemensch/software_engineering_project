import "./Dashboard.css";
import { CheckCircle, XCircle } from "lucide-react";

export default function Dashboard() {
  const stats = {
    submitted: 108,
    accepted: 106,
    rejected: 2,
  };

  const notifications = [
    { date: "1.1.2025", store: "Lidl", status: "accepted" },
    { date: "31.12.2024", store: "Lidl", status: "rejected" },
    { date: "12.11.2024", store: "Lidl", status: "accepted" },
    { date: "1.1.2024", store: "Lidl", status: "accepted" },
    { date: "1.1.2025", store: "Lidl", status: "accepted" },
    { date: "31.12.2024", store: "Lidl", status: "rejected" },
    { date: "12.11.2024", store: "Lidl", status: "accepted" },
    { date: "1.1.2024", store: "Lidl", status: "accepted" },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Dashboard</h2>
        <div className="dashboard-stats">
          <div className="stat-row">
            <span>Submitted Receipts:</span>
            <span className="stat-value">{stats.submitted}</span>
          </div>
          <div className="stat-row">
            <span>Accepted Receipts:</span>
            <span className="stat-value">{stats.accepted}</span>
          </div>
          <div className="stat-row">
            <span>Rejected Receipts:</span>
            <span className="stat-value">{stats.rejected}</span>
          </div>
        </div>
      </div>

      <div className="notifications-card">
        <h2>Notifications</h2>
        <div className="notifications-list">
          {notifications.map((n, i) => (
            <div key={i} className={`notification-item ${ n.status === "rejected" ? "rejected" : "" }`}>
              <span> {n.date} – {n.store} </span>
              {n.status === "accepted" ? ( <CheckCircle size={24} className="icon accepted-icon" /> ) : ( <XCircle size={24} className="icon rejected-icon" /> )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
