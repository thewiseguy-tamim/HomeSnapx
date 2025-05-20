import { FiMenu, FiX, FiBell, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const Navbar = ({ sidebarOpen }) => {
  const { logoutUser } = useAuthContext();

  return (
    <div className="navbar bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-sm sticky top-0 z-50">
      <div className="flex-none lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost hover:bg-blue-50 transition-colors duration-200">
          {sidebarOpen ? (
            <FiX className="h-5 w-5 text-slate-700" />
          ) : (
            <FiMenu className="h-5 w-5 text-slate-700" />
          )}
        </label>
      </div>
      
      <div className="flex-1">
        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
          
        </h2>
      </div>

      <div className="flex-none gap-3">
        {/* Search button */}
        <button className="btn btn-ghost btn-circle hover:bg-blue-50 transition-colors duration-200">
          <FiSearch className="h-5 w-5 text-slate-600" />
        </button>

        {/* Notifications */}
        <button className="btn btn-ghost btn-circle hover:bg-blue-50 transition-colors duration-200 relative">
          <FiBell className="h-5 w-5 text-slate-600" />
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* User dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-blue-200 transition-all duration-200">
            <div className="w-10 rounded-full ring-2 ring-white shadow-lg">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="rounded-full"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-white rounded-xl border border-slate-200 w-56"
          >
            <li className="mb-2">
              <div className="text-sm font-medium text-slate-700 px-3 py-2 bg-slate-50 rounded-lg mb-2">
                Welcome back!
              </div>
            </li>
            <li>
              <Link 
                to="/dashboard/profile" 
                className="flex items-center justify-between py-3 px-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-slate-700"
              >
                <span className="font-medium">Profile</span>
                <span className="badge badge-primary badge-sm">New</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                className="py-3 px-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-slate-700 font-medium"
              >
                Home
              </Link>
            </li>
            <div className="divider my-2"></div>
            <li>
              <button 
                onClick={logoutUser} 
                className="w-full text-left py-3 px-3 hover:bg-red-50 rounded-lg transition-colors duration-200 text-red-600 font-medium"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;