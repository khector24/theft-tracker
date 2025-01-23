import "../styles/component-styles/report.css";

export default function Report({ report }) {
    return (
        <div className="report">
            <p>Manager: {report.manager}</p>
            <p>Date/Time: {report.dateTime}</p>
            <p>Stolen Items: {report.stolenItems}</p>
            <p>Witnesses: {report.peoplePresent}</p>
            <p>Description: {report.description}</p>
        </div>
    );
}
