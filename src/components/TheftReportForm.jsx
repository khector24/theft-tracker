import { useState } from 'react';
import '../styles/component-styles/theft-report-form.css';

export default function TheftReportForm() {
    const [showPeoplePresent, setShowPeoplePresent] = useState(false);

    const handleWitnessChange = (event) => {
        const value = event.target.value;
        // Show the "People Present" section for "Yes" or "Can't tell"
        if (value === 'Yes' || value === "Can't tell") {
            setShowPeoplePresent(true);
        } else {
            setShowPeoplePresent(false);
        }
    };

    return (
        <>
            <div className="form">
                <label htmlFor="">Manager:</label>
                <input type="text" placeholder="Manager Name" />

                <label htmlFor="">Date and time of incident:</label>
                <input type="datetime-local" />

                <label htmlFor="">Stolen Items:</label>
                <input placeholder="What items were stolen?" />

                <label htmlFor="">Were there any people present/any possible witnesses?</label>
                <div>
                    <input
                        type="radio"
                        id="yes"
                        name="witnesses"
                        value="Yes"
                        onChange={handleWitnessChange}
                    />
                    <label htmlFor="yes">Yes</label>

                    <input
                        type="radio"
                        id="no"
                        name="witnesses"
                        value="No"
                        onChange={handleWitnessChange}
                    />
                    <label htmlFor="no">No</label>

                    <input
                        type="radio"
                        id="cant-tell"
                        name="witnesses"
                        value="Can't tell"
                        onChange={handleWitnessChange}
                    />
                    <label htmlFor="cant-tell">Cannot tell</label>
                </div>

                {showPeoplePresent && (
                    <>
                        <label htmlFor="">People Present:</label>
                        <input placeholder="Name and contact info if available" />
                    </>
                )}

                <label htmlFor="">Description:</label>
                <textarea
                    cols="30"
                    rows="10"
                    placeholder="Please describe in detail the events that occurred."
                ></textarea>

                <label>Upload Images/Videos:</label>
                <input type="file" multiple accept="image/jpeg, video/mp4" />

                <div className="bottom-buttons">
                    <button type="reset" style={{ backgroundColor: 'white' }}>
                        Cancel
                    </button>
                    <button type="submit" style={{ backgroundColor: '#E73137', color: 'white' }}>
                        Submit
                    </button>
                </div>
            </div>
        </>
    );
}