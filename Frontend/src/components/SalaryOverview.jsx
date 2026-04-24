import {
    calculateSpendingPercentage,
    calculateRemainingBudget,
    getSpendingStatus,
    getBudgetAllocation,
} from "../utils/salaryUtils";

function SalaryOverview({ salary, totalExpenses }) {
    if (!salary) {
        return null;
    }

    const spendingPercentage = calculateSpendingPercentage(totalExpenses, salary);
    const remaining = calculateRemainingBudget(salary, totalExpenses);
    const status = getSpendingStatus(spendingPercentage);
    const allocation = getBudgetAllocation(salary);

    // Get month from current date
    const today = new Date();
    const monthName = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return (
        <div className="space-y-6">
            {/* Main Budget Status Card */}
            <div className={`${status.bgColor} border-2 ${status.borderColor} rounded-xl p-8 shadow-lg`}>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-gray-600 text-sm font-medium">📅 {monthName}</p>
                        <h3 className={`text-3xl font-bold ${status.textColor} mt-1`}>
                            {status.status} Spending Control
                        </h3>
                    </div>
                    <div className="text-5xl">{status.icon}</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">Spending Progress</span>
                        <span className={`text-2xl font-bold ${status.textColor}`}>
                            {Math.round(spendingPercentage)}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${spendingPercentage <= 30
                                ? "bg-green-500"
                                : spendingPercentage <= 50
                                    ? "bg-blue-500"
                                    : spendingPercentage <= 75
                                        ? "bg-yellow-500"
                                        : spendingPercentage < 100
                                            ? "bg-orange-500"
                                            : "bg-red-500"
                                }`}
                            style={{ width: `${Math.min(spendingPercentage, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Recommendation */}
                <p className={`text-sm font-semibold ${status.textColor} bg-white rounded-lg p-3`}>
                    {status.recommendation}
                </p>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-3 gap-4">
                {/* Salary */}
                <div className="bg-gradient from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                    <p className="text-green-600 text-xs font-medium uppercase">Monthly Salary</p>
                    <p className="text-2xl font-bold text-green-700 mt-2">
                        ₹{salary.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>

                {/* Spent */}
                <div className="bg-gradient from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
                    <p className="text-orange-600 text-xs font-medium uppercase">Amount Spent</p>
                    <p className="text-2xl font-bold text-orange-700 mt-2">
                        ₹{totalExpenses.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>

                {/* Remaining */}
                <div className={`bg-gradient ${remaining >= 0 ? "from-blue-50 to-blue-100 border-blue-200" : "from-red-50 to-red-100 border-red-200"} border rounded-lg p-4`}>
                    <p className={`text-xs font-medium uppercase ${remaining >= 0 ? "text-blue-600" : "text-red-600"}`}>
                        Amount Left
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${remaining >= 0 ? "text-blue-700" : "text-red-700"}`}>
                        ₹{remaining.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>
            </div>

            {/* Budget Allocation */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-gray-800 mb-4">📊 Recommended Budget Allocation</h4>
                <div className="space-y-4">
                    {Object.entries(allocation).map(([key, value]) => (
                        <div key={key}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-gray-700">{value.label}</span>
                                <span className="text-sm font-bold text-gray-600">
                                    {value.percentage}% (₹{value.amount.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })})
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className={`h-full rounded-full ${key === "essential"
                                        ? "bg-green-500"
                                        : key === "discretionary"
                                            ? "bg-blue-500"
                                            : "bg-purple-500"
                                        }`}
                                    style={{ width: `${value.percentage}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SalaryOverview;
