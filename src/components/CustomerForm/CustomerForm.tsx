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
        console.log("Submitted data: ", formData);
        setFormData({
            numberInput: null,
            textInput: "",
            checkboxes: [...initialCheckboxOptions]
        });
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

            <CheckboxGroup formData={formData} setFormData={setFormData}/>

            <div className="submit-button-container">
                <button type="submit" className="submit-button">Submit</button>
            </div>
        </form>
    );
};

export default CustomerForm;