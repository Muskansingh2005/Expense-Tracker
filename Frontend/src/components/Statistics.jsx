function Statistics({ expenses }) {
    if (expenses.length === 0) {
        return null;
    }

    // Calculate statistics
    const totalExpenses = expenses.length;
    const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);
    const averageAmount = (totalAmount / totalExpenses).toFixed(2);
    const highestAmount = Math.max(...expenses.map(e => e.amount)).toFixed(2);
    const lowestAmount = Math.min(...expenses.map(e => e.amount)).toFixed(2);
    const highestExpense = expenses.find(e => e.amount === Math.max(...expenses.map(x => x.amount)));

    // Most common category
    const categoryCount = expenses.reduce((acc, e) => {
        const cat = e.category || "Uncategorized";
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});
    const mostCommonCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0];

    // Expenses by day of week
    const dayOfWeekCount = {
        Monday: 0,
        Tuesday: 0,
        Wednesday: 0,
        Thursday: 0,
        Friday: 0,
        Saturday: 0,
        Sunday: 0,
    };

    expenses.forEach(e => {
        const day = new Date(e.date).toLocaleDateString('en-US', { weekday: 'long' });
        dayOfWeekCount[day]++;
    });

    const busiestDay = Object.entries(dayOfWeekCount).sort((a, b) => b[1] - a[1])[0];

    return (
        <div className="mx-auto max-w-3xl mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">📊 Statistics</h2>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* Total Expenses Count */}
                <div className="bg-white rounded-lg p-4 shadow border-l-4 border-blue-500">
                    <p className="text-gray-600 text-sm font-medium">Total Expenses</p>
                    <p className="text-3xl font-bold text-blue-600 mt-1">{totalExpenses}</p>
                </div>

                {/* Average Amount */}
                <div className="bg-white rounded-lg p-4 shadow border-l-4 border-green-500">
                    <p className="text-gray-600 text-sm font-medium">Average Expense</p>
                    <p className="text-3xl font-bold text-green-600 mt-1">${averageAmount}</p>
                </div>

                {/* Highest Amount */}
                <div className="bg-white rounded-lg p-4 shadow border-l-4 border-red-500">
                    <p className="text-gray-600 text-sm font-medium">Highest Expense</p>
                    <p className="text-3xl font-bold text-red-600 mt-1">${highestAmount}</p>
                    <p className="text-xs text-gray-500 mt-1">{highestExpense?.title}</p>
                </div>

                {/* Lowest Amount */}
                <div className="bg-white rounded-lg p-4 shadow border-l-4 border-yellow-500">
                    <p className="text-gray-600 text-sm font-medium">Lowest Expense</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-1">${lowestAmount}</p>
                </div>

                {/* Most Common Category */}
                <div className="bg-white rounded-lg p-4 shadow border-l-4 border-purple-500">
                    <p className="text-gray-600 text-sm font-medium">Most Common Category</p>
                    <p className="text-3xl font-bold text-purple-600 mt-1">
                        {mostCommonCategory[0]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{mostCommonCategory[1]} times</p>
                </div>

                {/* Busiest Day */}
                <div className="bg-white rounded-lg p-4 shadow border-l-4 border-indigo-500">
                    <p className="text-gray-600 text-sm font-medium">Most Expenses On</p>
                    <p className="text-3xl font-bold text-indigo-600 mt-1">
                        {busiestDay[0]}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{busiestDay[1]} expenses</p>
                </div>
            </div>
        </div>
    );
}

export default Statistics;
