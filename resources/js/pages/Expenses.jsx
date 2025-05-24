import React, { useState, useEffect } from "react";
import axiosInstance from "../bootstrap";
import * as yup from "yup";
import Spinner from "../components/Spinner";

const expenseSchema = yup.object().shape({
    category_id: yup.string().required("Category is required"),
    amount: yup
        .number()
        .typeError("Amount must be a number")
        .required("Amount is required")
        .positive("Amount must be positive")
        .min(0.01, "Amount must be at least 0.01"),
    description: yup
        .string()
        .required("Description is required")
        .max(255, "Description cannot exceed 255 characters"),
});

function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateForm, setCreate] = useState(false);
    const [showUpdateForm, setUpdate] = useState(false);
    const [createFormErrors, setCreateFormErrors] = useState({});
    const [updateFormErrors, setUpdateFormErrors] = useState({});
    const [createFormData, setCreateFormData] = useState({
        category_id: "",
        amount: "",
        description: "",
    });

    const [updateFormData, setUpdateFormData] = useState({
        id: "",
        category_id: "",
        amount: "",
        description: "",
    });

    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/expenses");
            setExpenses(response.data.data || []);
        } catch (err) {
            console.error("Error fetching expenses:", err);
            setError("Failed to load expenses. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/categories");
            setAvailableCategories(response.data.data || []);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Failed to load categories. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, []);

    const deleteExpense = async (id) => {
        try {
            setLoading(true);
            await axiosInstance.delete(`/expenses/${id}`);
            fetchExpenses();
        } catch (err) {
            console.error("Error deleting expense:", err);
            setError("Failed to delete expense. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const toggleCreate = () => {
        setCreate(!showCreateForm);
        setUpdate(false);
        setCreateFormErrors({});
        if (showCreateForm) {
            setCreateFormData({
                category_id: "",
                amount: "",
                description: "",
            });
        }
    };

    const toggleUpdate = (expense) => {
        setUpdate(!showUpdateForm);
        setCreate(false);
        setUpdateFormErrors({});
        if (!showUpdateForm) {
            setUpdateFormData({
                id: expense.id,
                category_id: expense.category_id,
                amount: expense.amount,
                description: expense.description,
            });
        } else {
            setUpdateFormData({
                id: "",
                category_id: "",
                amount: "",
                description: "",
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

    const handleCreateExpense = async () => {
        try {
            await expenseSchema.validate(createFormData, { abortEarly: false });
            setCreateFormErrors({});
            setLoading(true);

            await axiosInstance.post("/expenses", {
                category_id: createFormData.category_id,
                amount: parseFloat(createFormData.amount),
                description: createFormData.description,
            });

            setCreate(false);
            setCreateFormErrors({});
            setCreateFormData({
                category_id: "",
                amount: "",
                description: "",
            });
            fetchExpenses();
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
                    "Failed to create expense. Please try again.";
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateExpense = async () => {
        try {
            await expenseSchema.validate(updateFormData, { abortEarly: false });
            setUpdateFormErrors({});
            setLoading(true);

            await axiosInstance.put(`/expenses/${updateFormData.id}`, {
                category_id: updateFormData.category_id,
                amount: parseFloat(updateFormData.amount),
                description: updateFormData.description,
            });

            setUpdateFormErrors({});
            setUpdate(false);
            setUpdateFormData({
                id: "",
                category_id: "",
                amount: "",
                description: "",
            });
            fetchExpenses();
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
                    "Failed to update expense. Please try again.";
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
                        Your Expenses
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
                        New Expense
                    </button>
                </div>
            </div>
            {showCreateForm && (
                <div>
                    <div>
                        <label
                            htmlFor="category"
                            className="block text-sm my-2 dark:text-white"
                        >
                            Category
                        </label>
                        <div className="relative">
                            <select
                                id="category"
                                name="category_id"
                                value={createFormData.category_id}
                                onChange={handleCreateInputChange}
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                required
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                {availableCategories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {createFormErrors.category_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {createFormErrors.category_id}
                                </p>
                            )}
                        </div>
                    </div>
                    <label
                        htmlFor="amount"
                        className="block text-sm my-2 dark:text-white"
                    >
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={createFormData.amount}
                        onChange={handleCreateInputChange}
                        placeholder="00.0"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        maxLength="255"
                        min="0"
                        required
                    />
                    {createFormErrors.amount && (
                        <p className="text-red-500 text-xs mt-1">
                            {createFormErrors.amount}
                        </p>
                    )}
                    <label
                        htmlFor="description"
                        className="block text-sm my-2 dark:text-white"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={createFormData.description}
                        onChange={handleCreateInputChange}
                        placeholder="New expense description"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        maxLength="255"
                        required
                    />
                    {createFormErrors.description && (
                        <p className="text-red-500 text-xs mt-1">
                            {createFormErrors.description}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={handleCreateExpense}
                        className="my-5 py-2 px-3 block w-full text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Save
                    </button>
                </div>
            )}
            {showUpdateForm && (
                <div>
                    <div>
                        <label
                            htmlFor="update-category"
                            className="block text-sm my-2 dark:text-white"
                        >
                            Category
                        </label>
                        <div className="relative">
                            <select
                                id="update-category"
                                name="category_id"
                                value={updateFormData.category_id}
                                onChange={handleUpdateInputChange}
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                required
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                {availableCategories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {updateFormErrors.category_id && (
                                <p className="text-red-500 text-xs mt-1">
                                    {updateFormErrors.category_id}
                                </p>
                            )}
                        </div>
                    </div>
                    <label
                        htmlFor="update-amount"
                        className="block text-sm my-2 dark:text-white"
                    >
                        Amount
                    </label>
                    <input
                        type="number"
                        id="update-amount"
                        name="amount"
                        value={updateFormData.amount}
                        onChange={handleUpdateInputChange}
                        placeholder="00.0"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        maxLength="255"
                        min="0"
                        required
                    />
                    {updateFormErrors.amount && (
                        <p className="text-red-500 text-xs mt-1">
                            {updateFormErrors.amount}
                        </p>
                    )}
                    <label
                        htmlFor="update-description"
                        className="block text-sm my-2 dark:text-white"
                    >
                        Description
                    </label>
                    <input
                        type="text"
                        id="update-description"
                        name="description"
                        value={updateFormData.description}
                        onChange={handleUpdateInputChange}
                        placeholder="Update expense description"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        maxLength="255"
                        required
                    />
                    {updateFormErrors.description && (
                        <p className="text-red-500 text-xs mt-1">
                            {updateFormErrors.description}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={handleUpdateExpense}
                        className="my-5 py-2 px-3 block w-full text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        Save
                    </button>
                </div>
            )}
            <div className="container mx-auto p-4">
                {expenses.length === 0 ? (
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
                            No expenses records found
                        </p>
                        <p className="text-sm text-gray-500 dark:text-neutral-500">
                            Add your first expense record to get started.
                        </p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 m-2">
                        <thead>
                            <tr className="border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
                                <th scope="col">
                                    <button
                                        id="hs-pro-id"
                                        type="button"
                                        className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        Expense ID
                                    </button>
                                </th>
                                <th scope="col" className="max-w-[250px]">
                                    <button
                                        id="hs-pro-name"
                                        type="button"
                                        className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        Category Name
                                    </button>
                                </th>
                                <th scope="col" className="max-w-[250px]">
                                    <button
                                        id="hs-pro-time"
                                        type="button"
                                        className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        Amount
                                    </button>
                                </th>
                                <th scope="col" className="max-w-[250px]">
                                    <button
                                        id="hs-pro-description"
                                        type="button"
                                        className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        Description
                                    </button>
                                </th>
                                <th scope="col" className="max-w-[250px]">
                                    <button
                                        id="hs-pro-added"
                                        type="button"
                                        className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        Added
                                    </button>
                                </th>
                                <th scope="col" className="max-w-[250px]">
                                    <button
                                        id="hs-pro-update"
                                        type="button"
                                        className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        Update
                                    </button>
                                </th>
                                <th scope="col" className="max-w-[250px]">
                                    <button
                                        id="hs-pro-delete"
                                        type="button"
                                        className="px-4 py-2.5 text-start w-full flex items-center gap-x-1 text-sm font-normal text-gray-500 focus:outline-none focus:bg-gray-100 dark:text-neutral-500 dark:focus:bg-neutral-700"
                                        aria-haspopup="menu"
                                        aria-expanded="false"
                                        aria-label="Dropdown"
                                    >
                                        Delete
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                            {expenses.map((expense) => (
                                <tr
                                    key={expense.id}
                                    className="divide-x divide-gray-200 dark:divide-neutral-700"
                                >
                                    <td className="size-px whitespace-nowrap px-4 py-1">
                                        <div className="w-full flex items-center gap-x-3">
                                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {expense.id}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap px-4 py-1">
                                        <div className="w-full flex items-center gap-x-3">
                                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {expense.category_name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap px-4 py-1">
                                        <div className="w-full flex items-center gap-x-3">
                                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                ${expense.amount}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap px-4 py-1">
                                        <div className="w-full flex items-center gap-x-3">
                                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {expense.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap px-4 py-1">
                                        <div className="w-full flex items-center gap-x-3">
                                            <span className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {expense.created_at}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="size-px whitespace-nowrap px-4 py-1">
                                        <button
                                            type="button"
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-green-500 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-green-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                            onClick={() =>
                                                toggleUpdate(expense)
                                            }
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className="size-px whitespace-nowrap px-4 py-1">
                                        <button
                                            onClick={() =>
                                                deleteExpense(expense.id)
                                            }
                                            type="button"
                                            className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-red-500 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Expenses;
