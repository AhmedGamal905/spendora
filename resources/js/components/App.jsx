import React from "react";
import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
    RouterProvider,
} from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import Expenses from "../pages/Expenses";
import NotFound from "../pages/NotFound";
import Categories from "../pages/Categories";
import Incomes from "../pages/Incomes";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="categories" element={<Categories />} />
                    <Route path="expenses" element={<Expenses />} />
                    <Route
                        path="/categories/:categoryId/expenses"
                        element={<Expenses />}
                    />
                    <Route path="incomes" element={<Incomes />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        )
    );

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;
