// Salary and Budget Management Utilities

/**
 * Calculate spending percentage of salary
 * @param {Number} totalExpenses - Total amount spent
 * @param {Number} salary - Monthly salary
 * @returns {Number} Percentage (0-100)
 */
export const calculateSpendingPercentage = (totalExpenses, salary) => {
  if (!salary || salary === 0) return 0;
  return Math.min((totalExpenses / salary) * 100, 100);
};

/**
 * Calculate remaining budget
 * @param {Number} salary - Monthly salary
 * @param {Number} totalExpenses - Total expenses
 * @returns {Number} Remaining amount
 */
export const calculateRemainingBudget = (salary, totalExpenses) => {
  return Math.max(salary - totalExpenses, 0);
};

/**
 * Get spending status based on percentage
 * @param {Number} percentage - Spending percentage
 * @returns {Object} Status with color, label, and recommendation
 */
export const getSpendingStatus = (percentage) => {
  if (percentage <= 30) {
    return {
      status: "Excellent",
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      icon: "✨",
      recommendation: "Great control! You're saving well.",
    };
  } else if (percentage <= 50) {
    return {
      status: "Good",
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      icon: "👍",
      recommendation: "Good spending habits. Keep it up!",
    };
  } else if (percentage <= 75) {
    return {
      status: "Moderate",
      color: "yellow",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
      icon: "⚠️",
      recommendation: "Be mindful of discretionary spending.",
    };
  } else if (percentage < 100) {
    return {
      status: "High",
      color: "orange",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
      icon: "🚨",
      recommendation:
        "You're spending most of your salary. Consider reducing expenses.",
    };
  } else {
    return {
      status: "Critical",
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      icon: "❌",
      recommendation:
        "You've exceeded your salary! Cut back on expenses immediately.",
    };
  }
};

/**
 * Generate spending advice based on expenses and salary
 * @param {Array} expenses - Array of expense objects
 * @param {Number} salary - Monthly salary
 * @returns {Array} Array of advice items
 */
export const generateSpendingAdvice = (expenses, salary) => {
  const advice = [];

  if (!salary) {
    advice.push({
      type: "info",
      message: "💡 Set your salary to get personalized spending advice.",
      priority: 1,
    });
    return advice;
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const percentage = calculateSpendingPercentage(totalExpenses, salary);

  // Check overall spending
  if (percentage > 100) {
    advice.push({
      type: "danger",
      message: `🚨 You've spent ${Math.round(percentage)}% of your salary! Reduce expenses immediately.`,
      priority: 1,
    });
  } else if (percentage > 80) {
    advice.push({
      type: "warning",
      message: `⚠️ You've spent ${Math.round(percentage)}% of your salary. Be more careful with discretionary spending.`,
      priority: 1,
    });
  }

  // Category-wise analysis
  const categoryTotals = {};
  expenses.forEach((exp) => {
    const category = exp.category || "Other";
    categoryTotals[category] = (categoryTotals[category] || 0) + exp.amount;
  });

  // Find top spending category
  const sortedCategories = Object.entries(categoryTotals).sort(
    (a, b) => b[1] - a[1],
  );
  if (sortedCategories.length > 0) {
    const topCategory = sortedCategories[0];
    const categoryPercentage = (topCategory[1] / totalExpenses) * 100;

    if (categoryPercentage > 40) {
      advice.push({
        type: "warning",
        message: `📊 ${topCategory[0]} accounts for ${Math.round(categoryPercentage)}% of your spending. Consider reducing this.`,
        priority: 2,
      });
    }
  }

  // Food spending advice
  if (categoryTotals["Food"] && categoryTotals["Food"] > salary * 0.25) {
    advice.push({
      type: "info",
      message: `🍽️ Your food expenses are ${Math.round((categoryTotals["Food"] / salary) * 100)}% of salary. Consider meal planning to reduce costs.`,
      priority: 2,
    });
  }

  // Entertainment spending advice
  if (
    categoryTotals["Entertainment"] &&
    categoryTotals["Entertainment"] > salary * 0.1
  ) {
    advice.push({
      type: "info",
      message: `🎬 Entertainment spending is ${Math.round((categoryTotals["Entertainment"] / salary) * 100)}% of salary. Review subscriptions and outings.`,
      priority: 3,
    });
  }

  // Positive reinforcement
  if (percentage <= 50) {
    advice.push({
      type: "success",
      message: `✨ Excellent job! You're spending ${Math.round(percentage)}% of your salary and saving well.`,
      priority: 2,
    });
  }

  // Savings suggestion
  const remaining = calculateRemainingBudget(salary, totalExpenses);
  if (percentage < 100 && remaining > 0) {
    advice.push({
      type: "success",
      message: `💰 You have ₹${remaining.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} left. Consider saving or investing this amount.`,
      priority: 3,
    });
  }

  return advice.sort((a, b) => a.priority - b.priority);
};

/**
 * Calculate monthly expense trends
 * @param {Array} expenses - Array of expense objects
 * @returns {Object} Monthly breakdown with totals
 */
export const calculateMonthlyTrends = (expenses) => {
  const monthlyData = {};

  expenses.forEach((expense) => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + expense.amount;
  });

  return Object.entries(monthlyData)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, total]) => ({
      month,
      total: parseFloat(total.toFixed(2)),
      displayMonth: new Date(`${month}-01`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
    }));
};

/**
 * Get budget allocation recommendations
 * @param {Number} salary - Monthly salary
 * @returns {Object} Recommended allocation percentages
 */
export const getBudgetAllocation = (salary) => {
  return {
    essential: {
      label: "Essential",
      percentage: 50,
      amount: salary * 0.5,
      description: "Housing, utilities, groceries, transportation",
    },
    discretionary: {
      label: "Discretionary",
      percentage: 30,
      amount: salary * 0.3,
      description: "Entertainment, dining, shopping, hobbies",
    },
    savings: {
      label: "Savings",
      percentage: 20,
      amount: salary * 0.2,
      description: "Emergency fund, investments, future planning",
    },
  };
};

/**
 * Compare current spending against recommended allocation
 * @param {Array} expenses - Array of expenses
 * @param {Number} salary - Monthly salary
 * @returns {Object} Comparison data
 */
export const compareBudgetAllocation = (expenses, salary) => {
  const recommended = getBudgetAllocation(salary);
  const categoryTotals = {};

  expenses.forEach((exp) => {
    const category = exp.category || "Other";
    categoryTotals[category] = (categoryTotals[category] || 0) + exp.amount;
  });

  // Categorize expenses
  const essential =
    (categoryTotals["Food"] || 0) +
    (categoryTotals["Transport"] || 0) +
    (categoryTotals["Utilities"] || 0);
  const discretionary =
    (categoryTotals["Entertainment"] || 0) +
    (categoryTotals["Shopping"] || 0) +
    (categoryTotals["Dining"] || 0);
  const savings = 0; // User doesn't track savings as expenses

  return {
    essential: {
      recommended: recommended.essential,
      actual: essential,
      percentage: (essential / salary) * 100,
      status: essential <= recommended.essential.amount ? "good" : "exceeded",
    },
    discretionary: {
      recommended: recommended.discretionary,
      actual: discretionary,
      percentage: (discretionary / salary) * 100,
      status:
        discretionary <= recommended.discretionary.amount ? "good" : "exceeded",
    },
    savings: {
      recommended: recommended.savings,
      actual: savings,
      percentage: 0,
      status: "pending",
    },
  };
};
