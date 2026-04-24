import { useState } from "react";
import Statistics from "../components/Statistics";
import SpendingAnalysis from "../components/SpendingAnalysis";
import SalarySetup from "../components/SalarySetup";
import SalaryOverview from "../components/SalaryOverview";
import SpendingAdvice from "../components/SpendingAdvice";
import MonthlyComparison from "../components/MonthlyComparison";

function StatisticsPage({ expenses, salary, onSetSalary }) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div className="min-h-screen bg-gray-100 px-4 pb-12 pt-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">📊 Expense Statistics & Budget Analysis</h1>
                    <p className="mt-2 text-gray-600">
                        Analyze your spending patterns and get personalized financial insights
                    </p>
                </div>

                {expenses.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center shadow">
                        <div className="text-6xl mb-4">📊</div>
                        <p className="text-xl text-gray-500">
                            No expenses yet. Add some expenses to see statistics!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Salary Setup Section */}
                        {!salary && (
                            <div className="bg-white rounded-lg p-6 shadow">
                                <SalarySetup onSalarySet={onSetSalary} initialSalary={null} />
                            </div>
                        )}

                        {/* If salary is set, show salary overview and comparison */}
                        {salary && (
                            <>
                                <SalaryOverview salary={salary} totalExpenses={totalExpenses} />
                                <MonthlyComparison expenses={expenses} salary={salary} />
                                <SpendingAdvice expenses={expenses} salary={salary} />
                            </>
                        )}

                        {/* Traditional Statistics */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 Expense Breakdown</h2>
                            <Statistics expenses={expenses} />
                        </div>

                        {/* Spending Analysis Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 Spending Analysis</h2>
                            <SpendingAnalysis expenses={expenses} />
                        </div>

                        {/* Additional Insights */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Summary */}
                            <div className="bg-white rounded-lg p-6 shadow">
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">Summary</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li>
                                        <strong>Total Expenses:</strong> {expenses.length}
                                    </li>
                                    <li>
                                        <strong>Total Spent:</strong> ₹{totalExpenses.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                    </li>
                                    {salary && (
                                        <li>
                                            <strong>Monthly Salary:</strong> ₹{salary.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        </li>
                                    )}
                                    {salary && (
                                        <li>
                                            <strong>Remaining Budget:</strong> ₹{(salary - totalExpenses).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                                        </li>
                                    )}
                                    <li>
                                        <strong>Date Range:</strong> {expenses.length > 0 ? `${new Date(Math.min(...expenses.map(e => new Date(e.date)))).toLocaleDateString()} - ${new Date(Math.max(...expenses.map(e => new Date(e.date)))).toLocaleDateString()}` : 'N/A'}
                                    </li>
                                </ul>
                            </div>

                            {/* Tips */}
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                                <h3 className="text-2xl font-bold text-blue-800 mb-4">💡 Financial Tips</h3>
                                <ul className="space-y-3 text-blue-700 text-sm">
                                    <li>✓ Check your highest expense to find savings opportunities</li>
                                    <li>✓ Analyze category spending to adjust your budget</li>
                                    <li>✓ Track the busiest spending day to identify patterns</li>
                                    <li>✓ Review weekly to stay on top of your finances</li>
                                    {salary && <li>✓ Follow the 50/30/20 budget rule for optimal financial health</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatisticsPage;
