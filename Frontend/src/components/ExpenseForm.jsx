import { useState, useEffect } from "react";
import { checkSpendingAlert } from "../utils/spendingUtils";

const COMMON_TITLES = [
    "Groceries",
    "Gas/Fuel",
    "Restaurant",
    "Online Shopping",
    "Movie Tickets",
    "Coffee",
    "Gym Membership",
    "Internet Bill",
    "Phone Bill",
    "Electricity Bill",
    "Water Bill",
    "Insurance",
    "Doctor Visit",
    "Pharmacy",
    "Haircut",
    "Car Maintenance",
    "Rent",
    "Clothing",
    "Book",
    "Transportation"
];

const COMMON_CATEGORIES = [
    "Food",
    "Transportation",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Health",
    "Fitness",
    "Education",
    "Groceries",
    "Housing",
    "Insurance",
    "Subscriptions",
    "Personal",
    "Work",
    "Travel"
];

const DEFAULT_FORM = {
    title: "",
    amount: "",
    category: "",
    date: "",
};

function ExpenseForm({ onAddExpense, expenses = [] }) {
    const [formValues, setFormValues] = useState(DEFAULT_FORM);
    const [spendingAlert, setSpendingAlert] = useState(null);

    // Check for spending alerts when category or amount changes
    useEffect(() => {
        if (formValues.category && formValues.amount) {
            const alert = checkSpendingAlert(
                formValues.category,
                Number(formValues.amount),
                expenses
            );
            setSpendingAlert(alert.hasAlert ? alert : null);
        } else {
            setSpendingAlert(null);
        }
    }, [formValues.category, formValues.amount, expenses]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const cleanedExpense = {
            title: formValues.title.trim(),
            amount: Number(formValues.amount),
            category: formValues.category.trim(),
            date: formValues.date,
        };
        if (!cleanedExpense.title || !cleanedExpense.amount || !cleanedExpense.date) {
            return;
        }
        onAddExpense(cleanedExpense);
        setFormValues(DEFAULT_FORM);
    };
    return (
        <form
            className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow"
            onSubmit={handleSubmit}
        >
            <h2 className="text-xl font-semibold">Add expense</h2>

            {/* Spending Alert - Danger */}
            {spendingAlert && spendingAlert.severity === "danger" && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <p className="text-red-800 font-semibold">🚨 {spendingAlert.message}</p>
                </div>
            )}

            {/* Spending Alert - Warning */}
            {spendingAlert && spendingAlert.severity === "warning" && (
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="text-yellow-800 font-semibold">{spendingAlert.message}</p>
                </div>
            )}

            <div className="mt-4 grid gap-4 md:grid-cols-2">
                {/* Title Field with Datalist Dropdown */}
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                    Title
                    <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        list="title-options"
                        name="title"
                        placeholder="Select or type title"
                        value={formValues.title}
                        onChange={handleChange}
                        required
                    />
                    <datalist id="title-options">
                        {COMMON_TITLES.map((title) => (
                            <option key={title} value={title} />
                        ))}
                    </datalist>
                </label>

                {/* Amount Field */}
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                    Amount
                    <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="120.50"
                        value={formValues.amount}
                        onChange={handleChange}
                        required
                    />
                </label>

                {/* Category Field with Datalist Dropdown */}
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                    Category
                    <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        list="category-options"
                        name="category"
                        placeholder="Select or type category"
                        value={formValues.category}
                        onChange={handleChange}
                    />
                    <datalist id="category-options">
                        {COMMON_CATEGORIES.map((category) => (
                            <option key={category} value={category} />
                        ))}
                    </datalist>
                </label>

                {/* Date Field */}
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                    Date
                    <input
                        className="rounded-lg border border-gray-200 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="date"
                        type="date"
                        value={formValues.date}
                        onChange={handleChange}
                        required
                    />
                </label>
            </div>

            <button
                className="mt-6 w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
                type="submit"
            >
                Save expense
            </button>
        </form>
    );
}

export default ExpenseForm;
