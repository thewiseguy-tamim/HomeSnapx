import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiStar, // Added for Reviews icon
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Sidebar = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const customerMenus = [
    { to: "/dashboard/client", icon: FiBarChart2, label: "Dashboard", color: "text-blue-600" },
    { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart", color: "text-green-600" },
    { to: "/dashboard/orders", icon: FiShoppingCart, label: "Orders", color: "text-purple-600" },
    { to: "/dashboard/reviews", icon: FiStar, label: "Reviews", color: "text-yellow-600" }, 
  ];

const adminMenus = [
  { to: "/dashboard", icon: FiBarChart2, label: "Dashboard", color: "text-blue-600" },
  { to: "/dashboard/services", icon: FiPackage, label: "Services", color: "text-indigo-600" }, // Updated
  { to: "/dashboard/addService", icon: FiPlusCircle, label: "Add Service", color: "text-emerald-600" },
  { to: "/dashboard/cart", icon: FiShoppingCart, label: "Cart", color: "text-green-600" },
  { to: "/dashboard/orders", icon: FiShoppingCart, label: "Orders", color: "text-purple-600" },
  { to: "/dashboard/reviews", icon: FiStar, label: "Reviews", color: "text-yellow-600" }, 
  { to: "/dashboard/users", icon: FiUsers, label: "Users", color: "text-pink-600" },
];

  const menuItems = user?.role === 'ADMIN' ? adminMenus : customerMenus;

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="drawer-side z-10">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <aside className="bg-white/95 backdrop-blur-md w-64 min-h-full border-r border-slate-200/50 shadow-lg">
        {/* Sidebar header */}
        <div className="p-6 border-b border-slate-200/50">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <FiShoppingCart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">HomeSnap</h1>
            </div>
          </Link>
        </div>

        {/* User info section */}
        <div className="p-4 mx-4 mt-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.first_name?.[0] || user?.username?.[0] || 'U'}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">
                {user?.first_name || user?.username || 'User'}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {user?.role === 'ADMIN' ? 'Admin' : 'Client'}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar menu */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isCurrentPage = isActive(item.to);
              return (
                <li key={index}>
                  <Link 
                    to={item.to} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium ${
                      isCurrentPage 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105' 
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600 hover:scale-105 hover:shadow-md'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${
                      isCurrentPage ? 'text-white' : item.color
                    }`} />
                    <span className="text-sm tracking-wide">{item.label}</span>
                    {isCurrentPage && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick actions */}
        <div className="p-4 mx-4 mb-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left text-xs text-emerald-700 hover:text-emerald-800 font-medium transition-colors duration-200">
              View Analytics
            </button>
            <button className="w-full text-left text-xs text-emerald-700 hover:text-emerald-800 font-medium transition-colors duration-200">
              Generate Report
            </button>
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="mt-auto p-4 text-center">
          <div className="text-xs text-slate-500 font-medium">
            © 2025 HomeSnap
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Version 2.1.0
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;