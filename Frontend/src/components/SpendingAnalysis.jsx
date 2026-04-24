import { getSpendingAnalysis, getSpendingRecommendations } from "../utils/spendingUtils";

function SpendingAnalysis({ expenses = [] }) {
    if (expenses.length === 0) {
        return (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <p className="text-blue-800 font-semibold">
                    📊 No expenses yet. Add some expenses to see spending analysis and recommendations.
                </p>
            </div>
        );
    }

    const analysis = getSpendingAnalysis(expenses);
    const recommendations = getSpendingRecommendations(expenses);

    return (
        <div className="space-y-6">
            {/* Spending Analysis by Category */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">💰 Spending Analysis</h3>

                <div className="space-y-4">
                    {analysis.map((item, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg border-l-4 ${item.status === "danger"
                                    ? "bg-red-50 border-red-500"
                                    : item.status === "warning"
                                        ? "bg-yellow-50 border-yellow-500"
                                        : item.status === "caution"
                                            ? "bg-orange-50 border-orange-500"
                                            : "bg-green-50 border-green-500"
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-800">
                                        {item.category}
                                        {item.isUnnecessary && " (Discretionary)"}
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        ₹{item.total.toFixed(2)} of ₹{item.limit}
                                    </p>
                                </div>
                                <span
                                    className={`text-lg font-bold ${item.status === "danger"
                                            ? "text-red-600"
                                            : item.status === "warning"
                                                ? "text-yellow-600"
                                                : item.status === "caution"
                                                    ? "text-orange-600"
                                                    : "text-green-600"
                                        }`}
                                >
                                    {item.percentageOfLimit.toFixed(0)}%
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-300 rounded-full h-2">
                                <div
                                    className={`h-2 rounded-full transition-all ${item.status === "danger"
                                            ? "bg-red-600"
                                            : item.status === "warning"
                                                ? "bg-yellow-600"
                                                : item.status === "caution"
                                                    ? "bg-orange-600"
                                                    : "bg-green-600"
                                        }`}
                                    style={{
                                        width: `${Math.min(item.percentageOfLimit, 100)}%`,
                                    }}
                                />
                            </div>

                            {/* Status Message */}
                            {item.status === "danger" && (
                                <p className="text-sm text-red-700 mt-2 font-semibold">
                                    🚨 You've exceeded your limit for {item.category}!
                                </p>
                            )}
                            {item.status === "warning" && (
                                <p className="text-sm text-yellow-700 mt-2 font-semibold">
                                    ⚠️ You're approaching your limit for {item.category}
                                </p>
                            )}
                            {item.status === "caution" && (
                                <p className="text-sm text-orange-700 mt-2">
                                    💡 Halfway to your {item.category} limit
                                </p>
                            )}
                            {item.status === "safe" && (
                                <p className="text-sm text-green-700 mt-2">
                                    ✅ Good spending on {item.category}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Recommendations</h3>

                <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg ${rec.includes("Critical") || rec.includes("🔴")
                                    ? "bg-red-50 text-red-800 border border-red-200"
                                    : rec.includes("Caution") || rec.includes("🟡")
                                        ? "bg-yellow-50 text-yellow-800 border border-yellow-200"
                                        : "bg-green-50 text-green-800 border border-green-200"
                                }`}
                        >
                            <p className="font-semibold text-sm">{rec}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spending Tips */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-800 mb-3">📌 Smart Spending Tips</h3>
                <ul className="text-blue-700 space-y-2 text-sm">
                    <li>✓ Set realistic budgets for discretionary spending (Entertainment, Shopping, etc.)</li>
                    <li>✓ Review your spending weekly to catch trends early</li>
                    <li>✓ Cut unnecessary subscriptions that you don't actively use</li>
                    <li>✓ Try the "wait 24 hours" rule before making non-essential purchases</li>
                    <li>✓ Track every expense, even small ones - they add up!</li>
                    <li>✓ Look for cheaper alternatives for categories where you spend the most</li>
                </ul>
            </div>
        </div>
    );
}

export default SpendingAnalysis;
