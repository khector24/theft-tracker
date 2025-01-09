import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import '../styles/component-styles/theft-report-form.css';

export default function TheftReportForm() {
    const [showPeoplePresent, setShowPeoplePresent] = useState(false);
    const [formData, setFormData] = useState({
        manager: "",
        dateTime: "",
        stolenItems: "",
        witnesses: "",
        peoplePresent: "",
        description: "",
        files: null
    });

    const handleWitnessChange = (event) => {
        const value = event.target.value;

        setFormData({ ...formData, witnesses: value });

        if (value === 'Yes' || value === "Can't tell") {
            setShowPeoplePresent(true);
        } else {
            setShowPeoplePresent(false);
        }
    };

    const handleChange = (event) => {
        setFormData((currData) => {
            return {
                ...currData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Form was submitted! Good job", formData);
        setFormData({
            manager: "",
            dateTime: "",
            stolenItems: "",
            witnesses: "",
            peoplePresent: "",
            description: "",
            files: null
        });
    };

    return (
        <>
            <form className="form" onSubmit={onSubmit}>
                <label htmlFor="">Manager:</label>
                <input
                    type="text"
                    placeholder="Manager Name"
                    name="manager"
                    value={formData.manager}
                    onChange={handleChange}
                    required />

                <label htmlFor="">Date and time of incident:</label>
                <input
                    type="datetime-local"
                    name="dateTime"
                    value={formData.dateTime}
                    onChange={handleChange}
                    required />

                <label htmlFor="">Stolen Items:</label>
                <input
                    placeholder="What items were stolen?"
                    name='stolenItems'
                    value={formData.stolenItems}
                    onChange={handleChange}
                    required />

                <label htmlFor="">Were there any people present/any possible witnesses?</label>
                <div>
                    <input
                        type="radio"
                        id="yes"
                        name="witnesses"
                        value="Yes"
                        onChange={handleWitnessChange}
                        required
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
                        <input
                            name="peoplePresent"
                            value={formData.peoplePresent}
                            onChange={handleChange}
                            placeholder="Name and contact info if available" />
                    </>
                )}

                <label htmlFor="">Description:</label>
                <textarea
                    cols="30"
                    rows="10"
                    placeholder="Please describe in detail the events that occurred."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>

                <label>Upload Images/Videos:</label>
                <input
                    type="file"
                    multiple
                    accept="image/jpeg, video/mp4"
                    onChange={handleChange}
                    required />

                <div className="bottom-buttons">
                    <button type="reset" style={{ backgroundColor: 'white' }}>
                        Cancel
                    </button>
                    <button type="submit" style={{ backgroundColor: '#E73137', color: 'white' }}>
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
}