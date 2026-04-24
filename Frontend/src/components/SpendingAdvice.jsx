import { generateSpendingAdvice } from "../utils/salaryUtils";

function SpendingAdvice({ expenses, salary }) {
    const advice = generateSpendingAdvice(expenses, salary);

    if (advice.length === 0) {
        return null;
    }

    const getAdviceStyles = (type) => {
        switch (type) {
            case "success":
                return {
                    bg: "bg-green-50",
                    border: "border-green-300",
                    text: "text-green-700",
                    icon: "✓"
                };
            case "warning":
                return {
                    bg: "bg-yellow-50",
                    border: "border-yellow-300",
                    text: "text-yellow-700",
                    icon: "⚠️"
                };
            case "danger":
                return {
                    bg: "bg-red-50",
                    border: "border-red-300",
                    text: "text-red-700",
                    icon: "🚨"
                };
            case "info":
            default:
                return {
                    bg: "bg-blue-50",
                    border: "border-blue-300",
                    text: "text-blue-700",
                    icon: "ℹ️"
                };
        }
    };

    return (
        <div className="space-y-3">
            <h3 className="text-xl font-bold text-gray-800 mb-4">💡 Spending Advice</h3>

            {advice.map((item, index) => {
                const styles = getAdviceStyles(item.type);
                return (
                    <div
                        key={index}
                        className={`${styles.bg} border-2 ${styles.border} rounded-lg p-4 ${styles.text}`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-xl mt-1">{styles.icon}</span>
                            <p className="text-sm font-medium leading-relaxed">{item.message}</p>
                        </div>
                    </div>
                );
            })}

            {/* Tips Section */}
            <div className="bg-gradient from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg p-4 mt-6">
                <p className="text-sm font-bold text-indigo-900 mb-3">🎯 Quick Tips to Save Money:</p>
                <ul className="text-sm text-indigo-800 space-y-2">
                    <li>✓ Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</li>
                    <li>✓ Track small expenses - they add up quickly</li>
                    <li>✓ Review subscriptions monthly and cancel unused ones</li>
                    <li>✓ Set a specific budget for discretionary categories</li>
                    <li>✓ Use the zero-based budgeting method</li>
                </ul>
            </div>
        </div>
    );
}

export default SpendingAdvice;
