import { useState } from "react";
import FileViewer from "./FileViewer";
import "../styles/component-styles/report.css";

export default function Report({ report }) {
    const [showContent, setShowContent] = useState(false);

    const handleShowContent = () => {
        setShowContent(!showContent);
    };

    return (
        <div className="report">
            <p>Manager: {report.manager}</p>
            <p>Date/Time: {report.dateTime}</p>
            <p>Stolen Items: {report.stolenItemDetails || "N/A"}</p>
            <p>Witnesses: {report.witnessDetails || "N/A"}</p>
            <p>Description: {report.description || "N/A"}</p>
            <button onClick={handleShowContent}>{showContent ? "Hide Images/Videos" : "Show Images/Videos"}</button>
            {
                showContent &&
                <div className="report-files">
                    {report.files && report.files.length > 0 ? (
                        report.files.map((file) => <FileViewer key={file} fileUrl={file} />)
                    ) : (
                        <p>No files available</p>
                    )}
                </div>
            }
        </div>
    );
}

