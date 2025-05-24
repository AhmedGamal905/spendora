import React, { useState } from "react";
import Spinner from "./Spinner";

const LoadMoreButton = ({ data, setData, links, axiosInstance }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLoadMore = async () => {
        if (!links.next) return;
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get(links.next);
            const newData = response.data.data || [];
            setData((prevData) => ({
                ...prevData,
                data: [...prevData.data, ...newData],
                links: response.data.links || {},
            }));
        } catch (err) {
            setError("Failed to load more data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!links.next) return null;

    return (
        <div className="flex justify-center items-center mt-4">
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
                onClick={handleLoadMore}
                disabled={loading}
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-400 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {loading ? (
                    <Spinner className="inline-block" />
                ) : (
                    <>
                        <svg
                            className="shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 12h16m-7-7l7 7-7 7"
                            />
                        </svg>
                        Load More
                    </>
                )}
            </button>
        </div>
    );
};

export default LoadMoreButton;
