import "./CustomerForm.css";
import React, {ChangeEvent, FormEvent, useState} from "react";

interface FormData {
    numberInput: number | null;
    textInput: string;
}

const CustomerForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({numberInput: null, textInput: ""});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "numberInput" ? Number(value) : value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("Submitted data: ", formData);
        setFormData({numberInput: null, textInput: ""});
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
            <div className="submit-button-container">
                <button type="submit" className="submit-button">Submit</button>
            </div>
        </form>
    );
};

export default CustomerForm;