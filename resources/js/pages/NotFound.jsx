import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-stone-800 dark:text-neutral-200 mb-6">
                Page Not Found
            </h2>
            <p className="text-lg text-stone-600 dark:text-neutral-400 mb-8 max-w-lg">
                The page you're looking for doesn't exist or has been moved.
            </p>
            <NavLink
                to="/"
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-300"
            >
                Back to Home
            </NavLink>
        </div>
    );
};

export default NotFound;
