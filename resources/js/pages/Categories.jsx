import React, { useState, useEffect } from "react";
import axiosInstance from "../bootstrap";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";
import * as yup from "yup";
import LoadMoreButton from "../components/LoadMoreButton";

const categorySchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is required")
        .max(25, "Name cannot exceed 25 characters"),
});

function Categories() {
    const [categories, setCategories] = useState({
        data: [],
        links: {},
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setCreate] = useState(false);
    const [showUpdateForm, setUpdate] = useState(false);
    const [createFormErrors, setCreateFormErrors] = useState({});
    const [updateFormErrors, setUpdateFormErrors] = useState({});
    const [createFormData, setCreateFormData] = useState({
        name: "",
    });

    const [updateFormData, setUpdateFormData] = useState({
        id: "",
        name: "",
    });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/categories");
            setCategories({
                data: response.data.data || [],
                links: response.data.links || {},
            });
        } catch (err) {
            setError("Failed to load categories. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const toggleCreate = () => {
        setCreate(!showCreateForm);
        setUpdate(false);
        setCreateFormErrors({});
        if (showCreateForm) {
            setCreateFormData({
                name: "",
            });
        }
    };

    const toggleUpdate = (category) => {
        setUpdate(!showUpdateForm);
        setCreate(false);
        setUpdateFormErrors({});
        if (!showUpdateForm) {
            setUpdateFormData({
                id: category.id,
                name: category.name,
            });
        } else {
            setUpdateFormData({
                id: "",
                name: "",
            });
        }
    };

    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        setCreateFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateCategory = async () => {
        try {
            await categorySchema.validate(createFormData, {
                abortEarly: false,
            });
            setCreateFormErrors({});
            setLoading(true);

            await axiosInstance.post("/categories", {
                name: createFormData.name,
            });

            setCreate(false);
            setCreateFormErrors({});
            setCreateFormData({
                name: "",
            });
            fetchCategories();
        } catch (err) {
            if (err.name === "ValidationError") {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setCreateFormErrors(validationErrors);
            } else {
                const errorMessage =
                    err.response?.data?.message ||
                    "Failed to create category. Please try again.";
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCategory = async () => {
        try {
            await categorySchema.validate(updateFormData, {
                abortEarly: false,
            });
            setUpdateFormErrors({});
            setLoading(true);

            await axiosInstance.put(`/categories/${updateFormData.id}`, {
                name: updateFormData.name,
            });

            setUpdateFormErrors({});
            setUpdate(false);
            setUpdateFormData({
                id: "",
                name: "",
            });
            fetchCategories();
        } catch (err) {
            if (err.name === "ValidationError") {
                const validationErrors = {};
                err.inner.forEach((error) => {
                    validationErrors[error.path] = error.message;
                });
                setUpdateFormErrors(validationErrors);
            } else {
                const errorMessage =
                    err.response?.data?.message ||
                    "Failed to update category. Please try again.";
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className="p-3">
            {error && (
                <div className="container mx-auto p-4 text-red-500">
                    {error}
                </div>
            )}
            <div className="flex flex-wrap justify-between items-center gap-2 mx-2">
                <div>
                    <h1 className="text-lg md:text-xl font-semibold text-stone-800 dark:text-neutral-200">
                        Your Categories
                    </h1>
                </div>
                <div className="flex justify-end items-center gap-x-2">
                    <button
                        onClick={toggleCreate}
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <svg
                            className="hidden sm:block shrink-0 size-3.5"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                        </svg>
                        New Category
                    </button>
                </div>
            </div>
            {showCreateForm && (
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm my-2 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={createFormData.name}
                        onChange={handleCreateInputChange}
                        placeholder="name"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        maxLength="255"
                        required
                    />
                    {createFormErrors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {createFormErrors.name}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={handleCreateCategory}
                        className="my-5 py-2 px-3 block w-full text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Save
                    </button>
                </div>
            )}
            {showUpdateForm && (
                <div>
                    <label
                        htmlFor="update-name"
                        className="block text-sm my-2 dark:text-white"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="update-name"
                        name="name"
                        value={updateFormData.name}
                        onChange={handleUpdateInputChange}
                        placeholder="Update category name"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        maxLength="255"
                        required
                    />
                    {updateFormErrors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {updateFormErrors.name}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={handleUpdateCategory}
                        className="my-5 py-2 px-3 block w-full text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Save
                    </button>
                </div>
            )}
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
                        {categories.data.map((category) => (
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
                                    onClick={() => toggleUpdate(category)}
                                    className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-green-500 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-green-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                >
                                    Update
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <LoadMoreButton
                data={categories}
                setData={setCategories}
                links={categories.links}
                axiosInstance={axiosInstance}
            />
        </div>
    );
}

export default Categories;
