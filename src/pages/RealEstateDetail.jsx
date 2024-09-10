
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {CircularProgress } from "@mui/material";
import 'leaflet/dist/leaflet.css';
import RealEstateDetailInfo from "../components/RealEstateDetailInfo";

const RealEstateDetail = () => {
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
            navigate("/"); 
        } catch (error) {
            console.error("Error deleting the ad:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/submit-ad/${id}`); 
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;

    if (!ad) return <div>No real estate found</div>;

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <RealEstateDetailInfo ad={ad} owner={owner} isOwner={isOwner} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
    );
};

export default RealEstateDetail;
