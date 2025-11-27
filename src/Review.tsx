import { useEffect, useState } from "react";
import { getReceipts, type Receipt } from "./model/receipt";
import "./Review.css";
import { Info, CheckCircle } from "lucide-react";
import { formatDate } from "./utils";

export default function ReviewReceipt() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    useEffect(() => {
        setReceipts(getReceipts());
    }, []);

    const waitingNotifications = receipts.filter((n) => n.status === "new");
    const managedNotifications = receipts.filter(
        (n) => n.status === "approved" || n.status === "rejected",
    );

    return (
        <div className="dashboard-container">
            <div className="waiting-approval-card">
                <h2>Waiting</h2>
                <div className="notifications-list">
                    {waitingNotifications.map((n, i) => (
                        <div
                            key={i}
                            className={`notification-item ${n.status === "new" ? "new" : ""} ${n.status === "rejected" ? "rejected" : ""}`}
                        >
                            <span>
                                {n.salesperson.firstname}{" "}
                                {n.salesperson.lastname}
                                <br />
                                {formatDate(n.date)} – {n.title}
                            </span>
                            <Info size={24} className="icon info-icon" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="notifications-card">
                <h2>Managed</h2>
                <div className="notifications-list">
                    {managedNotifications.map((n, i) => (
                        <div
                            key={i}
                            className={`notification-item ${n.status === "new" ? "new" : ""} ${n.status === "rejected" ? "rejected" : ""}`}
                        >
                            <span>
                                {n.salesperson.firstname}{" "}
                                {n.salesperson.lastname}
                                <br />
                                {formatDate(n.date)} – {n.title}
                            </span>
                            <CheckCircle
                                size={24}
                                className="icon accepted-icon"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
