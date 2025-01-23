import { useState } from "react";
import "../styles/page-styles/reports-page.css"
import Report from "../components/Report";
import { useEffect } from "react";

export default function ReportsPage() {
    // const [reports, setReports] = useState([]); // State to store all submitted reports

    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch("https://sotr0fimkl.execute-api.us-east-1.amazonaws.com/get-reports");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="reports">
            <h2>Previous Reports</h2>
            <div className="reports-container">
                {reports.length > 0 ? (
                    reports.map((report) => <Report key={report.id} report={report} />)
                ) : (
                    <p>No reports submitted yet.</p>
                )}
            </div>
        </div>
    );
}