import { useEffect, useMemo, useState } from "react";
import { getReceipts, type Receipt } from "../model/receipt";
import type { Group } from "../model/group";
import { getAccountant } from "../model/user";

export default function ManagerDashboard() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);

    useEffect(() => {
        setReceipts(getReceipts());
    }, []);

    const groups = useMemo(() => {
        const groups: { [id: number]: Group } = {};

        receipts.forEach((r) => {
            groups[r.salesperson.groupId] ||= {
                title: `Group ${r.salesperson.groupId}`,
                accountant: getAccountant(r.salesperson)!,
                spending: 0,
            };

            groups[r.salesperson.groupId].spending += r.amount;
        });

        return groups;
    }, [receipts]);

    return (
        <div className="manager-dashboard-container">
            <div className="manager-dashboard-card">
                <h2>Dashboard</h2>
                <div className="dashboard-stats">
                    <div className="stat-row-new">
                        <span>New Receipts:</span>
                        <span className="stat-value-new">
                            {receipts.filter((r) => r.status === "new").length}
                        </span>
                    </div>
                    <div className="stat-row">
                        <span>Submitted Receipts:</span>
                        <span>{receipts.length}</span>
                    </div>
                    <div className="stat-row">
                        <span>Accepted Receipts:</span>
                        <span>
                            {
                                receipts.filter((r) => r.status === "approved")
                                    .length
                            }
                        </span>
                    </div>
                    <div className="stat-row">
                        <span>Rejected Receipts:</span>
                        <span>
                            {
                                receipts.filter((r) => r.status === "rejected")
                                    .length
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className="manager-statistics-card">
                {Object.entries(groups).map(([_, g]) => (
                    <div
                        className="manager-statistic-item"
                        key={g.accountant.groupId}
                    >
                        <h3>{g.title}</h3>
                        <p>
                            <strong>Responsible:</strong>{" "}
                            {g.accountant.firstname} {g.accountant.lastname}
                        </p>
                        <p>
                            <strong>Spending this month:</strong> {g.spending}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
