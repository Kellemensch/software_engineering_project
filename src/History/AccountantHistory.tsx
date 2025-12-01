import { CheckCircle, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { type Receipt, getReceiptsForGroup } from "../model/receipt";
import { formatDate } from "../utils";

export default function AccountantHistory() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const { user } = useAuth();

    useEffect(() => {
        setReceipts(getReceiptsForGroup(user!.groupId));
    }, [user]);

    return (
        <div className="dashboard-container">
            <div className="notifications-card">
                <h2>Review History</h2>

                <div className="notifications-list">
                    {receipts.map((r) => (
                        <Link
                            key={r.id}
                            to={`/receipt/${r.id}`}
                            className="notification-link"
                        >
                            <div
                                className={`notification-item ${
                                    r.status === "new" ? "new" : ""
                                } ${r.status === "rejected" ? "rejected" : ""}`}
                                data-testid="notification-div"
                            >
                                <span>
                                    {r.salesperson.firstname}{" "}
                                    {r.salesperson.lastname}
                                    <br />
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
