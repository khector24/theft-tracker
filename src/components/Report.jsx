import { useState } from "react";
import "../styles/component-styles/report.css";

export default function Report({ report }) {
    const [showContent, setShowContent] = useState(false);

    const handleShowContent = () => {
        setShowContent(!showContent);
    };

    const renderFile = (fileUrl) => {
        // Ensure fileUrl is valid before splitting
        if (!fileUrl) {
            return <p>Invalid file URL</p>;
        }

        // Check if the file is an image or video
        const fileType = fileUrl.split('.').pop().toLowerCase();
        const isVideo = fileType === 'mp4' || fileType === 'mov' || fileType === 'avi';

        return (
            <div className="file-item" key={fileUrl}>
                {isVideo ? (
                    <div className="video-container">
                        <video src={fileUrl} controls className="file-video">
                            Your browser does not support the video tag.
                        </video>
                        <div className="play-overlay">
                            <button className="play-button">▶</button>
                        </div>
                    </div>
                ) : (
                    <img src={fileUrl} alt="Report" className="file-image" />
                )}
            </div>
        );
    };

    // Render the entire report
    return (
        <div className="report">
            <p>Manager: {report.manager}</p>
            <p>Date/Time: {report.dateTime}</p>
            <p>Stolen Items: {report.stolenItemDetails || "N/A"}</p>
            <p>Witnesses: {report.witnessDetails}</p>
            <p>Description: {report.description}</p>
            <button onClick={handleShowContent}>Show Images/Videos</button>
            {
                showContent &&
                <div className="report-files">
                    {report.files && report.files.length > 0 ? (
                        report.files.map((file, index) => renderFile(file))
                    ) : (
                        <p>No files available</p>
                    )}
                </div>
            }
        </div>
    );
}





// import "../styles/component-styles/report.css";

// export default function Report({ report }) {
//     return (
//         <div className="report">
//             <p>Manager: {report.manager}</p>
//             <p>Date/Time: {report.dateTime}</p>
//             <p>Stolen Items: {report.stolenItemDetails}</p>
//             <p>Witnesses: {report.witnessDetails}</p>
//             <p>Description: {report.description}</p>
//         </div>
//     );
// }
