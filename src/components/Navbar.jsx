import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Typography, ButtonGroup } from '@mui/material';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
    const [user, setUser] = useState(null); // Track if the user is logged in
    const navigate = useNavigate();

    // Fetch logged-in user details from local storage (or server if needed)
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:5000/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    return (
        <AppBar
            position='static'
            className="mx-auto top-0 bg-transparent max-w-[90vw] overflow-y-hidden shadow-lg rounded-lg py-2 px-4 my-4 "
        >
            <Toolbar
                className="flex justify-between items-center"
            >
                {user ? (
                    <>
                        <Typography variant="h6" className='mr-2 text-white'>
                            {user.fullName}
                        </Typography>

                    </>
                ) : (
                    // Left side: Sign-in / Sign-up buttons (if user not logged in)
                    <ButtonGroup variant="contained" className="bg-blue-500 hover:bg-blue-700" color="primary">
                        <Button onClick={() => navigate('/signin')}>Sign In</Button>
                        <Button onClick={() => navigate('/signup')}>Sign Up</Button>
                    </ButtonGroup>
                )}
                {/* Centered Home Icon */}
                <IconButton
                    onClick={() => navigate('/')}
                    className="bg-white rounded-full shadow-md mx-auto hover:bg-gray-200"
                >
                    <Home fontSize="large" className='text-white' />
                </IconButton>

                {/* Right side: Add Ad button (if user is logged in) */}

                {user && (
                    <>

                        <Button
                            variant="contained"
                            color="primary"
                            className="bg-blue-500 hover:bg-blue-700"
                            onClick={() => navigate('/submit-ad')}
                        >
                            Add Real Estate Ad
                        </Button>
                    </>
                )}

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
