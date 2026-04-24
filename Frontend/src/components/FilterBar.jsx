import { useState } from "react";

function FilterBar({ expenses, onFilterChange }) {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // Get unique categories from expenses
    const categories = ["all", ...new Set(expenses.map(e => e.category || "Uncategorized"))];

    // Handle filter changes
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        applyFilters(category, startDate, endDate);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
        applyFilters(selectedCategory, date, endDate);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        applyFilters(selectedCategory, startDate, date);
    };

    const applyFilters = (category, start, end) => {
        let filtered = expenses;

        // Filter by category
        if (category !== "all") {
            filtered = filtered.filter(e => (e.category || "Uncategorized") === category);
        }

        // Filter by date range
        if (start) {
            filtered = filtered.filter(e => new Date(e.date) >= new Date(start));
        }
        if (end) {
            filtered = filtered.filter(e => new Date(e.date) <= new Date(end));
        }

        onFilterChange(filtered);
    };

    const handleReset = () => {
        setSelectedCategory("all");
        setStartDate("");
        setEndDate("");
        onFilterChange(expenses);
    };

    return (
        <div className="mx-auto max-w-3xl mt-8 bg-white rounded-lg p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Expenses</h3>

            <div className="grid gap-4 md:grid-cols-3">
                {/* Category Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Start Date Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Date
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => handleStartDateChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                </div>

                {/* End Date Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        To Date
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => handleEndDateChange(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                    />
                </div>
            </div>

            {/* Reset Button */}
            <button
                onClick={handleReset}
                className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
            >
                Reset Filters
            </button>
        </div>
    );
}

export default FilterBar;
