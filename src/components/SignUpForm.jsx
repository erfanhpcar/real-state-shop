import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            if (response.status === 201) {
                setSuccess(true);
                setError(null);
                console.log('Registration successful:', response.data);
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
