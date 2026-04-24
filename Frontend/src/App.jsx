import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import EditExpenseModal from "./components/EditExpenseModal";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import AddExpensePage from "./pages/AddExpensePage";
import ExpensesPage from "./pages/ExpensesPage";
import StatisticsPage from "./pages/StatisticsPage";

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [salary, setSalary] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);

  // Load user-specific data from localStorage on mount or when user changes
  useEffect(() => {
    if (isAuthenticated && user) {
      const userExpensesKey = `expenses_${user.id}`;
      const userSalaryKey = `salary_${user.id}`;

      const savedExpenses = localStorage.getItem(userExpensesKey);
      const savedSalary = localStorage.getItem(userSalaryKey);

      if (savedExpenses) {
        try {
          setExpenses(JSON.parse(savedExpenses));
        } catch (error) {
          console.error("Error loading expenses:", error);
        }
      } else {
        setExpenses([]);
      }

      if (savedSalary) {
        try {
          setSalary(parseFloat(savedSalary));
        } catch (error) {
          console.error("Error loading salary:", error);
        }
      } else {
        setSalary(null);
      }
    }
  }, [isAuthenticated, user]);

  // Save expenses to user-specific localStorage whenever they change
  useEffect(() => {
    if (isAuthenticated && user) {
      const userExpensesKey = `expenses_${user.id}`;
      localStorage.setItem(userExpensesKey, JSON.stringify(expenses));
    }
  }, [expenses, isAuthenticated, user]);

  // Save salary to user-specific localStorage whenever it changes
  useEffect(() => {
    if (isAuthenticated && user && salary !== null) {
      const userSalaryKey = `salary_${user.id}`;
      localStorage.setItem(userSalaryKey, salary.toString());
    }
  }, [salary, isAuthenticated, user]);

  // Add new expense
  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(),
    };
    setExpenses((prev) => [expenseWithId, ...prev]);
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // Start editing expense
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
  };

  // Save edited expense
  const handleSaveEdit = (updatedExpense) => {
    const updatedExpenses = expenses.map((exp) =>
      exp.id === updatedExpense.id ? updatedExpense : exp
    );
    setExpenses(updatedExpenses);
    setEditingExpense(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleSetSalary = (salaryAmount) => {
    setSalary(salaryAmount);
  };

  // Show layout only for authenticated routes
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Navbar />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage salary={salary} onSetSalary={handleSetSalary} expenses={expenses} />
            </ProtectedRoute>
          }
        />

        {/* Add Expense Page */}
        <Route
          path="/add-expense"
          element={
            <ProtectedRoute>
              <AddExpensePage onAddExpense={handleAddExpense} expenses={expenses} />
            </ProtectedRoute>
          }
        />

        {/* View Expenses Page */}
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage
                expenses={expenses}
                onDelete={handleDeleteExpense}
                onEdit={handleEditExpense}
                editingExpense={editingExpense}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                salary={salary}
              />
            </ProtectedRoute>
          }
        />

        {/* Statistics Page */}
        <Route
          path="/statistics"
          element={
            <ProtectedRoute>
              <StatisticsPage expenses={expenses} salary={salary} onSetSalary={handleSetSalary} />
            </ProtectedRoute>
          }
        />

        {/* 404 Page - Catch all */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
                <a
                  href="/"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>

      {/* Edit Modal - Shows on all pages when editing */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;