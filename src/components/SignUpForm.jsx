import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function for routing

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
                const user = response.data; // Get the user data from the response

                // Save userId or any user identifier to localStorage
                localStorage.setItem('userId', user.id); 

                // Optionally, save full name or any other details to localStorage
                localStorage.setItem('fullName', user.fullName);

                setSuccess(true);
                setError(null);

                // Redirect to the home page
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
            <form
                className="bg-white p-8 rounded-lg shadow-md w-96"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

                {/* Full Name */}
                <TextField
                    label="Full Name"
                    name="fullName"
                    variant="outlined"
                    fullWidth
                    value={formData.fullName}
                    onChange={handleChange}
                    InputProps={{
                        className: "px-2", // Tailwind utility applied to the inner input field
                    }}
                    sx={{
                        marginBottom: 2, // MUI's sx prop for margin
                    }}
                />

                {/* Email */}
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                        className: "px-2", // Applying padding using Tailwind inside the input
                    }}
                    sx={{
                        marginBottom: 2,
                    }}
                />

                {/* Username */}
                <TextField
                    label="Username"
                    name="username"
                    variant="outlined"
                    fullWidth
                    value={formData.username}
                    onChange={handleChange}
                    InputProps={{
                        className: "px-2",
                    }}
                    sx={{
                        marginBottom: 2,
                    }}
                />

                {/* Password */}
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
                    InputProps={{
                        className: "px-2",
                    }}
                    sx={{
                        marginBottom: 2,
                    }}
                />

                {error && <p className="text-red-500 text-center mb-4">{error}</p>} {/* Display error message */}

                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    className="py-2 bg-blue-500 hover:bg-blue-700"
                    type="submit"
                >
                    Sign Up
                </Button>

                <p className="mt-4 text-center">
                    Already have an account? <a href="/signin" className="text-blue-600">Sign In</a>
                </p>
            </form>
        </div>
    );
};

export default SignUpForm;
