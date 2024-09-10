import React from 'react'
import { Typography, Container, Button, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function RealEstateDetailInfo({ad, owner, isOwner, handleEdit,handleDelete}) {
    return (
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
    )
}

export default RealEstateDetailInfo