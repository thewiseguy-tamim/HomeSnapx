import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { LogOut } from 'lucide-react';
import useCartContext from '../hooks/useCartContext';

const NavBar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();

  const itemCount = cart?.items?.length || 0;
  const subtotal = cart?.items
    ? cart.items
        .reduce((total, item) => total + item.service.price * item.quantity, 0)
        .toFixed(2)
    : '0.00';

  return (
    <>
      <style>
        {`
          .navbar, .navbar a, .navbar button, .navbar span {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
          }
        `}
      </style>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow font-bold"
            >
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl font-bold">
            <Link to="/">HomeSnap</Link>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Services</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">{itemCount}</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow font-bold"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">{itemCount} Items</span>
                  <span className="text-info font-bold">Subtotal: ${subtotal}</span>
                  <div className="card-actions">
                    <Link to="/dashboard/cart/">
                      <button className="btn btn-primary btn-block font-bold">View cart</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {user ? (
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
                    to="/dashboard" 
                    className="py-3 px-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 text-slate-700 font-medium"
                  >
                    Dashboard
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
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="btn btn-primary font-bold">Login</Link>
              {/* <Link to="/register" className="btn btn-primary font-bold">Register</Link> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;