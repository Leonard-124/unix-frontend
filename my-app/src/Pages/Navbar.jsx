import { useAuth0 } from "@auth0/auth0-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import React, { useState } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("/");
   const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const handleLogin = () => {
    sessionStorage.setItem("returnTo", location.pathname);
    loginWithRedirect();
  };

  const handleSignUp = () => {
    loginWithRedirect({
      screen_hint: "signup",
      appState: { returnTo: "/profile" },
    });
  };


  const handleNavClick = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "P";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const linkClasses = (page) =>
    `transition-colors duration-200 pb-1 font-medium ${
      currentPage === page
        ? "text-red-500 border-b-2 border-red-500"
        : "text-gray-700 hover:text-red-500 border-b-2 border-transparent"
    }`;

  const navLinks = [
    { label: "What's New", path: "/whats-new" },
    { label: "Inventions", path: "/inventions" },
    { label: "Artists & Inventors", path: "/artistinventor" },
    { label: "Buy", path: "/buy" },
    { label: "Artworks", path: "/artworks" },
  ];

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Desktop Search */}
          <div className="flex items-center gap-8 flex-1">
            <button
              onClick={() => handleNavClick("/")}
              className="font-bold text-2xl sm:text-3xl  whitespace-nowrap text-red-500 transition-colors duration-200"
            >
              Unix
            </button>

            {/* Desktop Search */}
            <div className="hidden sm:flex flex-1 max-w-xs">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg border-2 border-transparent transition-all duration-200 focus:outline-none focus:bg-white focus:border-red-500"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <HiSearch size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <NavLink
                to={link.path}
                className={linkClasses(link.path)}
              >
                {link.label}
              </NavLink>
            ))}

            {!isAuthenticated && (
              <div className="flex gap-3 ml-4 border-l border-gray-200 pl-4">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}

            {isAuthenticated && (
              <div className="flex gap-3 items-center ml-4 border-l border-gray-200 pl-4">
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  {getInitials(user?.name)}
                </button>
                <button
                  onClick={() => console.log("Logout")}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-red-500 transition-colors duration-200"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg border-2 border-transparent transition-all duration-200 focus:outline-none focus:bg-white focus:border-red-500"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
            >
              <HiSearch size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className="text-gray-700 hover:text-red-500 transition-colors duration-200 text-left"
              >
                {link.label}
              </button>
            ))}

            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => console.log("Login")}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => console.log("Sign Up")}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}

            {isAuthenticated && (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center font-semibold hover:bg-red-600 transition-colors duration-200"
                >
                  {getInitials()}
                </button>
                <button
                  onClick={() => console.log("Logout")}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;