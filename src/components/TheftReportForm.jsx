import { useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import '../styles/component-styles/theft-report-form.css';

export default function TheftReportForm() {
    const fileInputRef = useRef(null);
    const [notification, setNotification] = useState({
        message: "",
        type: ""
    });
    const [showPeoplePresent, setShowPeoplePresent] = useState(false);
    const [showStolenItems, setShowStolenItems] = useState(false);
    const [formData, setFormData] = useState({
        manager: "",
        dateTime: "",
        items: "",
        stolenItems: "",
        witnesses: "",
        peoplePresent: "",
        description: "",
        files: []
    });

    const hideNotificationAfterDelay = () => {
        setTimeout(() => {
            setNotification({ message: "", type: "" });
        }, 5000);
    }

    const handleWitnessChange = (event) => {
        const value = event.target.value;
        setFormData({ ...formData, witnesses: value });
        setShowPeoplePresent(value === 'Yes' || value === "Can't tell");
    };

    const handleStolenItems = (event) => {
        const value = event.target.value;
        setFormData({ ...formData, stolenItems: value });
        setShowStolenItems(value === "Yes" || value === "Can't tell")
    };

    const handleChange = (event) => {
        setFormData((currData) => ({
            ...currData,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFileChange = (event) => {
        const filesArray = Array.from(event.target.files);
        setFormData({ ...formData, files: filesArray });
    };

    const handleCancel = () => {
        setNotification({ message: "Form successfully reset!", type: "success" })
        hideNotificationAfterDelay();

        setFormData({
            manager: "",
            dateTime: "",
            items: "",
            stolenItems: "",
            witnesses: "",
            peoplePresent: "",
            description: "",
            files: []
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();

        setNotification({ message: "Form was submitted! Good job", type: "success" });
        hideNotificationAfterDelay();

        console.log("Form was submitted! Good job", formData);
        setFormData({
            manager: "",
            dateTime: "",
            items: "",
            stolenItems: "",
            witnesses: "",
            peoplePresent: "",
            description: "",
            files: []
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return (
        <form className="form" onSubmit={onSubmit}>
            {notification.message && (
                <p className={`notification ${notification.type}`}>
                    {notification.message}
                </p>
            )}

            <label htmlFor="manager">Manager:</label>
            <input
                id="manager"
                type="text"
                placeholder="Manager Name"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                required
            />

            <label htmlFor="dateTime">Date and time of incident:</label>
            <input
                id="dateTime"
                type="datetime-local"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                required
            />

            <label>Are there any stolen items?</label>
            <div>
                <input
                    id="yes"
                    type="radio"
                    name="stolenItems"
                    value="Yes"
                    onChange={handleStolenItems}
                    checked={formData.stolenItems === "Yes"}
                    required
                />
                <label htmlFor="yes">Yes</label>

                <input
                    id="no"
                    type="radio"
                    name="stolenItems"
                    value="No"
                    onChange={handleStolenItems}
                    checked={formData.stolenItems === "No"}
                />
                <label htmlFor="no">No</label>

                <input
                    id="cant-tell"
                    type="radio"
                    name="stolenItems"
                    value="Can't tell"
                    onChange={handleStolenItems}
                    checked={formData.stolenItems === "Can't tell"}
                />
                <label htmlFor="cant-tell">Cannot tell</label>
            </div>

            {
                showStolenItems && (
                    <>
                        <label htmlFor="stolenItems">Stolen Items:</label>
                        <input
                            id="items"
                            placeholder="What items were stolen?"
                            name="items"
                            value={formData.items}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

            <label>Were there any people present/any possible witnesses?</label>
            <div>
                <input
                    id="yes"
                    type="radio"
                    name="witnesses"
                    value="Yes"
                    onChange={handleWitnessChange}
                    checked={formData.witnesses === "Yes"}
                    required
                />
                <label htmlFor="yes">Yes</label>

                <input
                    id="no"
                    type="radio"
                    name="witnesses"
                    value="No"
                    onChange={handleWitnessChange}
                    checked={formData.witnesses === "No"}
                />
                <label htmlFor="no">No</label>

                <input
                    id="cant-tell"
                    type="radio"
                    name="witnesses"
                    value="Can't tell"
                    onChange={handleWitnessChange}
                    checked={formData.witnesses === "Can't tell"}
                />
                <label htmlFor="cant-tell">Cannot tell</label>

            </div>

            {showPeoplePresent && (
                <>
                    <label htmlFor="peoplePresent">People Present:</label>
                    <input
                        id="peoplePresent"
                        name="peoplePresent"
                        value={formData.peoplePresent}
                        onChange={handleChange}
                        placeholder="Name and contact info if available"
                    />
                </>
            )}

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                cols="30"
                rows="10"
                placeholder="Please describe in detail the events that occurred."
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
            ></textarea>

            <label htmlFor="files">Upload Images/Videos:</label>
            <input
                id="files"
                type="file"
                multiple
                accept="image/jpeg, video/mp4"
                ref={fileInputRef}
                onChange={handleFileChange}
                required
            />

            <div className="form-bottom">
                <button type="reset" onClick={handleCancel} style={{ backgroundColor: 'white' }}>
                    Cancel
                </button>
                <button type="submit" style={{ backgroundColor: '#E73137', color: 'white' }}>
                    Submit
                </button>
            </div>
        </form>
    );
}