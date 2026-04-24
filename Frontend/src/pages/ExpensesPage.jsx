import { useState } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import TotalCard from "../components/TotalCard";
import ExpenseList from "../components/ExpenseList";
import SalaryOverview from "../components/SalaryOverview";

function ExpensesPage({ expenses, onDelete, onEdit, editingExpense, onSaveEdit, onCancelEdit, salary }) {
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const handleFilterChange = (filtered) => {
        setFilteredExpenses(filtered);
    };

    const handleSearchChange = (filtered) => {
        setFilteredExpenses(filtered);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 pb-12 pt-6">
            <div className="max-w-6xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">📋 Your Expenses</h1>
                    <p className="mt-2 text-gray-600">
                        View, search, filter, edit, and manage all your expenses
                    </p>
                </div>

                {/* Salary Overview */}
                {salary && (
                    <div className="mb-8">
                        <SalaryOverview salary={salary} totalExpenses={totalExpenses} />
                    </div>
                )}

                {/* Search Bar */}
                {expenses.length > 0 && (
                    <SearchBar expenses={expenses} onSearchChange={handleSearchChange} />
                )}

                {/* Filter Bar */}
                {expenses.length > 0 && (
                    <FilterBar expenses={expenses} onFilterChange={handleFilterChange} />
                )}

                {/* Summary Cards */}
                {filteredExpenses.length > 0 && <TotalCard expenses={filteredExpenses} />}

                {/* Expense List */}
                <ExpenseList
                    expenses={filteredExpenses}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            </div>
        </div>
    );
}

export default ExpensesPage;
