

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { HiMenu, HiX } from "react-icons/hi";
import search from "../assets/Arts/search.png"

const Navbar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setMenuOpen(false);
    }
  };

  // Helper: get initials from user name
  const getInitials = (name) => {
    if (!name) return "P";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Helper: active link styling
  const linkClasses = (path) =>
    `relative transition-all duration-200 ${
      location.pathname === path
        ? "text-red-600 -translate-y-1 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-600"
        : "text-gray-700 hover:text-red-500"
    }`;

  return (
    <nav className="bg-[#f8eaea] fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex justify-between items-center h-16">
          {/* Logo + Search */}
          <div className="flex items-center gap-4 flex-1">
            <Link
              to="/"
              className="font-[var(--font-libertinus)] text-3xl sm:text-4xl underline"
            >
              UnIx
            </Link>

            {/* Desktop Search */}
            {/* <form onSubmit={handleSearch} className="hidden sm:block flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
                
              />
            </form> */}
              <form onSubmit={handleSearch} className="hidden sm:block flex-1">
              <div className="relative w-full">
                {/* Search Icon/Image */}
                <img
                  src={search} // replace with your image path
                  alt="search"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />

                {/* Input */}
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-md pr-8  py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200  "
                />
              </div>
              </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-[16px] font-light items-center">
            <Link to="/whats-new" className={linkClasses("/whats-new")}>
              What's New
            </Link>
            <Link to="/inventions" className={linkClasses("/inventions")}>
              Inventions
            </Link>
            <Link
              to="/artistinventor"
              className={linkClasses("/artistinventor")}
            >
              Artists & Inventors
            </Link>
            <Link to="/buy" className={linkClasses("/buy")}>
              Buy
            </Link>
            <Link to="/artworks" className={linkClasses("/artworks")}>
              Artworks
            </Link>

            {!isAuthenticated && (
              <>
                <button
                  onClick={handleLogin}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  Sign Up
                </button>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-bold"
                >
                  {getInitials(user?.name)}
                </Link>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <form onSubmit={handleSearch} className="sm:hidden mt-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </form>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-3 mt-3 pb-4 text-[16px] font-light">
            <Link to="/whats-new" onClick={() => setMenuOpen(false)}>
              What's New
            </Link>
            <Link to="/inventions" onClick={() => setMenuOpen(false)}>
              Inventions
            </Link>
            <Link to="/artistinventor" onClick={() => setMenuOpen(false)}>
              Artists & Inventors
            </Link>
            <Link to="/buy" onClick={() => setMenuOpen(false)}>
              Buy
            </Link>
            <Link to="/artworks" onClick={() => setMenuOpen(false)}>
              Artworks
            </Link>

            {!isAuthenticated && (
              <>
                <button
                  onClick={handleLogin}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUp}
                  className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
                >
                  Sign Up
                </button>
              </>
            )}

            {isAuthenticated && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-bold"
                >
                  {getInitials(user?.name)}
                </Link>
                <button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;