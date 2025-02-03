import "../styles/component-styles/report.css";


export default function FileViewer({ fileUrl }) {
    if (!fileUrl) {
        return <p>Invalid file URL</p>;
    }

    const fileType = fileUrl.split(".").pop().toLowerCase();
    const isVideo = fileType === 'mp4' || fileType === 'mov' || fileType === 'avi';

    return (
        <div className="file-item">
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                {isVideo ? (
                    <div className="video-container">
                        <video src={fileUrl} controls className="file-video">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <img src={fileUrl} alt="Report" className="file-image" />
                )}
            </a>
        </div>
    );
}