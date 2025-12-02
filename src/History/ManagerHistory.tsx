import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { type Receipt, getReceipts } from "../model/receipt";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";

export default function ManagerHistory() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    useEffect(() => {
        setReceipts(getReceipts());
    }, []);

    return (
        <div className="dashboard-container">
            <div className="notifications-card">
                <h2>Manager History</h2>
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

                                <CheckCircle
                                    size={24}
                                    className="icon accepted-icon"
                                    data-testid="accepted-icon"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
