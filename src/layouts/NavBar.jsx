
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import { LogOut, ShoppingCart, Menu, X, Home, Wrench, Info, Phone, User, Settings } from 'lucide-react';
import useCartContext from '../hooks/useCartContext';

const NavBar = () => {
  const { user, logoutUser } = useAuthContext();
  const { cart } = useCartContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const itemCount = cart?.items?.length || 0;
  const subtotal = cart?.items
    ? cart.items
        .reduce((total, item) => total + item.service.price * item.quantity, 0)
        .toFixed(2)
    : '0.00';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/shop', icon: Wrench },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact Us', path: '/contact', icon: Phone },
  ];

  const dashboardPath = user?.role === 'ADMIN' ? '/dashboard' : '/dashboard/client';

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          
          .navbar-glass {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.95);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .navbar-scrolled {
            backdrop-filter: blur(25px);
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }
          
          .nav-link {
            position: relative;
            transition: all 0.3s ease;
            font-weight: 500;
          }
          
          .nav-link::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            border-radius: 2px;
            transition: width 0.3s ease;
          }
          
          .nav-link:hover::after,
          .nav-link.active::after {
            width: 100%;
          }
          
          .nav-link:hover {
            color: #3b82f6;
            transform: translateY(-1px);
          }
          
          .logo-gradient {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
            font-size: 1.5rem;
            letter-spacing: -0.025em;
          }
          
          .cart-badge {
            animation: pulse 2s infinite;
          }
          
          .mobile-menu {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.98);
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .btn-modern {
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border: none;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
          
          .btn-modern:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
            background: linear-gradient(135deg, #1d4ed8, #1e40af);
          }
          
          .avatar-ring {
            background: linear-gradient(135deg, #3b82f6, #7c3aed);
            padding: 3px;
            border-radius: 50%;
          }
          
          .dropdown-modern {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.98);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          .menu-item-hover {
            transition: all 0.2s ease;
          }
          
          .menu-item-hover:hover {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(124, 58, 237, 0.1));
            transform: translateX(4px);
          }
        `}
      </style>

      <nav className={`fixed top-0 left-0 right-0 z-50 navbar-glass ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="logo-gradient font-inter">
                HomeSnap
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link text-slate-700 hover:text-blue-600 px-3 py-2 text-sm font-medium font-inter ${
                      isActive ? 'active text-blue-600' : ''
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              
              {/* Cart (logged in users only) */}
              {user && (
                <div className="relative group">
                  <Link
                    to="/dashboard/cart/"
                    className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <ShoppingCart size={22} />
                    {itemCount > 0 && (
                      <span className="cart-badge absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                  
                  {/* Cart Tooltip */}
                  {itemCount > 0 && (
                    <div className="absolute right-0 mt-2 w-64 dropdown-modern rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="text-sm font-semibold text-slate-800 mb-2">
                        {itemCount} {itemCount === 1 ? 'Item' : 'Items'} in Cart
                      </div>
                      <div className="text-xs text-slate-600 mb-3">
                        Subtotal: <span className="font-bold text-blue-600">${subtotal}</span>
                      </div>
                      <Link to="/dashboard/cart/">
                        <button className="w-full btn-modern text-sm py-2">
                          View Cart
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* User Menu or Login */}
              {user ? (
                <div className="relative group">
                  <button className="avatar-ring rounded-full">
                    <img
                      alt="User avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute right-0 mt-3 w-56 dropdown-modern rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-3 py-2 text-sm font-medium text-slate-700 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mb-2">
                      Welcome back! 👋
                    </div>
                    
                    <Link 
                      to="/dashboard/profile" 
                      className="menu-item-hover flex items-center justify-between px-3 py-2 text-sm text-slate-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>Profile</span>
                      </div>
                      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    </Link>
                    
                    <Link 
                      to={dashboardPath} 
                      className="menu-item-hover flex items-center space-x-2 px-3 py-2 text-sm text-slate-700 rounded-lg"
                    >
                      <Settings size={16} />
                      <span>Dashboard</span>
                    </Link>
                    
                    <div className="border-t border-slate-200 my-2"></div>
                    
                    <button 
                      onClick={logoutUser} 
                      className="w-full menu-item-hover flex items-center space-x-2 px-3 py-2 text-sm text-red-600 rounded-lg"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn-modern">
                    Sign In
                  </button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-blue-600 transition-colors duration-200"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mobile-menu border-t border-white/20">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`
                    }
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16 lg:h-18"></div>
    </>
  );
};

export default NavBar;
