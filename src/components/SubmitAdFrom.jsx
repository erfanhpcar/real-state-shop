import React from 'react'
import { TextField, Button } from '@mui/material';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';



function SubmitAdFrom({formik, location, setLocation, LocationPicker, isEditing }) {
    return (
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
    )
}

export default SubmitAdFrom