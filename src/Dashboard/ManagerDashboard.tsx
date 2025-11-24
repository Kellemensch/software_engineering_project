export default function ManagerDashboard() {
    const stats = {
        new: 2,
        submitted: 108,
        accepted: 106,
        rejected: 2,
    };

    const groups = [
        { title: "Group 1", accountant: "John Doe", spending: "€500" },
        { title: "Group 2", accountant: "Lisa Ray", spending: "€800" },
        { title: "Group 3", accountant: "Mark Lee", spending: "€230" },
        { title: "Group 4", accountant: "Sara Kim", spending: "€1020" },
    ];

    return (
        <div className="manager-dashboard-container">

            <div className="manager-dashboard-card">
                <h2>Dashboard</h2>
                <div className="dashboard-stats">
                    <div className="stat-row-new">
                        <span>New Receipts:</span>
                        <span className="stat-value-new">{stats.new}</span>
                    </div>
                    <div className="stat-row">
                        <span>Submitted Receipts:</span>
                        <span>{stats.submitted}</span>
                    </div>
                    <div className="stat-row">
                        <span>Accepted Receipts:</span>
                        <span>{stats.accepted}</span>
                    </div>
                    <div className="stat-row">
                        <span>Rejected Receipts:</span>
                        <span>{stats.rejected}</span>
                    </div>
                </div>
            </div>

            <div className="manager-statistics-card">
                {groups.map((g, i) => (
                    <div className="manager-statistic-item" key={i}>
                        <h3>{g.title}</h3>
                        <p><strong>Responsible:</strong> {g.accountant}</p>
                        <p><strong>Spending this month:</strong> {g.spending}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
