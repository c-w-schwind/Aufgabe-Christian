import "./CustomerForm.css";
import React, {ChangeEvent, FormEvent, useState} from "react";
import CheckboxGroup from "./CheckboxGroup";


interface CheckboxOption {
    id: string;
    label: string;
    checked: boolean;
}

const initialCheckboxOptions: CheckboxOption[] = [
    {id: "option1", label: "First Option", checked: false},
    {id: "option2", label: "Second Option", checked: false},
    {id: "option3", label: "Third Option", checked: false},
];

export interface CustomerFormData {
    numberInput: number | null;
    textInput: string;
    checkboxes: CheckboxOption[];
}


const CustomerForm: React.FC = () => {
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
    const [submissionError, setSubmissionError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<CustomerFormData>({
        numberInput: null,
        textInput: "",
        checkboxes: [...initialCheckboxOptions]
    });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormErrors(prev => ({...prev, [name]: ""}));
        setFormData(prev => ({
            ...prev,
            [name]: name === "numberInput"
                ? value === "" ? null : Number(value)
                : value
        }));
    };

    const validateForm = (): boolean => {
        setFormErrors({});
        const collectedErrors: { [key: string]: string } = {};

        if (!formData.textInput.trim()) {
            collectedErrors.textInput = "You must provide some text.";
        }

        if (formData.numberInput === null) {
            collectedErrors.numberInput = "You must provide a number.";
        } else if (isNaN(formData.numberInput)) {
            collectedErrors.numberInput = "Please provide a valid number.";
        }

        if (formData.checkboxes.filter(option => option.checked).length === 0) {
            collectedErrors.checkboxes = "At least one option must be selected.";
        }

        setTimeout(() => setFormErrors(collectedErrors), 50); // Force re-rendering of error messages, drawing user attention
        return Object.keys(collectedErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmissionError("");
        if (validateForm() && window.confirm("Are you sure you want to submit?")) {
            setIsSubmitting(true);
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: {
                        //"Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    if (response.status === 401) {
                        throw new Error("Unauthorized: Your session might have expired. Please log in again.");
                    } else if (response.status === 500) {
                        throw new Error("Server Error: There was a problem on our end. Please try again later.");
                    } else {
                        throw new Error(errorText || `Failed to submit data: Received status ${response.status}.`);
                    }
                }

                const data = await response.json();
                console.log("Submit successful:", data);
                setFormData({
                    numberInput: null,
                    textInput: "",
                    checkboxes: [...initialCheckboxOptions]
                });
            } catch (err: unknown) {
                let errorMessage = "Error: There was a problem submitting your data. Please try again.";
                if (err instanceof Error) {
                    console.error("Fetch operation failed:", err.message);
                    if (err.message.includes("Unauthorized")) {
                        errorMessage = "Unauthorized: Your session might have expired. Please log in again.";
                    } else if (err.message.includes("Server Error")) {
                        errorMessage = "Server Error: There was a problem on our end. Please try again later.";
                    } else if (err.message.includes("Failed to fetch")) {
                        errorMessage =
                            "Network Error: Could not connect to the server. Check your internet connection and try again.";
                    }
                } else {
                    console.error("Unknown error type:", err);
                }
                setSubmissionError(errorMessage);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleShowData = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Current form data:", formData);

        const selectedOptions = formData.checkboxes
            .filter(option => option.checked)
            .map(option => `- ${option.label}`)
            .join("\n");

        const message = `Your current form inputs are:\n
Number: ${formData.numberInput ?? "Not provided"}
Text: ${formData.textInput || "Not provided"}
Selected Options:
${selectedOptions || "- None selected"}`;
        alert(message);
    };


    return (
        <form onSubmit={handleSubmit} className="customer-form">
            <div className="form-field">
                <div className="field-header">
                    <label htmlFor="numberInput" className="form-label">Your Number</label>
                    {formErrors.numberInput && <div className="error-message">{formErrors.numberInput}</div>}
                </div>
                <input
                    type="number"
                    id="numberInput"
                    name="numberInput"
                    className="form-input"
                    value={formData.numberInput === null ? "" : formData.numberInput}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-field">
                <div className="field-header">
                    <label htmlFor="textInput" className="form-label">Your Text</label>
                    {formErrors.textInput && <div className="error-message">{formErrors.textInput}</div>}
                </div>
                <input
                    type="text"
                    id="textInput"
                    name="textInput"
                    className="form-input"
                    value={formData.textInput}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-field">
                <div className="field-header">
                    <label htmlFor="checkboxOptions" className="form-label">Your Options</label>
                    {formErrors.checkboxes && <div className="error-message">{formErrors.checkboxes}</div>}
                </div>
                <CheckboxGroup
                    formData={formData}
                    setFormData={setFormData}
                    setErrors={setFormErrors}
                />
            </div>

            <div className="button-container">
                <button type="button" className="secondary" onClick={handleShowData}>Show Data</button>
                <button type="submit" className="primary" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</button>
            </div>

            {submissionError && (<div className="submission-error">{submissionError}</div>)}
        </form>
    );
};

export default CustomerForm;