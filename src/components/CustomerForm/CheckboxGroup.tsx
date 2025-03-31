import "./CheckboxGroup.css"
import React, {ChangeEvent, Dispatch, FC} from "react";
import {CustomerFormData} from "./CustomerForm";

interface CheckboxGroupProps {
    formData: CustomerFormData;
    setFormData: Dispatch<React.SetStateAction<CustomerFormData>>;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({formData, setFormData}) => {
    const toggleMasterCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            checkboxes: prev.checkboxes.map(option =>
                ({...option, checked: isChecked})
            )
        }));
    };

    const toggleCheckbox = (id: string) => {
        setFormData(prev => ({
            ...prev,
            checkboxes: prev.checkboxes.map(option =>
                option.id === id ? {...option, checked: !option.checked} : option
            )
        }));
    };

    const allSelected = formData.checkboxes.every(option => option.checked);

    return (
        <div className="checkbox-group">
            <div className="master-checkbox-container">
                <label
                    htmlFor="masterCheckbox"
                    onClick={(e) => e.preventDefault()}
                    className="checkbox-label"
                >{allSelected ? "Deselect all" : "Select all"}</label>
                <input
                    type="checkbox"
                    id="masterCheckbox"
                    name="masterCheckbox"
                    className="checkbox-input"
                    checked={allSelected}
                    onChange={toggleMasterCheckbox}
                />
            </div>
            <div className="checkbox-list">
                {formData.checkboxes.map(checkbox => (
                    <div key={checkbox.id} className="checkbox-item">
                        <label
                            htmlFor={checkbox.id}
                            className="checkbox-label"
                            onClick={(e) => e.preventDefault()}
                        >{checkbox.label}</label>
                        <input
                            type="checkbox"
                            id={checkbox.id}
                            name={checkbox.id}
                            className="checkbox-input"
                            checked={checkbox.checked}
                            onChange={() => toggleCheckbox(checkbox.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;