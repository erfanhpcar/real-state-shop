import React, { useEffect, useState } from "react";
import axios from "axios";
import {  CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';
import AdsGrid from "./AdsGrid";

const Ads = () => {
    const [ads, setAds] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    
    const isMobile = useMediaQuery('(max-width:600px)');
    const adsPerPage = isMobile ? 3 : 6; 

   
    const totalPages = Math.ceil(ads.length / adsPerPage);

    
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
            <AdsGrid currentAds={currentAds} handleCardClick={handleCardClick} users={users} totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
        </div>
    );
};

export default Ads;
