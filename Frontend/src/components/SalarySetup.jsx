import { useState } from "react";

function SalarySetup({ onSalarySet, initialSalary }) {
    const [salary, setSalary] = useState(initialSalary || "");
    const [isEditing, setIsEditing] = useState(!initialSalary);

    const handleSubmit = (e) => {
        e.preventDefault();
        const salaryAmount = parseFloat(salary);

        if (!salary || salaryAmount <= 0) {
            alert("Please enter a valid salary amount");
            return;
        }

        onSalarySet(salaryAmount);
        setIsEditing(false);
    };

    if (!isEditing) {
        return (
            <div className="bg-gradient from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">💼 Monthly Salary</p>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            ₹{salary ? parseFloat(salary).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "0"}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition transform hover:scale-105"
                    >
                        ✏️ Edit Salary
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border-2 border-purple-300 rounded-xl p-8 mb-6 shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">💼 Set Your Monthly Salary</h2>
                <p className="text-gray-600">This will help us track your budget and provide personalized advice.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Monthly Salary *
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-3 text-2xl">💵</span>
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            placeholder="Enter your monthly salary"
                            step="0.01"
                            min="0"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
                            autoFocus
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                        📌 Enter your gross monthly salary to get accurate budget tracking
                    </p>
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
                    >
                        ✓ Set Salary
                    </button>
                    {initialSalary && (
                        <button
                            type="button"
                            onClick={() => {
                                setSalary(initialSalary);
                                setIsEditing(false);
                            }}
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition"
                        >
                            ✕ Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Budget Tips */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 mb-2">💡 Budget Tips:</p>
                <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ 50% - Essential expenses (housing, food, utilities)</li>
                    <li>✓ 30% - Discretionary spending (entertainment, shopping)</li>
                    <li>✓ 20% - Savings and investments</li>
                </ul>
            </div>
        </div>
    );
}

export default SalarySetup;
