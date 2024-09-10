import React from 'react'
import { TextField, Button } from "@mui/material";

function SignInForm({handleSubmit, formData, handleChange, error}) {
    return (
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
                    className: "px-2",
                }}
                sx={{
                    marginBottom: 2,
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
                Sign In
            </Button>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            <p className="mt-4 text-center">
                Don't have an account? <a href="/signup" className="text-blue-600">Sign Up</a>
            </p>
        </form>
    )
}

export default SignInForm