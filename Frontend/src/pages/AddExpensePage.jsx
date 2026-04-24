import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import { calculateTotalExpenses } from "../utils/spendingUtils";

function AddExpensePage({ onAddExpense, expenses = [] }) {
    const navigate = useNavigate();
    const totalSpent = calculateTotalExpenses(expenses);

    const handleAddExpense = (newExpense) => {
        onAddExpense(newExpense);
        navigate("/expenses");
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 pb-12 pt-6">
            <div className="max-w-3xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">➕ Add New Expense</h1>
                    <p className="mt-2 text-gray-600">
                        Track your spending by adding a new expense below
                    </p>
                </div>

                {/* Total Spent Card */}
                {expenses.length > 0 && (
                    <div className="mb-6 from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
                        <p className="text-blue-100 text-sm font-semibold">TOTAL EXPENSES</p>
                        <h2 className="text-4xl font-bold">₹{totalSpent.toFixed(2)}</h2>
                        <p className="text-blue-100 text-sm mt-2">
                            Total of {expenses.length} {expenses.length === 1 ? 'expense' : 'expenses'}
                        </p>
                    </div>
                )}

                {/* Form */}
                <ExpenseForm onAddExpense={handleAddExpense} expenses={expenses} />

                {/* Info Box */}
                <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                    <h3 className="font-bold text-blue-800 mb-2">💡 Tips for Better Tracking</h3>
                    <ul className="text-blue-700 space-y-1 text-sm">
                        <li>✓ Use clear, descriptive titles (e.g., "Grocery Shopping" not "Stuff")</li>
                        <li>✓ Always assign a category for better analysis</li>
                        <li>✓ Enter the correct date for accurate reports</li>
                        <li>✓ You'll get alerts if you're spending too much on unnecessary items</li>
                        <li>✓ You can edit expenses later if needed</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AddExpensePage;
