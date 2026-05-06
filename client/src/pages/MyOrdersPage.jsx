import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axiosInstance.get("/orders/myorders");
        setOrders(data);
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing": return { bg: "#fff3e0", color: "#ff9800" };
      case "Shipped": return { bg: "#e3f2fd", color: "#2196f3" };
      case "Delivered": return { bg: "#e8f5e9", color: "#4caf50" };
      case "Cancelled": return { bg: "#ffebee", color: "#f44336" };
      default: return { bg: "#f5f5f5", color: "#888" };
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navbar />

      <div style={styles.container}>
        <h2 style={styles.title}>📦 My Orders</h2>

        {loading && (
          <p style={{ textAlign: "center", padding: "40px" }}>
            Loading orders...
          </p>
        )}

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        {/* Empty Orders */}
        {!loading && orders.length === 0 && (
          <div style={styles.emptyBox}>
            <p style={{ fontSize: "3rem" }}>📦</p>
            <h3>No orders yet!</h3>
            <p style={{ color: "#888", marginBottom: "20px" }}>
              Start shopping to see your orders here
            </p>
            <button
              style={styles.shopBtn}
              onClick={() => navigate("/")}
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div style={styles.ordersList}>
            {orders.map((order) => {
              const statusStyle = getStatusColor(order.status);
              return (
                <div key={order._id} style={styles.orderCard}>
                  {/* Order Header */}
                  <div style={styles.orderHeader}>
                    <div>
                      <p style={styles.orderId}>
                        Order ID: #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p style={styles.orderDate}>
                        Placed on: {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div style={styles.headerRight}>
                      {/* Status Badge */}
                      <span style={{
                        ...styles.statusBadge,
                        background: statusStyle.bg,
                        color: statusStyle.color,
                      }}>
                        {order.status === "Processing" && "🔄 "}
                        {order.status === "Shipped" && "🚚 "}
                        {order.status === "Delivered" && "✅ "}
                        {order.status === "Cancelled" && "❌ "}
                        {order.status}
                      </span>

                      {/* Payment Method */}
                      <span style={styles.paymentBadge}>
                        💳 {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div style={styles.shippingInfo}>
                    <p style={{ fontWeight: "600", marginBottom: "3px" }}>
                      📦 Shipping to:
                    </p>
                    <p style={{ color: "#666", fontSize: "0.9rem" }}>
                      {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} -{" "}
                      {order.shippingAddress.pinCode}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div style={styles.itemsSection}>
                    <p style={styles.itemsTitle}>Items Ordered:</p>
                    {order.orderItems.map((item, index) => (
                      <div key={index} style={styles.orderItem}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={styles.itemImage}
                        />
                        <div style={styles.itemDetails}>
                          <p style={styles.itemName}>{item.name}</p>
                          <p style={{ color: "#888", fontSize: "0.85rem" }}>
                            Qty: {item.qty} × ₹{item.price}
                          </p>
                        </div>
                        <p style={styles.itemTotal}>
                          ₹{(item.qty * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div style={styles.orderFooter}>
                    <div style={styles.priceBreakdown}>
                      <span style={{ color: "#888", fontSize: "0.85rem" }}>
                        Items: ₹{order.itemsPrice} + Tax: ₹
                        {order.taxPrice} + Shipping: ₹
                        {order.shippingPrice === 0
                          ? "FREE"
                          : order.shippingPrice}
                      </span>
                    </div>
                    <div style={styles.totalBox}>
                      <span style={styles.totalLabel}>Order Total:</span>
                      <span style={styles.totalAmount}>
                        ₹{order.totalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px 20px",
  },
  title: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "25px",
  },
  emptyBox: {
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
  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  orderCard: {
    background: "white",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
    paddingBottom: "15px",
    borderBottom: "1px solid #f0f0f0",
    flexWrap: "wrap",
    gap: "10px",
  },
  orderId: {
    fontWeight: "bold",
    color: "#333",
    fontSize: "0.95rem",
    marginBottom: "4px",
  },
  orderDate: {
    color: "#888",
    fontSize: "0.85rem",
  },
  headerRight: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  statusBadge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontWeight: "600",
    fontSize: "0.85rem",
  },
  paymentBadge: {
    background: "#f0f0f0",
    color: "#555",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.82rem",
  },
  shippingInfo: {
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "15px",
  },
  itemsSection: {
    marginBottom: "15px",
  },
  itemsTitle: {
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
    fontSize: "0.9rem",
  },
  orderItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f5f5f5",
  },
  itemImage: {
    width: "55px",
    height: "55px",
    objectFit: "cover",
    borderRadius: "6px",
    flexShrink: 0,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#333",
    marginBottom: "3px",
  },
  itemTotal: {
    fontWeight: "600",
    color: "#333",
    fontSize: "0.95rem",
  },
  orderFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "15px",
    flexWrap: "wrap",
    gap: "10px",
  },
  priceBreakdown: {
    flex: 1,
  },
  totalBox: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  totalLabel: {
    fontWeight: "600",
    color: "#333",
  },
  totalAmount: {
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "#e94560",
  },
};

export default MyOrdersPage;