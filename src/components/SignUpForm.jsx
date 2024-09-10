import React from 'react'
import { TextField, Button } from "@mui/material";


function SignUpForm({handleSubmit, formData, handleChange, error}) {
    return (
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
                    className: "px-2",
                }}
                sx={{
                    marginBottom: 2,
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
                    className: "px-2",
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
    )
}

export default SignUpForm