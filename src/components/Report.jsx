import { useState } from "react";
import FileViewer from "./FileViewer";
import "../styles/component-styles/report.css";

export default function Report({ report }) {
    const [showContent, setShowContent] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleShowContent = () => {
        setShowContent(!showContent);
    };

    const handleShowFullDescription = () => {
        setShowFullDescription(!showFullDescription);
    }

    const getShortDescription = (text) => {
        if (!text) return "N/A";
        const sentences = text.split(". ");
        return sentences.length > 4 ? sentences.slice(0, 4).join(". ") + ". " : text;
    }

    return (
        <div className="report">
            <p>Manager: {report.manager}</p>
            <p>Date/Time: {report.dateTime}</p>
            <p>Stolen Items: {report.stolenItemDetails || "N/A"}</p>
            <p>Witnesses: {report.witnessDetails || "N/A"}</p>
            <p>Description: {showFullDescription ? report.description : getShortDescription(report.description)}
                {report.description && report.description.split(". ").length > 4 &&
                    <button className="description-toggle-btn" onClick={handleShowFullDescription}>
                        {showFullDescription ? "Read Less" : "Read More"}
                    </button>
                }
            </p>
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



/*
import { useState } from "react";
import FileViewer from "./FileViewer";
import "../styles/component-styles/report.css";

export default function Report({ report }) {
    const [showContent, setShowContent] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleShowContent = () => {
        setShowContent(!showContent);
    };

    const handleShowFullDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const getShortDescription = (text) => {
        if (!text) return "N/A";
        const sentences = text.split(". "); // Split by period and space to get sentences
        return sentences.length > 4 ? sentences.slice(0, 4).join(". ") + "." : text;
    };

    return (
        <div className="report">
            <p>Manager: {report.manager}</p>
            <p>Date/Time: {report.dateTime}</p>
            <p>Stolen Items: {report.stolenItemDetails || "N/A"}</p>
            <p>Witnesses: {report.witnessDetails || "N/A"}</p>
            <p>
                Description: {showFullDescription ? report.description : getShortDescription(report.description)}
                {report.description && report.description.split(". ").length > 4 && (
                    <button className="show-more-btn" onClick={handleShowFullDescription}>
                        {showFullDescription ? " Show Less" : " ..."}
                    </button>
                )}
            </p>
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
*/