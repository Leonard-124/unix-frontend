


// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import axios from "axios";
// import { HiMenu, HiX } from "react-icons/hi";
// import search from "../assets/Arts/search.png";
// import UnixArt from "../assets/Arts/UnixArt.png"

// const Navbar = () => {
//   const { isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [userProfile, setUserProfile] = useState(null);

//   // Fetch user profile to get avatar
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (isAuthenticated && user) {
//         try {
//           const token = await getAccessTokenSilently();
//           const res = await axios.get(
//             `${import.meta.env.VITE_API_BASE_URL}/api/users/users/${user.sub}`,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           setUserProfile(res.data.user);
//         } catch (err) {
//           console.error("Error fetching user profile:", err);
//         }
//       }
//     };

//     fetchUserProfile();
//   }, [isAuthenticated, user, getAccessTokenSilently]);

//   const handleLogin = () => {
//     sessionStorage.setItem("returnTo", location.pathname);
//     loginWithRedirect({
//       appState: { returnTo: location.pathname }
//     });
//   };

//   const handleSignUp = () => {
//     loginWithRedirect({
//       authorizationParams: {
//         screen_hint: "signup"
//       },
//       appState: { returnTo: "/profile" }
//     });
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
//       setSearchTerm("");
//       setMenuOpen(false);
//     }
//   };

//   // Helper: get initials from user name
//   const getInitials = (name) => {
//     if (!name) return "P";
//     const parts = name.trim().split(" ");
//     if (parts.length === 1) return parts[0][0].toUpperCase();
//     return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
//   };

//   // Get avatar URL (priority: uploaded avatar > Auth0 picture > fallback)
//   const getAvatarUrl = () => {
//     return userProfile?.avatar || user?.picture;
//   };

//   // Helper: active link styling
//   const linkClasses = (path) =>
//     `relative transition-all duration-200 ${
//       location.pathname === path
//         ? "text-red-600 -translate-y-1 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-600"
//         : "text-gray-700 hover:text-red-500"
//     }`;

//   return (
//     <nav className="bg-[#f8eaea] fixed top-0 left-0 right-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Top Row */}
//         <div className="flex justify-between items-center h-16">
//           {/* Logo + Search */}
//           <div className="flex items-center gap-4 flex-1">
//             <Link
//               to="/"
//               className="font-[var(--font-libertinus)] text-3xl sm:text-4xl underline"
//             >
//               <div className="w-24 h-18">
//                 <img src={UnixArt} alt="UnixArt" />
//               </div>
//             </Link>

//             {/* Desktop Search */}
//             <form onSubmit={handleSearch} className="hidden sm:block flex-1">
//               <div className="relative w-full">
//                 {/* Search Icon/Image */}
//                 <img
//                   src={search}
//                   alt="search"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
//                 />

//                 {/* Input */}
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="border border-gray-300 rounded-md pr-10 pl-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
//                 />
//               </div>
//             </form>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex gap-6 text-[16px] font-light items-center">
//             {/* <Link to="/whats-new" className={linkClasses("/whats-new")}>
//               What's New
//             </Link> */}
//             <Link to="/inventions" className={linkClasses("/inventions")}>
//               Woodworksn
//             </Link>
//             {/* <Link
//               to="/artistinventor"
//               className={linkClasses("/artistinventor")}
//             >
//               Artists & Inventors
//             </Link> */}
//             <Link to="/buy" className={linkClasses("/buy")}>
//               Buy
//             </Link>
//             <Link to="/artworks" className={linkClasses("/artworks")}>
//               Paintingsr
//             </Link>

//             {!isAuthenticated && (
//               <>
//                 <button
//                   onClick={handleLogin}
//                   className="px-3 py-1 border rounded hover:bg-gray-100 transition"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={handleSignUp}
//                   className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 transition"
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}

//             {isAuthenticated && (
//               <>
//                 <Link
//                   to="/profile"
//                   className="hover:opacity-80 transition"
//                   title={user?.name || "Profile"}
//                 >
//                   {getAvatarUrl() ? (
//                     <img
//                       src={getAvatarUrl()}
//                       alt={user?.name || "Profile"}
//                       className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-bold">
//                       {getInitials(user?.name)}
//                     </div>
//                   )}
//                 </Link>
//                 <button
//                   onClick={() => logout({ 
//                     logoutParams: { returnTo: window.location.origin }
//                   })}
//                   className="px-3 py-1 border rounded hover:bg-gray-100 transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
//               {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search */}
//         <form onSubmit={handleSearch} className="sm:hidden mt-2 mb-2">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
//           />
//         </form>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden flex flex-col gap-3 mt-3 pb-4 text-[16px] font-light">
//             <Link to="/whats-new" onClick={() => setMenuOpen(false)}>
//               What's New
//             </Link>
//             <Link to="/inventions" onClick={() => setMenuOpen(false)}>
//               Inventions
//             </Link>
//             <Link to="/artistinventor" onClick={() => setMenuOpen(false)}>
//               Artists & Inventors
//             </Link>
//             <Link to="/buy" onClick={() => setMenuOpen(false)}>
//               Buy
//             </Link>
//             <Link to="/artworks" onClick={() => setMenuOpen(false)}>
//               Artworks
//             </Link>

//             {!isAuthenticated && (
//               <>
//                 <button
//                   onClick={handleLogin}
//                   className="px-3 py-1 border rounded hover:bg-gray-100 text-left transition"
//                 >
//                   Login
//                 </button>
//                 <button
//                   onClick={handleSignUp}
//                   className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800 text-left transition"
//                 >
//                   Sign Up
//                 </button>
//               </>
//             )}

//             {isAuthenticated && (
//               <>
//                 <Link
//                   to="/profile"
//                   onClick={() => setMenuOpen(false)}
//                   className="flex items-center gap-2"
//                 >
//                   {getAvatarUrl() ? (
//                     <img
//                       src={getAvatarUrl()}
//                       alt={user?.name || "Profile"}
//                       className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 text-white font-bold">
//                       {getInitials(user?.name)}
//                     </div>
//                   )}
//                   <span>Profile</span>
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setMenuOpen(false);
//                     logout({ 
//                       logoutParams: { returnTo: window.location.origin }
//                     });
//                   }}
//                   className="px-3 py-1 border rounded hover:bg-gray-100 text-left transition"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { HiMenu, HiX, HiSearch, HiChevronDown } from "react-icons/hi";
import UnixArt from "../assets/Arts/UnixArt.png";
import { useContext } from "react";
import { CartContext } from "../Context/Context";

const Navbar = () => {
  const { isAuthenticated, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cart } = useContext(CartContext)
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  // Fetch user profile to get avatar
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated && user) {
        try {
          const token = await getAccessTokenSilently();
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/users/users/${user.sub}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setUserProfile(res.data.user);
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      }
    };
    fetchUserProfile();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu-container")) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("returnTo", location.pathname);
    loginWithRedirect({
      appState: { returnTo: location.pathname }
    });
  };

  const handleSignUp = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup"
      },
      appState: { returnTo: "/profile" }
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

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const getAvatarUrl = () => {
    return userProfile?.avatar || user?.picture;
  };

  const linkClasses = (path) => {
    const isActive = location.pathname === path;
    return `relative font-medium transition-all duration-300 group ${
      isActive ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
    }`;
  };

  const linkUnderline = (path) => {
    const isActive = location.pathname === path;
    return (
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
            : "bg-white/90 backdrop-blur-sm shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Row */}
          <div className="flex justify-between items-center h-16 sm:h-18">
            {/* Logo + Desktop Search */}
            <div className="flex items-center gap-6 flex-1 max-w-2xl">
              {/* Logo */}
              <Link
                to="/"
                className="flex-shrink-0 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
              >
                <img
                  src={UnixArt}
                  alt="UnixArt"
                  className="h-12 w-auto sm:h-14"
                />
              </Link>

              {/* Desktop Search Bar */}
              <form
                onSubmit={handleSearch}
                className="hidden md:flex flex-1 max-w-md"
              >
                <div className="relative w-full group">
                  <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search artworks, artists..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 text-sm
                      focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white
                      transition-all duration-200 placeholder:text-gray-400"
                  />
                </div>
              </form>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Nav Links */}
              <div className="flex items-center gap-6 text-sm">
                <Link to="/inventions" className={linkClasses("/inventions")}>
                  Woodworks
                  {linkUnderline("/inventions")}
                </Link>
                <Link to="/buy" className={linkClasses("/buy")}>
                  Buy
                  {linkUnderline("/buy")}
                </Link>
                <Link to="/artworks" className={linkClasses("/artworks")}>
                  Paintings
                  {linkUnderline("/artworks")}
                </Link>
              </div>

              {/* Auth Section */}
              {!isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleLogin}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 
                      rounded-lg hover:from-gray-900 hover:to-black transition-all duration-300 
                      shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative user-menu-container">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserMenuOpen(!userMenuOpen);
                    }}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="User menu"
                  >
                    {getAvatarUrl() ? (
                      <img
                        src={getAvatarUrl()}
                        alt={user?.name || "Profile"}
                        className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 ring-2 ring-transparent hover:ring-red-500/20 transition-all"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold text-sm ring-2 ring-transparent hover:ring-red-500/20 transition-all">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <HiChevronDown
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                        userMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {userProfile?.username || user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <Link
                        to="/collections"
                        className="relative block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Collections
                      <span className="absolute top-0 right-[-1.5px] bg-red-500 text-white rounded-full h-[18px] w-[18px] flex items-center justify-center text-[12px] font-[500] tracking-[0.5px] p-0.5">{cartCount}</span>
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Profile
                      </Link>
                      {/* <Link
                        to="/post"
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Upload Artwork
                      </Link> */}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() =>
                            logout({
                              logoutParams: { returnTo: window.location.origin },
                            })
                          }
                          className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <HiX className="w-6 h-6 text-gray-700" />
              ) : (
                <HiMenu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Search Bar */}
          <form
            onSubmit={handleSearch}
            className="md:hidden pb-3 animate-fadeIn"
          >
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50/50 text-sm
                  focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 focus:bg-white
                  transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white animate-slideDown">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {/* Nav Links */}
              <Link
                to="/inventions"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Woodworks
              </Link>
              <Link
                to="/buy"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Buy
              </Link>
              <Link
                to="/artworks"
                className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Paintings
              </Link>

              {/* Auth Section */}
              {!isAuthenticated ? (
                <div className="pt-4 space-y-2 border-t border-gray-100 mt-4">
                  <button
                    onClick={handleLogin}
                    className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignUp}
                    className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg hover:from-gray-900 hover:to-black transition-all"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="pt-4 space-y-1 border-t border-gray-100 mt-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {getAvatarUrl() ? (
                      <img
                        src={getAvatarUrl()}
                        alt={user?.name || "Profile"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-white font-semibold text-sm">
                        {getInitials(user?.name)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {userProfile?.username || user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        View Profile
                      </p>
                    </div>
                  </Link>
                  <Link
                    to="/post"
                    className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Upload Artwork
                  </Link>
                  <button
                    onClick={() =>
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      })
                    }
                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 sm:h-18" />

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;