import React from 'react'
import { Card, CardContent, Typography, Grid, Container, Pagination } from "@mui/material";

function AdsGrid({currentAds, handleCardClick, users, totalPages, currentPage, handlePageChange}) {
    return (
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
    )
}

export default AdsGrid