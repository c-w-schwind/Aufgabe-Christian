import "./CustomerForm.css";
import React, {ChangeEvent, FormEvent, useState} from "react";


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

interface FormData {
    numberInput: number | null;
    textInput: string;
    checkboxes: CheckboxOption[];
}


const CustomerForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        numberInput: null,
        textInput: "",
        checkboxes: [...initialCheckboxOptions]
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "numberInput" ? Number(value) : value
        }));
    };

    const handleCheckboxChange = (id: string) => {
        setFormData(prev => ({
            ...prev,
            checkboxes: prev.checkboxes.map(option =>
                option.id === id ? {...option, checked: !option.checked} : option
            )
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
                    onChange={handleChange}
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
                    onChange={handleChange}
                />
            </div>

            <div className="checkbox-group">
                {formData.checkboxes.map(checkbox => (
                    <div key={checkbox.id} className="checkbox-item">
                        <label htmlFor={checkbox.id} className="checkbox-label">{checkbox.label}</label>
                        <input
                            type="checkbox"
                            id={checkbox.id}
                            name={checkbox.id}
                            className="checkbox-input"
                            checked={checkbox.checked}
                            onChange={() => handleCheckboxChange(checkbox.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="submit-button-container">
                <button type="submit" className="submit-button">Submit</button>
            </div>
        </form>
    );
};

export default CustomerForm;