import { FiMenu, FiX, FiBell, FiSearch, FiUser, FiSettings, FiLogOut } from "react-icons/fi";
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
        <h2 className="text-xl font-bold text-slate-800 tracking-tight"></h2>
      </div>

      <div className="flex-none gap-3">
        {/* Search button */}
        {/* <button className="btn btn-ghost btn-circle hover:bg-blue-50 transition-colors duration-200">
          <FiSearch className="h-5 w-5 text-slate-600" />
        </button> */}

        {/* User dropdown */}
        <div className="relative group">
          <label className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-blue-200 transition-all duration-200">
            <div className="w-12 rounded-full ring-2 ring-white shadow-lg">
              <img
                alt="User avatar"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="rounded-full"
              />
            </div>
          </label>
          <div className="absolute right-0 mt-3 w-56 dropdown-modern rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white border border-slate-200 shadow-xl">
            <div className="px-3 py-2 text-sm font-medium text-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-2">
              Welcome back! 👋
            </div>

            <Link
              to="/dashboard/profile"
              className="menu-item-hover flex items-center justify-between px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2">
                <FiUser size={16} />
                <span>Profile</span>
              </div>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                New
              </span>
            </Link>

            <Link
              to="/"
              className="menu-item-hover flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <FiSettings size={16} />
              <span>Home</span>
            </Link>

            <div className="border-t border-slate-200 my-2"></div>

            <button
              onClick={logoutUser}
              className="w-full menu-item-hover flex items-center space-x-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <FiLogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;