import { Info, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { type Receipt, getReceiptsForGroup } from "../model/receipt";

export default function AccountantDashboard() {
    const { user } = useAuth();
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    useEffect(() => {
        setReceipts(getReceiptsForGroup(user!.groupId));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="notifications-card">
                <h2>Receipts</h2>
                <div className="notifications-list">
                    {receipts.map((r) => (
                        <Link
                            key={r.id}
                            to={`/receipt/${r.id}`}
                            className="notification-link"
                        >
                            <div
                                className={`notification-item ${r.status === "new" ? "new" : ""} ${r.status === "rejected" ? "rejected" : ""}`}
                            >
                                <span>
                                    {r.salesperson.firstname}{" "}
                                    {r.salesperson.lastname}
                                    <br />
                                    {r.date.toDateString()} – {r.subject}
                                </span>
                                {r.status === "new" ? (
                                    <Info
                                        size={24}
                                        className="icon info-icon"
                                    />
                                ) : (
                                    <CheckCircle
                                        size={24}
                                        className="icon accepted-icon"
                                    />
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
