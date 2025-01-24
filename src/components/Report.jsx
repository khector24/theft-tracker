import "../styles/component-styles/report.css";

export default function Report({ report }) {
    return (
        <div className="report">
            <p>Manager: {report.manager}</p>
            <p>Date/Time: {report.dateTime}</p>
            <p>Stolen Items: {report.stolenItemDetails}</p>
            <p>Witnesses: {report.witnessDetails}</p>
            <p>Description: {report.description}</p>
        </div>
    );
}
