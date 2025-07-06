// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-5xl font-bold mb-4 text-red-600">404</h1>
            <p className="text-xl mb-6 text-gray-700">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/home" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
