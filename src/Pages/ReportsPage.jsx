import { useState } from "react";
import "../styles/page-styles/reports-page.css"
import Report from "../components/Report";

export default function ReportsPage() {
    // const [reports, setReports] = useState([]); // State to store all submitted reports

    const [reports, setReports] = useState([
        {
            id: "1",
            manager: "Ethan Blackwell",
            dateTime: "2024-01-08T14:30",
            stolenItems: "Laptop, Phone",
            witnesses: "Anna Grey",
            description: "A black Dell laptop and a Samsung Galaxy phone were stolen from an open office desk on the second floor. The theft is believed to have occurred during the lunch break when the area was unattended. Security footage from nearby cameras is being reviewed to identify potential suspects.",
        },
        {
            id: "2",
            manager: "Sophia Trenton",
            dateTime: "2024-01-07T10:00",
            stolenItems: "Wallet",
            witnesses: "Mark Stevens",
            description: "An employee's wallet containing cash, credit cards, and personal identification was taken from a secured locker in the break room. The locker appeared to have been forced open with a sharp object. The incident happened during the morning shift, and multiple employees were in the vicinity at the time.",
        },
        {
            id: "3",
            manager: "Isaac Cromwell",
            dateTime: "2024-01-06T18:45",
            stolenItems: "Office Chair",
            witnesses: "Peter Connors",
            description: "A premium ergonomic office chair was reported missing from the manager's cabin. The chair is valued at approximately $800. It was last seen during a late evening meeting, and no unauthorized access to the office was recorded. The investigation is ongoing to determine how the item was removed.",
        },
        {
            id: "4",
            manager: "Quincy Harlow",
            dateTime: "2024-01-05T09:15",
            stolenItems: "External Hard Drive",
            witnesses: "Emily Vargas",
            description: "A 2TB external hard drive containing sensitive project files was taken from the IT department. The hard drive was on a desk near the window, which was found slightly ajar. This raises concerns about external intrusion or an internal breach. Immediate measures are being taken to secure digital assets.",
        },
        {
            id: "5",
            manager: "Dominic Porter",
            dateTime: "2024-01-04T12:30",
            stolenItems: "Company Tablet",
            witnesses: "Lisa Hall",
            description: "A company-issued tablet, used for inventory management, went missing from the warehouse. The device was last seen on a charging station near the entry point. The theft was discovered during a routine inventory check. Access logs for the warehouse are being analyzed to identify any irregularities.",
        },
        {
            id: "6",
            manager: "Michael Ellison",
            dateTime: "2024-01-03T16:20",
            stolenItems: "Projector",
            witnesses: "James Lee",
            description: "A high-end projector was stolen from the conference room on the ground floor. The room was left unlocked after a meeting concluded earlier in the afternoon. Witnesses reported seeing an unfamiliar individual carrying a large bag near the area around the time of the theft.",
        },
        {
            id: 7,
            manager: "Ethan Blackwell",
            dateTime: "2024-01-08T14:30",
            stolenItems: "Dell XPS 15 Laptop, iPhone 13 Pro",
            witnesses: "Jane Doe, Security Officer Michael Clark",
            description: "The items were reported missing from an unlocked desk drawer in the IT department. Security footage shows an unidentified individual entering the room during lunch hours.",
        },
        {
            id: 8,
            manager: "Sophia Trenton",
            dateTime: "2024-01-07T10:00",
            stolenItems: "Leather Wallet containing credit cards and ID",
            witnesses: "None",
            description: "The wallet was taken from a locked locker in the employee break room. There are no security cameras in the area, and no witnesses reported unusual activity.",
        },
        {
            id: 9,
            manager: "Isaac Cromwell",
            dateTime: "2024-01-06T16:45",
            stolenItems: "Canon EOS R5 Camera, 24-70mm Lens",
            witnesses: "Sam Green, Event Photographer",
            description: "The camera was stolen during a company event held in the auditorium. Witnesses recall seeing a suspicious person loitering near the equipment table before the theft.",
        },
        {
            id: 10,
            manager: "Quincy Harlow",
            dateTime: "2024-01-09T08:15",
            stolenItems: "Company Credit Card, USB Flash Drive",
            witnesses: "Nina Brown, Alex White",
            description: "The items were taken from a locked briefcase left unattended in the meeting room. Witnesses saw someone matching the suspect's description leaving the area hastily.",
        },
        {
            id: 11,
            manager: "Dominic Porter",
            dateTime: "2024-01-07T20:00",
            stolenItems: "Gaming Laptop, External Hard Drive",
            witnesses: "Security Camera Footage Only",
            description: "The stolen laptop and hard drive were part of the gaming event setup. Security footage revealed a person tampering with the setup area shortly after the event ended.",
        },
        {
            id: 12,
            manager: "Michael Ellison",
            dateTime: "2024-01-08T11:20",
            stolenItems: "Set of Office Keys",
            witnesses: "CCTV Footage Captured Suspect",
            description: "The office keys were removed from the reception desk. The suspect was seen on CCTV accessing restricted areas shortly after obtaining the keys.",
        },
    ]);



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