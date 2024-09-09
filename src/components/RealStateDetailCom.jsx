
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Container, CircularProgress, Button, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const RealEstateDetailCom = () => {
    const { id } = useParams();
    const [ad, setAd] = useState(null);
    const [owner, setOwner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdAndOwner = async () => {
            try {
                // Fetch the ad by id
                const adResponse = await axios.get(`http://localhost:5000/ads/${id}`);
                const adData = adResponse.data;
                setAd(adData);

                // Fetch the owner's details using userId
                const ownerResponse = await axios.get(`http://localhost:5000/users/${adData.userId}`);
                setOwner(ownerResponse.data);

                // Check if the logged-in user is the owner
                const loggedInUserId = localStorage.getItem('userId'); // Assuming the user ID is stored in localStorage
                if (loggedInUserId && loggedInUserId === adData.userId.toString()) {
                    setIsOwner(true);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching ad or owner:', error);
                setLoading(false);
            }
        };

        fetchAdAndOwner();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/ads/${id}`);
            alert("Ad deleted successfully!");
            navigate("/"); // Navigate back to the homepage after deletion
        } catch (error) {
            console.error("Error deleting the ad:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/submit-ad/${id}`); // Navigate to the edit page (you'll need to create this page)
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;

    if (!ad) return <div>No real estate found</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" gutterBottom className="text-blue-900 text-center mb-8 font-semibold">
                    {ad.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" className="mb-4 text-gray-600">
                    Address: {ad.address}
                </Typography>
                <Typography variant="body1" className="text-gray-700 mb-4">
                    Description: {ad.description}
                </Typography>
                <Typography variant="body2" color="textPrimary" className="mb-4">
                    Phone: {ad.phone}
                </Typography>
                <Typography variant="body2" color="textSecondary" className="mb-4">
                    Owner: {owner?.fullName || 'Unknown'}
                </Typography>

                {ad.location.lat && ad.location.lng ? (
                    <div className="mt-4 h-96">
                        <MapContainer center={[ad.location.lat, ad.location.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={[ad.location.lat, ad.location.lng]}>
                                <Popup>{ad.address}</Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                ) : (
                    <Typography variant="body2" color="error" className="mt-4">
                        Location information is not available for this property.
                    </Typography>
                )}

                {isOwner && (
                    <Box mt={4} className="flex justify-between">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleEdit} 
                            className="bg-blue-500 hover:bg-blue-700"
                        >
                            Edit
                        </Button>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={handleDelete} 
                            className="bg-red-500 hover:bg-red-700"
                        >
                            Delete
                        </Button>
                    </Box>
                )}
            </Container>
        </div>
    );
};

export default RealEstateDetailCom;
