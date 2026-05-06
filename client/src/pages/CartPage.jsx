import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    cartTotal,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  // Tax and shipping calculation
  const taxPrice = Number((cartTotal * 0.18).toFixed(2));
  const shippingPrice = cartTotal > 500 ? 0 : 50;
  const totalWithTax = (cartTotal + taxPrice + shippingPrice).toFixed(2);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.title}>🛒 My Cart</h2>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div style={styles.emptyCart}>
            <p style={{ fontSize: "3rem" }}>🛒</p>
            <h3>Your cart is empty!</h3>
            <p style={{ color: "#888", marginBottom: "20px" }}>
              Add some products to get started
            </p>
            <button
              style={styles.shopBtn}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={styles.cartLayout}>
            {/* Left: Cart Items */}
            <div style={styles.cartItems}>
              {/* Clear Cart Button */}
              <div style={styles.cartHeader}>
                <p style={{ color: "#666" }}>
                  {cartItems.length} item(s) in cart
                </p>
                <button
                  style={styles.clearBtn}
                  onClick={clearCart}
                >
                  🗑️ Clear Cart
                </button>
              </div>

              {/* Cart Item List */}
              {cartItems.map((item) => (
                <div key={item._id} style={styles.cartItem}>
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.itemImage}
                    onClick={() => navigate(`/product/${item._id}`)}
                  />

                  {/* Info */}
                  <div style={styles.itemInfo}>
                    <h4
                      style={styles.itemName}
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      {item.name}
                    </h4>
                    <p style={{ color: "#888", fontSize: "0.85rem" }}>
                      {item.brand}
                    </p>
                    <p style={styles.itemPrice}>₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div style={styles.qtyBox}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => decreaseQty(item._id)}
                    >
                      −
                    </button>
                    <span style={styles.qtyNum}>{item.qty}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => increaseQty(item._id)}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div style={styles.subtotal}>
                    <p style={styles.subtotalAmt}>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </p>
                    <button
                      style={styles.removeBtn}
                      onClick={() => removeFromCart(item._id)}
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary */}
            <div style={styles.summary}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Tax (18% GST)</span>
                <span>₹{taxPrice}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Shipping</span>
                <span style={{ color: shippingPrice === 0 ? "green" : "inherit" }}>
                  {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
                </span>
              </div>

              {shippingPrice > 0 && (
                <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: "10px" }}>
                  Add ₹{(500 - cartTotal).toFixed(0)} more for FREE shipping
                </p>
              )}

              <div style={styles.divider} />

              <div style={{ ...styles.summaryRow, fontWeight: "bold", fontSize: "1.1rem" }}>
                <span>Total</span>
                <span style={{ color: "#e94560" }}>₹{totalWithTax}</span>
              </div>

              <button
                style={styles.checkoutBtn}
                onClick={handleCheckout}
              >
                Proceed to Checkout →
              </button>

              <button
                style={styles.continueBtn}
                onClick={() => navigate("/")}
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  title: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "25px",
  },
  emptyCart: {
    textAlign: "center",
    padding: "80px 20px",
    background: "white",
    borderRadius: "15px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
  },
  shopBtn: {
    padding: "12px 30px",
    background: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
  },
  cartLayout: {
    display: "flex",
    gap: "25px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  cartItems: {
    flex: 2,
    minWidth: "300px",
    background: "white",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
  },
  cartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
  },
  clearBtn: {
    background: "none",
    border: "1px solid #ff4444",
    color: "#ff4444",
    padding: "6px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  cartItem: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    padding: "15px 0",
    borderBottom: "1px solid #f0f0f0",
    flexWrap: "wrap",
  },
  itemImage: {
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "8px",
    cursor: "pointer",
    flexShrink: 0,
  },
  itemInfo: {
    flex: 1,
    minWidth: "150px",
  },
  itemName: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#333",
    cursor: "pointer",
    marginBottom: "4px",
  },
  itemPrice: {
    color: "#e94560",
    fontWeight: "600",
    marginTop: "5px",
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "2px solid #e94560",
    borderRadius: "8px",
    padding: "4px 10px",
  },
  qtyBtn: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#e94560",
    fontWeight: "bold",
    padding: "0",
    lineHeight: 1,
  },
  qtyNum: {
    fontSize: "1rem",
    fontWeight: "bold",
    minWidth: "25px",
    textAlign: "center",
  },
  subtotal: {
    textAlign: "right",
    minWidth: "80px",
  },
  subtotalAmt: {
    fontWeight: "bold",
    fontSize: "1rem",
    color: "#333",
    marginBottom: "6px",
  },
  removeBtn: {
    background: "none",
    border: "none",
    color: "#ff4444",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  summary: {
    flex: 1,
    minWidth: "280px",
    background: "white",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
    position: "sticky",
    top: "80px",
  },
  summaryTitle: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    color: "#555",
  },
  divider: {
    borderTop: "2px solid #eee",
    margin: "15px 0",
  },
  checkoutBtn: {
    width: "100%",
    padding: "14px",
    background: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "15px",
    marginBottom: "10px",
  },
  continueBtn: {
    width: "100%",
    padding: "12px",
    background: "transparent",
    color: "#e94560",
    border: "2px solid #e94560",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
  },
};

export default CartPage;