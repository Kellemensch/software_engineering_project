export default function History() {
    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <h2>Dashboard</h2>
                <div className="dashboard-stats">
                <div className="stat-row">
                    <span>Submitted Receipts:</span>
                    <span className="stat-value"></span>
                </div>
                <div className="stat-row">
                    <span>Accepted Receipts:</span>
                    <span className="stat-value"></span>
                </div>
                    <div className="stat-row">
                        <span>Rejected Receipts:</span>
                        <span className="stat-value"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}