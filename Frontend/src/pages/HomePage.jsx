import { Link } from "react-router-dom";
import SalarySetup from "../components/SalarySetup";
import SalaryOverview from "../components/SalaryOverview";
import SpendingAdvice from "../components/SpendingAdvice";
import MonthlyComparison from "../components/MonthlyComparison";

function HomePage({ salary, onSetSalary, expenses }) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    // If salary is set, show dashboard
    if (salary) {
        return (
            <div className="bg-gradient from-blue-50 to-gray-50 min-h-screen py-8">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            💰 Financial Dashboard
                        </h1>
                        <p className="text-gray-600">Your monthly budget and spending overview</p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Salary Setup */}
                            <SalarySetup onSalarySet={onSetSalary} initialSalary={salary} />

                            {/* Salary Overview */}
                            <SalaryOverview salary={salary} totalExpenses={totalExpenses} />

                            {/* Monthly Comparison */}
                            <MonthlyComparison expenses={expenses} salary={salary} />
                        </div>

                        {/* Right Column - Advice */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-4 space-y-6">
                                {/* Spending Advice */}
                                <SpendingAdvice expenses={expenses} salary={salary} />

                                {/* Quick Actions */}
                                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                                    <h4 className="text-lg font-bold text-gray-800 mb-4">⚡ Quick Actions</h4>
                                    <div className="space-y-2">
                                        <Link
                                            to="/add-expense"
                                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition text-center"
                                        >
                                            ➕ Add Expense
                                        </Link>
                                        <Link
                                            to="/expenses"
                                            className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition text-center"
                                        >
                                            📋 View Expenses
                                        </Link>
                                        <Link
                                            to="/statistics"
                                            className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition text-center"
                                        >
                                            📊 Statistics
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Original landing page if no salary set
    return (
        <div className="bg-gradient from-blue-50 to-gray-50">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text */}
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                            💰 Take Control of Your Spending
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            Track, analyze, and manage your expenses with ease. Get personalized advice based on your salary and spending habits.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                to="/add-expense"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
                            >
                                Start Tracking
                            </Link>
                            <Link
                                to="/expenses"
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg transition"
                            >
                                View Expenses
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Image/Icon */}
                    <div className="text-center">
                        <div className="text-8xl mb-6">📊</div>
                        <p className="text-gray-600 text-lg">
                            Smart expense management at your fingertips
                        </p>
                    </div>
                </div>

                {/* Salary Setup Card */}
                <div className="mt-16">
                    <SalarySetup onSalarySet={onSetSalary} initialSalary={null} />
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Powerful Features
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gradient from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">💼</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Salary Tracking</h3>
                            <p className="text-gray-600">
                                Set your salary and get personalized budget advice based on your income.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient from-green-50 to-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">➕</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Add Expenses</h3>
                            <p className="text-gray-600">
                                Quickly add expenses with title, amount, category, and date.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gradient from-purple-50 to-purple-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Smart Advice</h3>
                            <p className="text-gray-600">
                                Get AI-powered spending advice and recommendations to save money.
                            </p>
                        </div>

                        {/* Feature 4 */}
                        <div className="bg-gradient from-orange-50 to-orange-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">📈</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Analytics</h3>
                            <p className="text-gray-600">
                                Get insights with advanced statistics on your spending habits.
                            </p>
                        </div>

                        {/* Feature 5 */}
                        <div className="bg-gradient from-cyan-50 to-cyan-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Monthly Trends</h3>
                            <p className="text-gray-600">
                                Compare expenses across months and track spending patterns.
                            </p>
                        </div>

                        {/* Feature 6 */}
                        <div className="bg-gradient from-red-50 to-red-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">🔍</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Search & Filter</h3>
                            <p className="text-gray-600">
                                Find expenses instantly by title or filter by category and date.
                            </p>
                        </div>

                        {/* Feature 7 */}
                        <div className="bg-gradient from-pink-50 to-pink-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">✏️</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Edit & Delete</h3>
                            <p className="text-gray-600">
                                Modify expenses anytime or remove them with a single click.
                            </p>
                        </div>

                        {/* Feature 8 */}
                        <div className="bg-gradient from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <div className="text-4xl mb-4">💰</div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Budget Balance</h3>
                            <p className="text-gray-600">
                                See your remaining budget and how much you've spent this month.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-6xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-5xl font-bold text-blue-600 mb-2">8+</h3>
                        <p className="text-gray-600 text-lg">Features</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-5xl font-bold text-green-600 mb-2">∞</h3>
                        <p className="text-gray-600 text-lg">Expenses</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-5xl font-bold text-purple-600 mb-2">100%</h3>
                        <p className="text-gray-600 text-lg">Control</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Take Control?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Set your salary and start tracking your expenses today to gain insights into your spending patterns.
                    </p>
                    <Link
                        to="/add-expense"
                        className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 inline-block"
                    >
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
