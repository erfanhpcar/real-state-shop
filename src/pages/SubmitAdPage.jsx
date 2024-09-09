import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SubmitAdPage = () => {
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [userId, setUserId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track if the form is in edit mode
  const { id } = useParams(); // Get the ad ID from URL if in edit mode
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }

    // If there's an id in the URL, we're editing an ad
    if (id) {
      setIsEditing(true);
      fetchAdDetails(id);
    }
  }, [id]);

  const fetchAdDetails = async (adId) => {
    try {
      const response = await axios.get(`http://localhost:5000/ads/${adId}`);
      const adData = response.data;
      formik.setValues({
        phone: adData.phone,
        address: adData.address,
        description: adData.description
      });
      setLocation({
        lat: adData.location.lat,
        lng: adData.loaction.lng
      });
    } catch (error) {
      console.error('Error fetching ad details:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: '',
      address: '',
      description: ''
    },
    validationSchema: Yup.object({
      phone: Yup.string().required('Phone number is required'),
      address: Yup.string().required('Address is required'),
      description: Yup.string().required('Description is required')
    }),
    onSubmit: async (values) => {
      try {
        if (isEditing) {
          // Update existing ad
          await axios.put(`http://localhost:5000/ads/${id}`, {
            ...values,
            location,
            userId
          });
          alert('Ad updated successfully!');
        } else {
          // Create new ad
          await axios.post('http://localhost:5000/ads', {
            ...values,
            location,
            userId
          });
          alert('Ad submitted successfully!');
        }
        navigate('/'); // Redirect to home page after success
      } catch (error) {
        console.error('Error submitting ad:', error);
      }
    }
  });

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">{isEditing ? 'Edit Real Estate Ad' : 'Submit Real Estate Ad'}</h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          margin="normal"
          {...formik.getFieldProps('phone')}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        <TextField
          fullWidth
          label="Address"
          variant="outlined"
          margin="normal"
          {...formik.getFieldProps('address')}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          {...formik.getFieldProps('description')}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <div className="my-4">
          <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lng]} />
            <LocationPicker setLocation={setLocation} />
          </MapContainer>
        </div>

        <Button type="submit" variant="contained" color="primary">
          {isEditing ? 'Update Ad' : 'Submit Ad'}
        </Button>
      </form>
    </div>
  );
};

// Component to handle location picking
const LocationPicker = ({ setLocation }) => {
  useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng
      });
    }
  });

  return null;
};

export default SubmitAdPage;