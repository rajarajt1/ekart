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
    <nav style={styles.navbar}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        🛒 cholaKart
      </Link>

      {/* Right Side */}
      <div style={styles.navRight}>
        {/* Cart Icon */}
        <Link to="/cart" style={styles.cartBtn}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={styles.cartBadge}>{cartCount}</span>
          )}
        </Link>

        {user ? (
          <>
            {/* My Orders */}
            <Link to="/my-orders" style={styles.navLink}>
              📦 My Orders
            </Link>

            {/* User Name */}
            <span style={styles.userName}>Hello, {user.name}</span>

            {/* Logout */}
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.navLink}>
              Login
            </Link>
            <Link to="/register" style={styles.registerBtn}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Styles
const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "linear-gradient(135deg, #1a1a2e, #16213e)",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#e94560",
    textDecoration: "none",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontSize: "0.95rem",
  },
  cartBtn: {
    position: "relative",
    color: "white",
    textDecoration: "none",
    fontSize: "0.95rem",
    background: "#e94560",
    padding: "8px 16px",
    borderRadius: "20px",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#ff9800",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  userName: {
    color: "#aaa",
    fontSize: "0.9rem",
  },
  logoutBtn: {
    background: "transparent",
    border: "1px solid #e94560",
    color: "#e94560",
    padding: "6px 14px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  registerBtn: {
    background: "#e94560",
    color: "white",
    padding: "8px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "0.9rem",
  },
};

export default Navbar;