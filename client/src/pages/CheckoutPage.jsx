import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step 1: Shipping, Step 2: Payment
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Shipping Form State
  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Redirect if not logged in
  if (!user) {
    navigate("/login");
    return null;
  }

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    navigate("/");
    return null;
  }

  // Calculations
  const taxPrice = Number((cartTotal * 0.18).toFixed(2));
  const shippingPrice = cartTotal > 500 ? 0 : 50;
  const totalPrice = Number(
    (cartTotal + taxPrice + shippingPrice).toFixed(2)
  );

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pinCode
    ) {
      setError("Please fill all shipping fields");
      return;
    }
    setError("");
    setStep(2);
  };

  // Place Order
  const handlePlaceOrder = async () => {
    setLoading(true);
    setError("");

    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: shipping,
        paymentMethod,
        itemsPrice: cartTotal,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      const { data } = await axiosInstance.post("/orders", orderData);

      clearCart();
      navigate("/my-orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.title}>Checkout</h2>

        {/* Step Indicator */}
        <div style={styles.stepRow}>
          <div style={{
            ...styles.step,
            background: step >= 1 ? "#e94560" : "#ddd",
            color: step >= 1 ? "white" : "#888",
          }}>
            1. Shipping Address
          </div>
          <div style={styles.stepLine} />
          <div style={{
            ...styles.step,
            background: step >= 2 ? "#e94560" : "#ddd",
            color: step >= 2 ? "white" : "#888",
          }}>
            2. Payment
          </div>
        </div>

        <div style={styles.checkoutLayout}>
          {/* Left: Form */}
          <div style={styles.formBox}>

            {/* STEP 1: Shipping */}
            {step === 1 && (
              <div>
                <h3 style={styles.sectionTitle}>
                  📦 Shipping Address
                </h3>
                {error && (
                  <p style={{ color: "red", marginBottom: "10px" }}>
                    {error}
                  </p>
                )}
                <form onSubmit={handleShippingSubmit}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shipping.address}
                      onChange={handleShippingChange}
                      placeholder="Enter your street address"
                      style={styles.input}
                      required
                    />
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>City</label>
                      <input
                        type="text"
                        name="city"
                        value={shipping.city}
                        onChange={handleShippingChange}
                        placeholder="City"
                        style={styles.input}
                        required
                      />
                    </div>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>State</label>
                      <input
                        type="text"
                        name="state"
                        value={shipping.state}
                        onChange={handleShippingChange}
                        placeholder="State"
                        style={styles.input}
                        required
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>PIN Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={shipping.pinCode}
                      onChange={handleShippingChange}
                      placeholder="6-digit PIN code"
                      style={styles.input}
                      maxLength={6}
                      required
                    />
                  </div>

                  <button type="submit" style={styles.nextBtn}>
                    Continue to Payment →
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div>
                <h3 style={styles.sectionTitle}>💳 Payment Method</h3>

                {/* Shipping Summary */}
                <div style={styles.shippingSummary}>
                  <p style={{ fontWeight: "600", marginBottom: "5px" }}>
                    📦 Delivering to:
                  </p>
                  <p style={{ color: "#555" }}>
                    {shipping.address}, {shipping.city},{" "}
                    {shipping.state} - {shipping.pinCode}
                  </p>
                  <button
                    style={styles.editBtn}
                    onClick={() => setStep(1)}
                  >
                    Edit Address
                  </button>
                </div>

                {/* Payment Options */}
                <div style={styles.paymentOptions}>
                  {["COD", "UPI", "Card", "NetBanking"].map((method) => (
                    <label key={method} style={styles.paymentOption}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ marginRight: "10px" }}
                      />
                      {method === "COD" && "💵 Cash on Delivery"}
                      {method === "UPI" && "📱 UPI Payment"}
                      {method === "Card" && "💳 Credit/Debit Card"}
                      {method === "NetBanking" && "🏦 Net Banking"}
                    </label>
                  ))}
                </div>

                {error && (
                  <p style={{ color: "red", marginBottom: "10px" }}>
                    {error}
                  </p>
                )}

                {/* Place Order Button */}
                <button
                  style={{
                    ...styles.placeOrderBtn,
                    opacity: loading ? 0.7 : 1,
                  }}
                  onClick={handlePlaceOrder}
                  disabled={loading}
                >
                  {loading
                    ? "Placing Order..."
                    : `🛍️ Place Order • ₹${totalPrice}`}
                </button>

                <button
                  style={styles.backStepBtn}
                  onClick={() => setStep(1)}
                >
                  ← Back to Shipping
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div style={styles.summary}>
            <h3 style={styles.summaryTitle}>📋 Order Summary</h3>

            {/* Items List */}
            {cartItems.map((item) => (
              <div key={item._id} style={styles.summaryItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={styles.summaryImg}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: "600" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#888" }}>
                    Qty: {item.qty}
                  </p>
                </div>
                <p style={{ fontWeight: "600", color: "#e94560" }}>
                  ₹{(item.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}

            <div style={styles.divider} />

            <div style={styles.priceRow}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div style={styles.priceRow}>
              <span>Tax (18%)</span>
              <span>₹{taxPrice}</span>
            </div>
            <div style={styles.priceRow}>
              <span>Shipping</span>
              <span style={{ color: shippingPrice === 0 ? "green" : "inherit" }}>
                {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
              </span>
            </div>

            <div style={styles.divider} />

            <div style={{ ...styles.priceRow, fontWeight: "bold", fontSize: "1.1rem" }}>
              <span>Total</span>
              <span style={{ color: "#e94560" }}>₹{totalPrice}</span>
            </div>
          </div>
        </div>
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
  stepRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    gap: "10px",
  },
  step: {
    padding: "10px 20px",
    borderRadius: "25px",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.3s",
  },
  stepLine: {
    flex: 1,
    height: "2px",
    background: "#ddd",
  },
  checkoutLayout: {
    display: "flex",
    gap: "25px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  formBox: {
    flex: 2,
    minWidth: "300px",
    background: "white",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
  },
  formGroup: {
    marginBottom: "15px",
    flex: 1,
  },
  formRow: {
    display: "flex",
    gap: "15px",
  },
  label: {
    display: "block",
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#555",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "2px solid #e1e5eb",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },
  nextBtn: {
    width: "100%",
    padding: "14px",
    background: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginTop: "10px",
  },
  shippingSummary: {
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid #eee",
  },
  editBtn: {
    background: "none",
    border: "none",
    color: "#e94560",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "600",
    marginTop: "5px",
    padding: 0,
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "25px",
  },
  paymentOption: {
    display: "flex",
    alignItems: "center",
    padding: "14px",
    border: "2px solid #eee",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "500",
  },
  placeOrderBtn: {
    width: "100%",
    padding: "15px",
    background: "#e94560",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.05rem",
    fontWeight: "700",
    marginBottom: "10px",
  },
  backStepBtn: {
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
    fontSize: "1.1rem",
    color: "#333",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #eee",
  },
  summaryItem: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "12px",
  },
  summaryImg: {
    width: "50px",
    height: "50px",
    objectFit: "cover",
    borderRadius: "6px",
    flexShrink: 0,
  },
  divider: {
    borderTop: "1px solid #eee",
    margin: "15px 0",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    color: "#555",
    fontSize: "0.9rem",
  },
};

export default CheckoutPage;