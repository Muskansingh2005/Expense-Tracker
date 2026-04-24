import { useState } from "react";

function SearchBar({ expenses, onSearchChange }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (term) => {
        setSearchTerm(term);

        if (term.trim() === "") {
            onSearchChange(expenses);
        } else {
            const filtered = expenses.filter(expense =>
                expense.title.toLowerCase().includes(term.toLowerCase())
            );
            onSearchChange(filtered);
        }
    };

    return (
        <div className="mx-auto max-w-3xl mt-4 mb-6">
            <input
                type="text"
                placeholder="🔍 Search expenses by title..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
                <p className="mt-2 text-sm text-gray-600">
                    Found {expenses.length} result{expenses.length !== 1 ? "s" : ""}
                </p>
            )}
        </div>
    );
}

export default SearchBar;
