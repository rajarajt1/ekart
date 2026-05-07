import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold text-rose-500 hover:text-rose-400 transition-colors"
            style={{ textDecoration: "none" }}
          >
            <span className="text-2xl">🛒</span>
            <span>cholaKart</span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-full transition-all"
              style={{ textDecoration: "none" }}
            >
              <span>🛒</span>
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-orders"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors hidden sm:block"
                  style={{ textDecoration: "none" }}
                >
                  📦 My Orders
                </Link>
                <span className="text-gray-400 text-sm hidden md:block">
                  Hi,{" "}
                  <span className="text-white font-medium">
                    {user.name.split(" ")[0]}
                  </span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-rose-400 border border-rose-500 hover:bg-rose-500 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer bg-transparent"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
