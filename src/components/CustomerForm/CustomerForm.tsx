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
    const [formData, setFormData] = useState<CustomerFormData>({
        numberInput: null,
        textInput: "",
        checkboxes: [...initialCheckboxOptions]
    });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "numberInput"
                ? value === "" ? null : Number(value)
                : value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to submit?")) {
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
                <label htmlFor="numberInput" className="form-label">Your Number</label>
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
                <label htmlFor="textInput" className="form-label">Your Text</label>
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
                <label htmlFor="checkboxOptions" className="form-label">Your Options</label>
                <CheckboxGroup formData={formData} setFormData={setFormData}/>
            </div>

            <div className="button-container">
                <button type="button" className="secondary" onClick={handleShowData}>Show Data</button>
                <button type="submit" className="primary">Submit</button>
            </div>
        </form>
    );
};

export default CustomerForm;