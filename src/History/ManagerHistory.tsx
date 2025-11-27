import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { type Receipt, getReceipts } from "../model/receipt";
import { formatDate } from "../utils";

export default function ManagerHistory() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    useEffect(() => {
        setReceipts(getReceipts());
    }, []);

    return (
        <div className="dashboard-container">
            <div className="notifications-card">
                <h2>Review History</h2>
                <div className="notifications-list">
                    {receipts.map((r) => (
                        <div
                            key={r.id}
                            className={`notification-item ${
                                r.status === "new" ? "new" : ""
                            } ${r.status === "rejected" ? "rejected" : ""}`}
                            data-testid="notification-div"
                        >
                            <span>
                                {r.salesperson.firstname}{" "}
                                {r.salesperson.lastname}
                                <br />
                                {formatDate(r.date)} {r.title}{" "}
                            </span>
                            <CheckCircle
                                size={24}
                                className="icon accepted-icon"
                                data-testid="accepted-icon"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
