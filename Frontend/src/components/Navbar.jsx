import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const handleNavClick = (path) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        setIsUserMenuOpen(false);
    };

    return (
        <nav className="bg-gradient from-blue-600 to-blue-800 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        className="text-2xl font-bold hover:text-blue-200 transition flex items-center gap-2"
                    >
                        <span>💰</span>
                        <span>Expense Tracker</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-6 items-center">
                        <Link
                            to="/"
                            className="hover:text-blue-200 transition font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/add-expense"
                            className="hover:text-blue-200 transition font-medium"
                        >
                            Add Expense
                        </Link>
                        <Link
                            to="/expenses"
                            className="hover:text-blue-200 transition font-medium"
                        >
                            View Expenses
                        </Link>
                        <Link
                            to="/statistics"
                            className="hover:text-blue-200 transition font-medium"
                        >
                            Statistics
                        </Link>
                    </div>

                    {/* User Section */}
                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="relative">
                                <button
                                    onClick={toggleUserMenu}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    <span className="text-sm font-medium">{user.fullName || user.email}</span>
                                    <svg
                                        className={`w-4 h-4 transition ${isUserMenuOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </button>

                                {/* User Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-50 py-2">
                                        <div className="px-4 py-2 border-b border-gray-200">
                                            <p className="text-sm font-medium">{user.fullName || "User"}</p>
                                            <p className="text-xs text-gray-600">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-medium transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            className="md:hidden flex flex-col gap-1 focus:outline-none"
                        >
                            <span className={`h-1 w-6 bg-white transition ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                            <span className={`h-1 w-6 bg-white transition ${isMenuOpen ? "opacity-0" : ""}`}></span>
                            <span className={`h-1 w-6 bg-white transition ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 flex flex-col gap-3 pb-4">
                        <button
                            onClick={() => handleNavClick("/")}
                            className="text-left hover:text-blue-200 transition font-medium"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleNavClick("/add-expense")}
                            className="text-left hover:text-blue-200 transition font-medium"
                        >
                            Add Expense
                        </button>
                        <button
                            onClick={() => handleNavClick("/expenses")}
                            className="text-left hover:text-blue-200 transition font-medium"
                        >
                            View Expenses
                        </button>
                        <button
                            onClick={() => handleNavClick("/statistics")}
                            className="text-left hover:text-blue-200 transition font-medium"
                        >
                            Statistics
                        </button>
                        <button
                            onClick={handleLogout}
                            className="text-left hover:text-blue-200 transition font-medium text-red-300 mt-2"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
