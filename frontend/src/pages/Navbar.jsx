import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import homeIcon from "../assets/home.png";
import searchIcon from "../assets/search.png";
import bookingIcon from "../assets/booking.png";
import historyIcon from "../assets/history.png";
import logoutIcon from "../assets/logout.png";
import logoIcon from "../assets/logo.png"; // Fix 3: Brand logo asset imported

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    setProfileOpen(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LOGO - Fix 3: Branded logo layouts added directly */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img src={logoIcon} alt="OnePass" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-yellow-400 tracking-wide">OnePass</span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            <Link to="/" className="cursor-pointer hover:text-yellow-400 transition">Home</Link>
            <Link to="/search" className="cursor-pointer hover:text-yellow-400 transition">Search</Link>

            {token && (
              <>
                <Link to="/bookings" className="cursor-pointer hover:text-yellow-400 transition">My Bookings</Link>
                <Link to="/history" className="cursor-pointer hover:text-yellow-400 transition">History</Link>
              </>
            )}

            {!token ? (
              <Link
                to="/login"
                className="bg-yellow-500 text-black px-5 py-2 rounded-full cursor-pointer hover:bg-yellow-400 transition"
              >
                Login
              </Link>
            ) : (
              /* DESKTOP PROFILE DROPDOWN */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 rounded-full px-2 py-1 cursor-pointer hover:bg-white/10 transition-all duration-200"
                >
                  {/* Fix 1: Comment hoisted out from internal JSX attribute properties */}
                  {/* Premium avatar styling with hover glow */}
                  <img
                    src={user?.profileImage || `https://ui-avatars.com/api/?name=${user?.name || "User"}`}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400 shadow-lg shadow-yellow-500/30 hover:scale-105 transition"
                  />
                  <span className="text-white font-medium">{user?.name}</span>
                  <span className="text-gray-400 text-xs">▼</span>
                </button>

                {/* Dropdown Animate Container */}
                {/* Fix 4: Appended explicit pointer-events controls for safe clicking loops */}
                <div
                  className={`absolute right-0 mt-3 w-52 rounded-2xl bg-[#101827] border border-white/10 shadow-2xl overflow-hidden z-50 transition-all duration-200 origin-top-right ${
                    profileOpen
                      ? "opacity-100 scale-100 visible pointer-events-auto"
                      : "opacity-0 scale-95 invisible pointer-events-none"
                  }`}
                >
                  <Link 
                    to="/profile" 
                    onClick={() => setProfileOpen(false)} 
                    className="block px-5 py-3 text-white hover:bg-white/10 cursor-pointer"
                  >
                    👤 My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-400 hover:bg-red-500/10 flex items-center cursor-pointer"
                  >
                    <img src={logoutIcon} alt="Logout" className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white text-3xl cursor-pointer">
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {menuOpen && <div className="fixed inset-0 bg-black/60 z-50" onClick={() => setMenuOpen(false)} />}

      {/* MOBILE DRAWER */}
      <div
        className={`fixed top-0 right-0 h-screen w-60 bg-[#0b1120] rounded-l-3xl border-l border-white/10 shadow-2xl z-50 p-6 flex flex-col transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-yellow-400">OnePass</h2>
          <button onClick={() => setMenuOpen(false)} className="text-gray-300 text-2xl hover:text-yellow-400 transition cursor-pointer">
            ✕
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-yellow-400 transition cursor-pointer">
            <img src={homeIcon} alt="Home" className="w-5 h-5" />
            Home
          </Link>

          <Link to="/search" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-yellow-400 transition cursor-pointer">
            <img src={searchIcon} alt="Search" className="w-5 h-5" />
            Search
          </Link>

          {token && (
            <>
              <Link to="/bookings" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-yellow-400 transition cursor-pointer">
                <img src={bookingIcon} alt="Bookings" className="w-5 h-5" />
                My Bookings
              </Link>

              <Link to="/history" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-yellow-400 transition cursor-pointer">
                <img src={historyIcon} alt="History" className="w-5 h-5" />
                History
              </Link>

              <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/10 hover:text-yellow-400 transition cursor-pointer">
                <span>👤</span> Profile
              </Link>
            </>
          )}
        </div>

        {/* MOBILE LOGOUT */}
        {token && (
          <div className="mt-auto absolute bottom-6 left-6 right-6">
            {/* Fix 2: Dropped standard filter inversion attributes to honor native colors */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl py-3 cursor-pointer hover:scale-105 transition-all duration-200"
            >
              <img src={logoutIcon} alt="Logout" className="w-5 h-5" />
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;