import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await axios.post(
            "https://spendora.test/api/auth/login",
            {
                email,
                password,
            }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${response.data.token}`;
    };

    const register = async (name, email, password, password_confirmation) => {
        const response = await axios.post(
            "https://spendora.test/api/auth/register",
            {
                name,
                email,
                password,
                password_confirmation,
            }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${response.data.token}`;
    };

    const logout = async () => {
        try {
            await axios.post("https://spendora.test/api/auth/logout");
        } catch (err) {
            console.error("Logout failed:", err);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
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
