import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [localError, setLocalError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login, error, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError("");

        if (!email || !password) {
            setLocalError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            const success = login(email, password);
            if (success) {
                navigate("/");
            } else {
                setLocalError(error || "Login failed");
            }
            setIsLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gradient from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">
                        💰 Expense Tracker
                    </h1>
                    <p className="text-center text-gray-600 mt-2">
                        Manage your expenses smartly
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                            disabled={isLoading}
                        />
                    </div>

                    {(localError || error) && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{localError || error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition duration-200"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-600 text-sm">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-medium">
                            Sign up here
                        </Link>
                    </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-xs">
                        <strong>Demo Credentials:</strong>
                        <br />
                        Email: demo@example.com
                        <br />
                        Password: demo123
                    </p>
                </div>
            </div>
        </div>
    );
}
