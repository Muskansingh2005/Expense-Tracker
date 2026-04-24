function ExpenseItem({ expense, onDelete, onEdit }) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
            {/* Left Side: Expense Details */}
            <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                    {expense.category && (
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mr-2">
                            {expense.category}
                        </span>
                    )}
                    <span className="text-gray-400">
                        {new Date(expense.date).toLocaleDateString()}
                    </span>
                </p>
            </div>

            {/* Right Side: Amount and Action Buttons */}
            <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-red-600">
                    ${expense.amount.toFixed(2)}
                </span>
                <button
                    onClick={() => onEdit(expense)}
                    className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-1 rounded transition font-semibold"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(expense.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded transition font-semibold"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ExpenseItem;
