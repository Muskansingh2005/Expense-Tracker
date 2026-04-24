function TotalCard({ expenses }) {
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const categoryBreakdown = expenses.reduce((acc, expense) => {
        const category = expense.category || "Uncategorized";
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
    }, {});

    return (
        <div className="mx-auto max-w-3xl mt-8">
            <div className="grid gap-4 md:grid-cols-2">
                {/* Total Amount Card */}
                <div className="rounded-lg from-blue-500 to-blue-600 text-white p-6 shadow">
                    <h3 className="text-sm font-semibold opacity-90">Total Spent</h3>
                    <p className="mt-2 text-4xl font-bold">
                        ${totalAmount.toFixed(2)}
                    </p>
                    <p className="mt-2 text-sm opacity-75">
                        {expenses.length} expense{expenses.length !== 1 ? "s" : ""}
                    </p>
                </div>

                {/* Category Breakdown Card */}
                <div className="rounded-lg bg-white border border-gray-200 p-6 shadow">
                    <h3 className="text-sm font-semibold text-gray-800">
                        By Category
                    </h3>
                    <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
                        {Object.entries(categoryBreakdown).length === 0 ? (
                            <p className="text-sm text-gray-400">No categories yet</p>
                        ) : (
                            Object.entries(categoryBreakdown).map(([category, amount]) => (
                                <div
                                    key={category}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <span className="text-gray-700">{category}</span>
                                    <span className="font-semibold text-gray-900">
                                        ${amount.toFixed(2)}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TotalCard;
