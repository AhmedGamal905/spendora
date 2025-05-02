import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../bootstrap.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await axiosInstance.post("/auth/login", {
            email,
            password,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
    };

    const register = async (name, email, password, password_confirmation) => {
        const response = await axiosInstance.post("/auth/register", {
            name,
            email,
            password,
            password_confirmation,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
    };

    const logout = async () => {
        try {
            await axiosInstance.post("/auth/logout");
        } catch (err) {
            console.error("Logout failed:", err);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, loading, login, logout, register }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
