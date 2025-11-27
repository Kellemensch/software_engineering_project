import { CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { getReceiptsForUser, type Receipt } from "../model/receipt";
import { formatDate } from "../utils";

export default function SalespersonHistory() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        setReceipts(getReceiptsForUser(user!.email));
    }, [user]);

    return (
        <div className="dashboard-container">
            <div className="notifications-card">
                <h2>Submit History</h2>
                <div className="notifications-list">
                    {receipts.map((r) => (
                        <Link
                            key={r.id}
                            to={`/receipt/${r.id}`}
                            className="notification-link"
                            data-testid="notification-link"
                        >
                            <div
                                className={`notification-item ${
                                    r.status === "rejected" ? "rejected" : ""
                                }`}
                            >
                                <span>
                                    {formatDate(r.date)} – {r.title}
                                </span>
                                {r.status === "approved" ? (
                                    <CheckCircle
                                        size={24}
                                        className="icon accepted-icon"
                                        data-testid="accepted-icon"
                                    />
                                ) : (
                                    <XCircle
                                        size={24}
                                        className="icon rejected-icon"
                                        data-testid="rejected-icon"
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
