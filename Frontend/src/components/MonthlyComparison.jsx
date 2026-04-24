import { calculateMonthlyTrends } from "../utils/salaryUtils";

function MonthlyComparison({ expenses, salary }) {
    const monthlyData = calculateMonthlyTrends(expenses);

    if (monthlyData.length === 0) {
        return (
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600">📅 No monthly data available yet. Add expenses to see trends.</p>
            </div>
        );
    }

    // Calculate average and trends
    const average = monthlyData.length > 0
        ? monthlyData.reduce((sum, m) => sum + m.total, 0) / monthlyData.length
        : 0;

    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : null;

    const trend = previousMonth
        ? currentMonth.total - previousMonth.total
        : 0;

    const trendPercentage = previousMonth
        ? ((trend / previousMonth.total) * 100).toFixed(1)
        : 0;

    const maxValue = Math.max(...monthlyData.map(m => m.total), salary || 0);

    return (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-6">
            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Monthly Expense Trends</h3>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-600 text-xs font-medium uppercase">Average Monthly</p>
                    <p className="text-2xl font-bold text-blue-700 mt-2">
                        ₹{average.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                </div>

                <div className={`bg-gradient ${trend > 0 ? "from-red-50 to-red-100 border-red-200" : "from-green-50 to-green-100 border-green-200"
                    } border rounded-lg p-4`}>
                    <p className={`text-xs font-medium uppercase ${trend > 0 ? "text-red-600" : "text-green-600"}`}>
                        Current vs Previous
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${trend > 0 ? "text-red-700" : "text-green-700"}`}>
                        {trend > 0 ? "+" : ""}₹{trend.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} ({trendPercentage}%)
                    </p>
                </div>
            </div>

            {/* Bar Chart */}
            <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Monthly Breakdown</h4>
                <div className="space-y-3">
                    {monthlyData.map((month, index) => {
                        const barWidth = (month.total / maxValue) * 100;
                        const isOver = salary && month.total > salary;

                        return (
                            <div key={index}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700">{month.displayMonth}</span>
                                    <div className="text-right">
                                        <span className="text-sm font-bold text-gray-800">
                                            ₹{month.total.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        </span>
                                        {salary && (
                                            <span className={`text-xs ml-2 font-semibold ${isOver ? "text-red-600" : "text-green-600"
                                                }`}>
                                                {((month.total / salary) * 100).toFixed(0)}%
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${isOver ? "bg-red-500" : "bg-blue-500"
                                            }`}
                                        style={{ width: `${barWidth}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Salary Reference Line */}
            {salary && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-purple-700">
                            📌 Your Monthly Salary: ₹{salary.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </span>
                        <span className="text-xs text-purple-600">
                            Reference line for budget comparison
                        </span>
                    </div>
                </div>
            )}

            {/* Insights */}
            <div className="bg-gradient from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-indigo-900 mb-3">📈 Key Insights:</p>
                <ul className="text-sm text-indigo-800 space-y-2">
                    <li>
                        ✓ <span className="font-semibold">Highest Spending:</span> {monthlyData.reduce((max, m) => m.total > max.total ? m : max).displayMonth}
                        (₹{monthlyData.reduce((max, m) => m.total > max.total ? m : max).total.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })})
                    </li>
                    <li>
                        ✓ <span className="font-semibold">Lowest Spending:</span> {monthlyData.reduce((min, m) => m.total < min.total ? m : min).displayMonth}
                        (₹{monthlyData.reduce((min, m) => m.total < min.total ? m : min).total.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })})
                    </li>
                    {trend > 0 && (
                        <li className="text-red-700">
                            ⚠️ <span className="font-semibold">Spending is Increasing</span> - Be careful with new expenses
                        </li>
                    )}
                    {trend < 0 && (
                        <li className="text-green-700">
                            ✨ <span className="font-semibold">Spending is Decreasing</span> - Great job controlling expenses!
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default MonthlyComparison;
