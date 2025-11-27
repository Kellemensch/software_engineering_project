import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReceiptsForUser, type Receipt } from "../model/receipt";
import { useAuth } from "../Authentication/AuthContext";

export default function SalesDashboard() {
    const { user } = useAuth();
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    useEffect(() => {
        setReceipts(getReceiptsForUser(user!.email));
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Dashboard</h2>
                <div className="dashboard-stats">
                    <div className="stat-row">
                        <span>Submitted Receipts:</span>
                        <span className="stat-value">{receipts.length}</span>
                    </div>
                    <div className="stat-row">
                        <span>Accepted Receipts:</span>
                        <span className="stat-value">
                            {
                                receipts.filter((r) => r.status === "approved")
                                    .length
                            }
                        </span>
                    </div>
                    <div className="stat-row">
                        <span>Rejected Receipts:</span>
                        <span className="stat-value">
                            {
                                receipts.filter((r) => r.status === "rejected")
                                    .length
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className="notifications-card">
                <h2>Notifications</h2>
                <Link to="/submitReceipt">Submit a new receipt!</Link>
                <div className="notifications-list">
                    {receipts
                        .filter((r) => r.status !== "new")
                        .map((receipt, i) => (
                            <Link
                                key={i}
                                to={`/receipt/${receipt.id}`}
                                className="notification-link"
                            >
                                <div
                                    className={`notification-item ${receipt.status === "rejected" ? "rejected" : ""}`}
                                >
                                    <span>
                                        {formatDate(receipt.date)} –{" "}
                                        {receipt.title}
                                    </span>
                                    {receipt.status !== "rejected" ? (
                                        <CheckCircle
                                            size={24}
                                            className="icon accepted-icon"
                                        />
                                    ) : (
                                        <XCircle
                                            size={24}
                                            className="icon rejected-icon"
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

function formatDate(date: Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
}
