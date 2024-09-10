import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Container, CircularProgress, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';

const Ads = () => {
    const [ads, setAds] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    // Use MediaQuery to detect if the screen is small (mobile) or large (desktop)
    const isMobile = useMediaQuery('(max-width:600px)');
    const adsPerPage = isMobile ? 3 : 6; // 3 ads per page for mobile, 6 for desktop

    // Calculate the total number of pages
    const totalPages = Math.ceil(ads.length / adsPerPage);

    // Get the ads for the current page
    const currentAds = ads.slice((currentPage - 1) * adsPerPage, currentPage * adsPerPage);

    useEffect(() => {
        const fetchAdsAndUsers = async () => {
            try {
                const [adsResponse, usersResponse] = await Promise.all([
                    axios.get('http://localhost:5000/ads'),
                    axios.get('http://localhost:5000/users'),
                ]);

                setAds(adsResponse.data);

                const usersMap = usersResponse.data.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {});

                setUsers(usersMap);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchAdsAndUsers();
    }, []);

    const handleCardClick = (ad) => {
        navigate(`/realestate/${ad.id}`);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;

    return (
        <div className="py-8">
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom className="text-blue-900 text-center mb-8 font-semibold">
                    Real Estate Listings
                </Typography>
                <Grid container spacing={4}>
                    {currentAds.map(ad => (
                        <Grid item xs={12} sm={6} md={4} key={ad.id}>
                            <Card 
                                className="shadow-lg rounded-lg border border-gray-300 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
                                onClick={() => handleCardClick(ad)}
                            >
                                <CardContent>
                                    <Typography variant="h5" component="h2" className="text-blue-800 mb-2 font-medium">
                                        {ad.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" className="mb-2 text-gray-600">
                                        {ad.address}
                                    </Typography>
                                    <Typography variant="body1" component="p" className="text-gray-700 mb-4">
                                        {ad.description}
                                    </Typography>
                                    <Typography variant="body2" color="textPrimary" className="mb-2">
                                        Phone: {ad.phone}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Owner: {users[ad.userId]?.fullName || 'Unknown'}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {/* Pagination Component */}
                <div className="flex justify-center mt-8">
                    <Pagination 
                        count={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange} 
                        color="primary" 
                    />
                </div>
            </Container>
        </div>
    );
};

export default Ads;
