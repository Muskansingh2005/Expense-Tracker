import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already logged in on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        const token = localStorage.getItem("authToken");

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error("Error parsing stored user:", err);
                localStorage.removeItem("currentUser");
                localStorage.removeItem("authToken");
            }
        }
        setLoading(false);
    }, []);

    // Register new user
    const register = useCallback((email, password, fullName) => {
        setError(null);

        // Get all users from localStorage
        const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

        // Check if user already exists
        if (allUsers.some((u) => u.email === email)) {
            setError("User already exists");
            return false;
        }

        // Simple validation
        if (!email || !password || password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email,
            password, // In production, this should be hashed on backend
            fullName: fullName || email.split("@")[0],
            createdAt: new Date().toISOString(),
        };

        // Save user
        allUsers.push(newUser);
        localStorage.setItem("allUsers", JSON.stringify(allUsers));

        // Auto-login after registration
        const token = `token_${newUser.id}_${Date.now()}`;
        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUser", JSON.stringify({
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.fullName,
        }));

        // Initialize empty expenses and salary for new user
        localStorage.setItem(`expenses_${newUser.id}`, JSON.stringify([]));
        localStorage.setItem(`salary_${newUser.id}`, "");

        setUser({
            id: newUser.id,
            email: newUser.email,
            fullName: newUser.fullName,
        });

        return true;
    }, []);

    // Login user
    const login = useCallback((email, password) => {
        setError(null);

        // Get all users from localStorage
        const allUsers = JSON.parse(localStorage.getItem("allUsers") || "[]");

        // Find user
        const foundUser = allUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
            setError("Invalid email or password");
            return false;
        }

        // Create token
        const token = `token_${foundUser.id}_${Date.now()}`;
        localStorage.setItem("authToken", token);
        localStorage.setItem("currentUser", JSON.stringify({
            id: foundUser.id,
            email: foundUser.email,
            fullName: foundUser.fullName,
        }));

        setUser({
            id: foundUser.id,
            email: foundUser.email,
            fullName: foundUser.fullName,
        });

        return true;
    }, []);

    // Logout user
    const logout = useCallback(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("currentUser");
        localStorage.removeItem("expenses");
        localStorage.removeItem("salary");
        setUser(null);
        setError(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                login,
                register,
                logout,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
