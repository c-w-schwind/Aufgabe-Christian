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
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState<CustomerFormData>({
        numberInput: null,
        textInput: "",
        checkboxes: [...initialCheckboxOptions]
    });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setErrors(prev => ({...prev, [name]: ""}));
        setFormData(prev => ({
            ...prev,
            [name]: name === "numberInput"
                ? value === "" ? null : Number(value)
                : value
        }));
    };

    const validateForm = (): boolean => {
        setErrors({});
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

        setTimeout(() => setErrors(collectedErrors), 50); // Force re-rendering of error messages, drawing user attention
        return Object.keys(collectedErrors).length === 0;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (validateForm() && window.confirm("Are you sure you want to submit?")) {
            console.log("Submitted data: ", formData);
            setFormData({
                numberInput: null,
                textInput: "",
                checkboxes: [...initialCheckboxOptions]
            });
        }
    };

    const handleShowData = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Current form data:", formData);

        const selectedOptions = formData.checkboxes
            .filter(option => option.checked)
            .map(option => `- ${option.label}`)
            .join('\n');

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
                    {errors.numberInput && <div className="error-message">{errors.numberInput}</div>}
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
                    {errors.textInput && <div className="error-message">{errors.textInput}</div>}
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
                    {errors.checkboxes && <div className="error-message">{errors.checkboxes}</div>}
                </div>
                <CheckboxGroup
                    formData={formData}
                    setFormData={setFormData}
                    setErrors={setErrors}
                />
            </div>

            <div className="button-container">
                <button type="button" className="secondary" onClick={handleShowData}>Show Data</button>
                <button type="submit" className="primary">Submit</button>
            </div>
        </form>
    );
};

export default CustomerForm;