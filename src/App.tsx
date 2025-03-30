import './App.css';
import React from 'react';
import CustomerForm from "./components/CustomerForm/CustomerForm";

function App() {
    return (
        <div className="App">
            <h1 className="app-header">Customer Form</h1>
            <CustomerForm/>
        </div>
    );
}

export default App;