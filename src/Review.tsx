import "./Review.css";
import { Info, CheckCircle } from "lucide-react";

export default function ReviewReceipt() {
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

    const waitingNotifications = notifications.filter(n => n.status === "new");
    const managedNotifications = notifications.filter(n => n.status === "accepted" || n.status === "rejected");

    return (
        <div className="dashboard-container">
            <div className="waiting-approval-card">
                <h2>Waiting</h2>
                <div className="notifications-list">
                    {waitingNotifications.map((n, i) => (
                        <div key={i} className={`notification-item ${n.status === "new" ? "new" : ""} ${n.status === "rejected" ? "rejected" : ""}`}>
                            <span>{n.account}<br />{n.date} – {n.store}</span>
                            <Info size={24} className="icon info-icon" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="notifications-card">
                <h2>Managed</h2>
                <div className="notifications-list">
                    {managedNotifications.map((n, i) => (
                        <div key={i} className={`notification-item ${n.status === "new" ? "new" : ""} ${n.status === "rejected" ? "rejected" : ""}`}>
                            <span>{n.account}<br />{n.date} – {n.store}</span>
                            <CheckCircle size={24} className="icon accepted-icon" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
