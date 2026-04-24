import { Link } from "react-router-dom";

function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Children (pages) render here, navbar is in App */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* About */}
                        <div>
                            <h3 className="text-lg font-bold mb-3">💰 Expense Tracker</h3>
                            <p className="text-gray-400">
                                Track what you spend, stay in control.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-3">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                                <li><Link to="/add-expense" className="hover:text-white transition">Add Expense</Link></li>
                                <li><Link to="/expenses" className="hover:text-white transition">View Expenses</Link></li>
                                <li><Link to="/statistics" className="hover:text-white transition">Statistics</Link></li>
                            </ul>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-bold mb-3">Features</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>✓ Add & Delete Expenses</li>
                                <li>✓ Search & Filter</li>
                                <li>✓ Edit Expenses</li>
                                <li>✓ Advanced Statistics</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2026 Expense Tracker. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
