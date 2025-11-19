import { CheckCircle, XCircle } from "lucide-react";
export default function SalespersonHistory() {
        
    const notifications = [
        { account: "Katy Perry", date: "12.11.2024", store: "Lidl", status: "rejected" },
        { account: "Dwayne Johnson", date: "1.1.2024", store: "Lidl", status: "accepted" },
        { account: "Dwayne Johnson", date: "1.1.2025", store: "Lidl", status: "accepted" },
        { account: "Liam Neeson", date: "31.12.2024", store: "Lidl", status: "accepted" },
        { account: "Dwayne Johnson", date: "12.11.2024", store: "Lidl", status: "accepted" },
        { account: "Katy Perry", date: "1.1.2024", store: "Lidl", status: "accepted" },
    ];

    return(
      <div className="dashboard-container">
        <div className="notifications-card">
          <h2>Submit History</h2>
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
    )
}