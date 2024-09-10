import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/users', formData); // Use your signup endpoint
            if (response.status === 201) {
                const user = response.data; 

                
                localStorage.setItem('userId', user.id); 

                
                localStorage.setItem('fullName', user.fullName);

                setSuccess(true);
                setError(null);

                
                navigate('/');
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            setError(error.message);
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <SignUpForm handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} error={error}/>
        </div>
    );
};

export default SignUp;
