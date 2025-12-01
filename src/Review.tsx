import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReceipts, type Receipt } from "./model/receipt";
import "./Review.css";
import { Info, CheckCircle, XCircle, Clock } from "lucide-react";
import { formatDate } from "./utils";
import { useAuth } from "./Authentication/AuthContext";

export default function ReviewReceipt() {
    const { user } = useAuth();
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    useEffect(() => {
        setReceipts(getReceipts());
    }, []);

    let waitingNotifications: Receipt[] = [];

    if (user?.type === "accountant") {
        waitingNotifications = receipts.filter((n) => n.status === "new");
    } else if (user?.type === "manager") {
        waitingNotifications = receipts.filter((n) => n.status === "verified");
    }

    const managedNotifications = receipts.filter(
        (n) => n.status === "approved" || n.status === "rejected" || n.status === "reimbursed"
    );

    const WaitingIcon = user?.type === "manager" ? Clock : Info;
    const waitingTitle = user?.type === "manager" ? "Waiting for Approval (Verified)" : "Waiting for Verification (New)";


    return (
        <div className="dashboard-container">
            <div className="waiting-approval-card">
                <h2>{waitingTitle}</h2>
                <div className="notifications-list">
                    {waitingNotifications.map((n) => (
                        <Link
                            key={n.id}
                            to={`/receipt/${n.id}`}
                            className="notification-link"
                        >
                            <div
                                className={`notification-item ${n.status === "new" ? "new" : n.status === "verified" ? "verified" : ""}`}
                            >
                                <span>
                                    {n.salesperson.firstname}{" "}
                                    {n.salesperson.lastname}
                                    <br />
                                    {formatDate(n.date)} – {n.title}
                                </span>
                                <WaitingIcon size={24} className="icon info-icon" />
                            </div>
                        </Link>
                    ))}
                    {waitingNotifications.length === 0 && (
                        <p className="no-notifications">No receipts waiting.</p>
                    )}
                </div>
            </div>

            <div className="notifications-card">
                <h2>Managed (Approved / Rejected)</h2>
                <div className="notifications-list">
                    {managedNotifications.map((n) => (
                        <Link
                            key={n.id}
                            to={`/receipt/${n.id}`}
                            className="notification-link"
                        >
                            <div
                                className={`notification-item ${
                                    n.status === "rejected" ? "rejected" : n.status === "approved" ? "approved" : "reimbursed"
                                }`}
                            >
                                <span>
                                    {n.salesperson.firstname} {n.salesperson.lastname}
                                    <br />
                                    {formatDate(n.date)} – {n.title}
                                </span>

                                {n.status === "approved" || n.status === "reimbursed" ? (
                                    <CheckCircle size={24} className="icon accepted-icon" />
                                ) : (
                                    <XCircle size={24} className="icon rejected-icon" />
                                )}
                            </div>
                        </Link>
                    ))}
                    {managedNotifications.length === 0 && (
                        <p className="no-notifications">No managed receipts.</p>
                    )}
                </div>
            </div>
        </div>
    );
}