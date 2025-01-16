import { useState } from "react";

export default function ReportsPage() {
    const [reports, setReports] = useState([]); // State to store all submitted reports

    return (
        <div className="reports">
            <h2>Previous Reports</h2>
            {reports.length > 0 ? (
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>
                            <p>Manager: {report.manager}</p>
                            <p>Date/Time: {report.dateTime}</p>
                            <p>Stolen Items: {report.stolenItems}</p>
                            <p>Description: {report.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No reports submitted yet.</p>
            )}
        </div>
    );
}