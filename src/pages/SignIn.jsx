import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignInForm from "../components/SignInForm";

const SignIn = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState('');
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
            // Fetch all users
            const response = await axios.get('http://localhost:5000/users');
            const users = response.data;
        
            // Find user matching the provided username
            const user = users.find(user => user.username === formData.username);
        
            if (user) {
              // Check password
              if (user.password === formData.password) {
                // Store user data in localStorage
                localStorage.setItem('userId', user.id); // Store userId or any other identifier

                setSuccess(true);
                setError(null);  // Clear any previous error messages
                navigate("/");
              } else {
                // Password is incorrect
                setSuccess(false);
                setError("Password is incorrect.");
              }
            } else {
              // Username not found
              setSuccess(false);
              setError("Username not found.");
            }
          } catch (error) {
            // Handle request errors
            setSuccess(false);
            setError("An error occurred while trying to log in.");
            console.error('Login error:', error);
          }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <SignInForm handleSubmit={handleSubmit} formData={formData} handleChange={handleChange} error={error} />
        </div>
    );
};

export default SignIn;
