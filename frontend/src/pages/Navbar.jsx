import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    const handleLogout = () => {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        navigate("/login");
    }
    return (
    <nav
      className="fixed top-0 left-0 w-full z-50
      bg-black/20 backdrop-blur-xl border-b border-white/10
      px-8 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400 tracking-wide"
        >
          OnePass
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8 text-white font-medium">
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>

          <Link to="/search" className="hover:text-yellow-400 transition">
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
              className="bg-yellow-500 text-black px-5 py-2 rounded-full
              hover:bg-yellow-400 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-5 py-2 rounded-full
              hover:bg-red-400 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

