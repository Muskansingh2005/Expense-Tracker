// Spending Analysis Utilities

// Categories considered "unnecessary" or discretionary
const UNNECESSARY_CATEGORIES = [
    "Entertainment",
    "Shopping",
    "Coffee",
    "Movie Tickets",
    "Online Shopping",
    "Subscriptions",
    "Personal"
];

// Spending limits for each category (in currency units)
const CATEGORY_LIMITS = {
    Entertainment: 500,
    Shopping: 800,
    Coffee: 100,
    "Movie Tickets": 200,
    "Online Shopping": 1000,
    Subscriptions: 300,
    Personal: 400,
    Food: 1000,
    Restaurant: 600,
};

/**
 * Calculate total expenses
 * @param {Array} expenses - Array of expense objects
 * @returns {Number} Total amount spent
 */
export const calculateTotalExpenses = (expenses) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
};

/**
 * Calculate total expenses by category
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} Object with categories as keys and totals as values
 */
export const calculateExpensesByCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
        const category = expense.category || "Other";
        acc[category] = (acc[category] || 0) + expense.amount;
        return acc;
    }, {});
};

/**
 * Check if an expense exceeds limits for unnecessary categories
 * @param {String} category - Expense category
 * @param {Number} amount - Expense amount
 * @param {Array} expenses - Array of all expenses
 * @returns {Object} Alert information {hasAlert: boolean, message: string, severity: 'warning' | 'danger'}
 */
export const checkSpendingAlert = (category, amount, expenses = []) => {
    // Check if category is unnecessary
    const isUnnecessary = UNNECESSARY_CATEGORIES.some(
        (cat) => cat.toLowerCase() === category.toLowerCase()
    );

    if (!isUnnecessary) {
        return { hasAlert: false };
    }

    // Calculate current spending in this category
    const categoryExpenses = expenses.filter(
        (exp) => exp.category.toLowerCase() === category.toLowerCase()
    );
    const currentTotal = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const newTotal = currentTotal + amount;

    const limit = CATEGORY_LIMITS[category] || 500;

    // Check if exceeding limit
    if (newTotal > limit) {
        const excess = (newTotal - limit).toFixed(2);
        return {
            hasAlert: true,
            message: `⚠️ Warning: You're spending excessively on "${category}"! This will exceed your limit by ₹${excess}. Current: ₹${currentTotal.toFixed(2)} + ₹${amount} = ₹${newTotal.toFixed(2)} (Limit: ₹${limit})`,
            severity: "danger",
            excess: excess,
            limit: limit,
            currentTotal: newTotal
        };
    }

    // Check if approaching limit (80% or more)
    if (newTotal >= limit * 0.8) {
        const remaining = (limit - newTotal).toFixed(2);
        return {
            hasAlert: true,
            message: `💡 Alert: You're approaching your "${category}" limit. Only ₹${remaining} remaining out of ₹${limit}. Current: ₹${currentTotal.toFixed(2)} + ₹${amount} = ₹${newTotal.toFixed(2)}`,
            severity: "warning",
            remaining: remaining,
            limit: limit,
            currentTotal: newTotal
        };
    }

    return { hasAlert: false };
};

/**
 * Get spending analysis for all categories
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Array of category analysis
 */
export const getSpendingAnalysis = (expenses) => {
    const byCategory = calculateExpensesByCategory(expenses);

    return Object.entries(byCategory).map(([category, total]) => {
        const limit = CATEGORY_LIMITS[category] || 1000;
        const isUnnecessary = UNNECESSARY_CATEGORIES.some(
            (cat) => cat.toLowerCase() === category.toLowerCase()
        );
        const percentageOfLimit = (total / limit) * 100;

        return {
            category,
            total,
            limit,
            isUnnecessary,
            percentageOfLimit,
            status:
                percentageOfLimit >= 100 ? "danger" :
                percentageOfLimit >= 80 ? "warning" :
                percentageOfLimit >= 50 ? "caution" :
                "safe"
        };
    });
};

/**
 * Get recommendations for user based on spending
 * @param {Array} expenses - Array of expense objects
 * @returns {Array} Array of recommendation strings
 */
export const getSpendingRecommendations = (expenses) => {
    const analysis = getSpendingAnalysis(expenses);
    const recommendations = [];

    for (const item of analysis) {
        if (item.isUnnecessary && item.status === "danger") {
            recommendations.push(
                `🔴 Critical: Reduce spending on "${item.category}" (Currently ₹${item.total.toFixed(2)}, limit ₹${item.limit})`
            );
        } else if (item.isUnnecessary && item.status === "warning") {
            recommendations.push(
                `🟡 Caution: Monitor "${item.category}" spending (₹${item.total.toFixed(2)} of ₹${item.limit})`
            );
        }
    }

    // Add general recommendations
    const totalSpent = calculateTotalExpenses(expenses);
    if (expenses.length > 0) {
        const avgExpense = totalSpent / expenses.length;
        recommendations.push(
            `📊 Average expense per transaction: ₹${avgExpense.toFixed(2)}`
        );
    }

    return recommendations.length > 0 ? recommendations : [
        "✅ Great! Your spending looks healthy. Keep it up!"
    ];
};
