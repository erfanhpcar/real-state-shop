import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
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
            <form
                className="bg-white p-8 rounded-lg shadow-md w-96"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    value={formData.username}
                    onChange={handleChange}
                    InputProps={{
                        className: "px-2", // Tailwind utility applied to the inner input field
                    }}
                    sx={{
                        marginBottom: 2, // MUI's sx prop for margin
                    }}
                />

                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                        className: "px-2", // Tailwind utility applied to the inner input field
                    }}
                    sx={{
                        marginBottom: 2, // MUI's sx prop for margin
                    }}
                />

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="py-2 bg-blue-500 hover:bg-blue-700"
                    type="submit"
                >
                    Sign In
                </Button>

                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <p className="mt-4 text-center">
                    Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
                </p>
            </form>
        </div>
    );
};

export default SignInForm;
