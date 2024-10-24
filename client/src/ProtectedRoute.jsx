// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
    const token = Cookies.get('access_token'); // Get the JWT token from the cookie

    // If token is present, render the element; otherwise redirect to /login
    return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
