import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className="
        fixed top-0 left-0 w-full z-50
        bg-black/20 backdrop-blur-xl
        border-b border-white/10
        px-6 py-4
      "
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LOGO */}
          <Link
            to="/"
            className="text-2xl font-bold text-yellow-400 tracking-wide"
          >
            OnePass
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8 text-white font-medium">
            
            <Link
              to="/"
              className="hover:text-yellow-400 transition"
            >
              Home
            </Link>

            <Link
              to="/search"
              className="hover:text-yellow-400 transition"
            >
              Search
            </Link>

            {token && (
              <>
                <Link
                  to="/bookings"
                  className="hover:text-yellow-400 transition"
                >
                  My Bookings
                </Link>

                <Link
                  to="/history"
                  className="hover:text-yellow-400 transition"
                >
                  History
                </Link>
              </>
            )}

            {!token ? (
              <Link
                to="/login"
                className="
                bg-yellow-500 text-black
                px-5 py-2 rounded-full
                hover:bg-yellow-400 transition
              "
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="
                bg-red-500 px-5 py-2 rounded-full
                hover:bg-red-400 transition
              "
              >
                Logout
              </button>
            )}
          </div>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white text-3xl"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-screen
          w-60
          bg-[#0b1120]
          rounded-l-3xl
          border-l border-white/10
          shadow-2xl
          z-50
          p-6
          flex flex-col
          transition-transform duration-300
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-yellow-400">
            OnePass
          </h2>

          <button
            onClick={() => setMenuOpen(false)}
            className="
            text-gray-300
            text-2xl
            hover:text-yellow-400
            transition
          "
          >
            ✕
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col gap-3">
          
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            text-white
            hover:bg-white/10
            hover:text-yellow-400
            transition
          "
          >
            🏠 Home
          </Link>

          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="
            flex items-center gap-3
            px-4 py-3 rounded-xl
            text-white
            hover:bg-white/10
            hover:text-yellow-400
            transition
          "
          >
            🔍 Search
          </Link>

          {token && (
            <>
              <Link
                to="/bookings"
                onClick={() => setMenuOpen(false)}
                className="
                flex items-center gap-3
                px-4 py-3 rounded-xl
                text-white
                hover:bg-white/10
                hover:text-yellow-400
                transition
              "
              >
                🎫 My Bookings
              </Link>

              <Link
                to="/history"
                onClick={() => setMenuOpen(false)}
                className="
                flex items-center gap-3
                px-4 py-3 rounded-xl
                text-white
                hover:bg-white/10
                hover:text-yellow-400
                transition
              "
              >
                📜 History
              </Link>
            </>
          )}
        </div>

        {/* LOGOUT */}
        {token && (
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="
              w-full
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-red-400
              hover:bg-red-500/10
              transition
            "
            >
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;