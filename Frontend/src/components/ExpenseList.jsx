import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete, onEdit }) {
    if (expenses.length === 0) {
        return (
            <div className="mx-auto max-w-3xl mt-8 text-center">
                <div className="rounded-lg bg-white p-12 shadow">
                    <p className="text-lg text-gray-500">
                        No expenses yet. Add one to get started!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Expenses</h2>
            <div className="space-y-3">
                {expenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    );
}

export default ExpenseList;
