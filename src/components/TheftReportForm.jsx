import { useState, useRef } from 'react';
import '../styles/component-styles/theft-report-form.css';

export default function TheftReportForm() {
    const fileInputRef = useRef(null);
    const [notification, setNotification] = useState({
        message: "",
        type: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPeoplePresent, setShowPeoplePresent] = useState(false);
    const [showStolenItems, setShowStolenItems] = useState(false);
    const [formData, setFormData] = useState({
        manager: "",
        dateTime: "",
        stolenItemDetails: "",
        stolenItemStatus: "",
        witnessStatus: "",
        witnessDetails: "",
        location: "",
        priority: "",
        description: "",
        files: []
    });

    const hideNotificationAfterDelay = () => {
        setTimeout(() => {
            setNotification({ message: "", type: "" });
        }, 5000);
    }

    const handleButtonClick = (event) => {
        const button = event.target;
        button.classList.add("button-clicked");

        setTimeout(() => {
            button.classList.remove("button-clicked");
        }, 200); // Remove the class after 200ms
    };


    const handleWitnessChange = (event) => {
        const value = event.target.value;
        setFormData({ ...formData, witnessStatus: value });
        setShowPeoplePresent(value === 'Yes' || value === "Can't tell");
    };

    const handleStolenItems = (event) => {
        const value = event.target.value;
        setFormData({ ...formData, stolenItemStatus: value });
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
            stolenItemDetails: "",
            stolenItemStatus: "",
            witnessStatus: "",
            witnessDetails: "",
            location: "",
            priority: "",
            description: "",
            files: []
        });

        setShowPeoplePresent(false);
        setShowStolenItems(false);

        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    }

    const getUploadUrl = async (file) => {
        const response = await fetch("https://sotr0fimkl.execute-api.us-east-1.amazonaws.com/get-upload-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName: file.name, fileType: file.type })
        });

        if (!response.ok) throw new Error("Failed to get upload URL");
        return response.json(); // { uploadUrl, fileKey }
    };

    const uploadFileToS3 = async (file, uploadUrl) => {
        const response = await fetch(uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file
        });

        if (!response.ok) throw new Error("Failed to upload file to S3");
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const BUCKET_NAME = "theft-report-files";

        try {
            // Step 1: Get pre-signed URLs for each file
            const uploadedFiles = await Promise.all(
                formData.files.map(async (file) => {
                    const { uploadUrl, fileKey } = await getUploadUrl(file);
                    await uploadFileToS3(file, uploadUrl);
                    return `https://${BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
                })
            );

            // Step 2: Submit form data with uploaded file URLs
            const apiUrl = "https://sotr0fimkl.execute-api.us-east-1.amazonaws.com/submit-report";
            const { files, ...restFormData } = formData;

            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...restFormData, files: uploadedFiles })
            });

            if (!response.ok) throw new Error("Failed to submit report");

            setNotification({ message: "Report submitted successfully!", type: "success" });
            setFormData({
                manager: "",
                dateTime: "",
                stolenItemDetails: "",
                stolenItemStatus: "",
                witnessStatus: "",
                witnessDetails: "",
                location: "",
                priority: "",
                description: "",
                files: []
            });

            setShowPeoplePresent(false);
            setShowStolenItems(false);

            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            setNotification({ message: "Error submitting report. Please try again.", type: "error" });

        } finally {
            setIsSubmitting(false);
            hideNotificationAfterDelay();
        }
    };


    return (
        <form className="form" onSubmit={onSubmit}>
            <h2>New Report</h2>
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
                    id="stolen-yes"
                    type="radio"
                    name="stolenItemStatus"
                    value="Yes"
                    onChange={handleStolenItems}
                    checked={formData.stolenItemStatus === "Yes"}
                    required
                />
                <label htmlFor="stolen-yes">Yes</label>

                <input
                    id="stolen-no"
                    type="radio"
                    name="stolenItemStatus"
                    value="No"
                    onChange={handleStolenItems}
                    checked={formData.stolenItemStatus === "No"}
                />
                <label htmlFor="stolen-no">No</label>

                <input
                    id="stolen-cant-tell"
                    type="radio"
                    name="stolenItemStatus"
                    value="Can't tell"
                    onChange={handleStolenItems}
                    checked={formData.stolenItemStatus === "Can't tell"}
                />
                <label htmlFor="stolen-cant-tell">Cannot tell</label>
            </div>

            {showStolenItems && (
                <div className='stolen-items-container'>
                    <label htmlFor="stolenItemDetails">Stolen Items:</label>
                    <textarea
                        id="stolenItemDetails"
                        placeholder="What items were stolen? Description and Quantity. Ex: 3 Yeti mugs, 1 screw driver"
                        name="stolenItemDetails"
                        value={formData.stolenItemDetails}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
            )}

            <label>Were there any people present/any possible witnesses?</label>
            <div>
                <input
                    id="witness-yes"
                    type="radio"
                    name="witnessStatus"
                    value="Yes"
                    onChange={handleWitnessChange}
                    checked={formData.witnessStatus === "Yes"}
                    required
                />
                <label htmlFor="witness-yes">Yes</label>

                <input
                    id="witness-no"
                    type="radio"
                    name="witnessStatus"
                    value="No"
                    onChange={handleWitnessChange}
                    checked={formData.witnessStatus === "No"}
                />
                <label htmlFor="witness-no">No</label>

                <input
                    id="witness-cant-tell"
                    type="radio"
                    name="witnessStatus"
                    value="Can't tell"
                    onChange={handleWitnessChange}
                    checked={formData.witnessStatus === "Can't tell"}
                />
                <label htmlFor="witness-cant-tell">Cannot tell</label>

            </div>

            {
                showPeoplePresent && (
                    <div className='witnesses-container'>
                        <label htmlFor="witnessDetails">People Present:</label>
                        <textarea
                            id="witnessDetails"
                            name="witnessDetails"
                            value={formData.witnessDetails}
                            onChange={handleChange}
                            placeholder="Name and contact info if available. Ex: Marc Johnson: 901-652-1325, Emmit Smith: 845-621-1234"
                        ></textarea>
                    </div>
                )
            }

            <label htmlFor="location">Location:</label>
            <input
                id="location"
                type="text"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
            />

            <div>
                <label htmlFor="priority">Priority:</label>
                <select
                    name="priority"
                    id="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>

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
                <button type="reset" onClick={(e) => { handleCancel(); handleButtonClick(e); }} >
                    Cancel
                </button>
                <button type="submit" disabled={isSubmitting} onClick={handleButtonClick} style={{ backgroundColor: '#E73137', color: 'white' }}>
                    {isSubmitting ? (
                        <span className="spinner blink-animation">Submitting...</span>
                    ) : (
                        "Submit"
                    )}
                </button>
            </div>
        </form >
    );
}