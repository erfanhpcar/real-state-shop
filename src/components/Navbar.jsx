import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Box, Typography, ButtonGroup, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Home, ExitToApp, Menu as MenuIcon } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
    const [user, setUser] = useState(null); 
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:5000/users/${userId}`)
                .then(response => setUser(response.data))
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, []);

    const handleLogout = () => {
        
        localStorage.removeItem('userId');
        setUser(null); 
        navigate('/signin');  
    };

    const toggleDrawer = (open) => () => {
        setIsDrawerOpen(open);
    };

    return (
        <AppBar
            position="static"
            className="bg-transparent md:!w-[90vw]  mx-auto shadow-lg md:rounded-lg py-2 px-4 mb-4"
        >
            <Toolbar className="flex justify-between items-center">
                
                 {/* Desktop View: Full Name and Logout Icon */}
                 <Box className="hidden md:flex" alignItems="center">
                    {user && (
                        <>
                            <IconButton
                                onClick={handleLogout}
                                className="hover:bg-gray-100"
                            >
                                <ExitToApp fontSize="large" className="text-red-500" /> {/* Logout icon */}
                            </IconButton>
                            <Typography variant="h6" className="ml-2 text-white">
                                {user.fullName}
                            </Typography>
                        </>
                    )}
                </Box>
                
                
                {/* Home Icon (Always on the left for both desktop and mobile) */}
                <IconButton
                    onClick={() => navigate('/')}
                    className="bg-white rounded-full shadow-md hover:bg-gray-200"
                >
                    <Home fontSize="large" className="text-white" />
                </IconButton>

               

                {/* Desktop View: Add Real Estate Ad Button */}
                {user && (
                    <Button
                        variant="contained"
                        color="primary"
                        
                        className="!hidden md:!block bg-blue-500 hover:bg-blue-700"
                        onClick={() => navigate('/submit-ad')}
                    >
                        Add Real Estate Ad
                    </Button>
                )}

                {/* Mobile View: Hamburger Menu */}
                <Box className="md:hidden">
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon fontSize="large" className="text-white" />
                    </IconButton>
                </Box>

                {/* Drawer for mobile view */}
                <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={toggleDrawer(false)}
                        onKeyDown={toggleDrawer(false)}
                    >
                        <List>
                            {user && (
                                <>
                                    <ListItem button onClick={handleLogout}>
                                        <ExitToApp className="text-red-500" />
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                    <ListItem button onClick={() => navigate('/submit-ad')}>
                                        <ListItemText primary="Add Real Estate Ad" />
                                    </ListItem>
                                </>
                            )}
                        </List>
                    </Box>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
