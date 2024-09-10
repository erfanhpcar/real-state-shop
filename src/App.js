import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import SubmitAdPage from './pages/SubmitAdPage';
import ProtectedRoute from './components/ProtectedRoute';
import RealEstateDetail from './pages/RealEstateDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />

        {/* Route for submitting a new ad */}
        <Route
          path="/submit-ad"
          element={<ProtectedRoute element={SubmitAdPage} />}
        />

        {/* Route for editing an ad */}
        <Route
          path="/submit-ad/:id"
          element={<ProtectedRoute element={SubmitAdPage} />}
        />

        <Route path="/realestate/:id" element={<RealEstateDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
