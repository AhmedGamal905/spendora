import React, { useState, useEffect } from "react";
import axiosInstance from "../bootstrap";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/categories");
                setCategories(response.data.data || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div className="container mx-auto p-4 text-red-500">{error}</div>
        );
    }

    return (
        <div className="container mx-auto p-4 flex justify-center">
            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <svg
                        className="w-16 h-16 text-gray-400 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p className="text-lg font-medium text-gray-600 dark:text-neutral-400 mb-1">
                        No category records found
                    </p>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                        Add your first category record to get started.
                    </p>
                </div>
            ) : (
                <ul role="list" className="w-1/2 divide-y divide-gray-100">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="flex justify-between items-center py-5"
                        >
                            <NavLink
                                to={`/categories/${category.id}/expenses`}
                                className="flex items-center gap-x-4 w-full"
                            >
                                <div className="flex items-center">
                                    <p className="text-xl font-semibold text-white">
                                        {category.name}
                                    </p>
                                    <span className="text-gray-400 ml-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 12h14M12 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </NavLink>
                            <p className="mt-1 px-5 text-xs text-gray-400 whitespace-nowrap">
                                {category.created_at}
                            </p>
                            <button
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-green-500 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-green-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            >
                                Update
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Categories;
