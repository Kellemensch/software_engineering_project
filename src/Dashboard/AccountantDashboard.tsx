import { Info, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AccountantDashboard() {
    const stats = {
        new: 2,
        submitted: 108,
        accepted: 106,
        rejected: 2,
    };

    const notifications = [
        { account: "Liam Neeson", date: "1.1.2025", store: "Lidl", status: "new" },
        { account: "Dwayne Johnson", date: "31.12.2024", store: "Lidl", status: "new" },
        { account: "Katy Perry", date: "12.11.2024", store: "Lidl", status: "accepted" },
        { account: "Dwayne Johnson", date: "1.1.2024", store: "Lidl", status: "accepted" },
        { account: "Dwayne Johnson", date: "1.1.2025", store: "Lidl", status: "accepted" },
        { account: "Liam Neeson", date: "31.12.2024", store: "Lidl", status: "accepted" },
        { account: "Dwayne Johnson", date: "12.11.2024", store: "Lidl", status: "accepted" },
        { account: "Katy Perry", date: "1.1.2024", store: "Lidl", status: "accepted" },
    ];

    return(
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2>Dashboard</h2>
          <div className="dashboard-stats">
            <div className="stat-row-new">
              <span>New Receipts:</span>
              <span className="stat-value-new">{stats.new}</span>
            </div>
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
              <Link key={i} to="/receiptInformation" className="notification-link">
                <div className={`notification-item ${n.status === "new" ? "new" : ""} ${ n.status === "rejected" ? "rejected" : "" }`}>
                  <span>{n.account}<br />{n.date} – {n.store}</span>
                  {n.status === "new" ? (
                    <Info size={24} className="icon info-icon" />
                  ) : (
                    <CheckCircle size={24} className="icon accepted-icon" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
}
