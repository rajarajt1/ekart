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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Processing": return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: "🔄" };
      case "Shipped": return { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", icon: "🚚" };
      case "Delivered": return { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", icon: "✅" };
      case "Cancelled": return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: "❌" };
      default: return { bg: "bg-gray-50", text: "text-gray-600", border: "border-gray-200", icon: "📦" };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 My Orders</h2>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-500 border-t-transparent mb-4" />
            <p className="text-gray-400 font-medium">Loading orders...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-4 rounded-xl text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-24 px-6">
            <p className="text-6xl mb-4">📦</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No orders yet!</h3>
            <p className="text-gray-400 mb-8">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate("/")}
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-xl transition-all border-none cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        )}

        {/* Orders List */}
        {!loading && orders.length > 0 && (
          <div className="space-y-5">
            {orders.map((order) => {
              const sc = getStatusConfig(order.status);
              return (
                <div key={order._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  {/* Order Header */}
                  <div className="flex items-start justify-between flex-wrap gap-3 pb-4 mb-4 border-b border-gray-100">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${sc.bg} ${sc.text} ${sc.border}`}>
                        {sc.icon} {order.status}
                      </span>
                      <span className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200">
                        💳 {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm">
                    <p className="font-semibold text-gray-700 mb-1">📍 Shipping to:</p>
                    <p className="text-gray-500">
                      {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state} – {order.shippingAddress.pinCode}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Items Ordered
                    </p>
                    <div className="space-y-3">
                      {order.orderItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-14 h-14 object-cover rounded-xl flex-shrink-0 border border-gray-100"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/56?text=Img"; }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {item.qty} × ₹{item.price?.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <p className="text-sm font-bold text-gray-800 flex-shrink-0">
                            ₹{(item.qty * item.price).toLocaleString("en-IN")}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-wrap gap-2">
                    <p className="text-xs text-gray-400">
                      Items ₹{order.itemsPrice} + Tax ₹{order.taxPrice} + Shipping{" "}
                      {order.shippingPrice === 0 ? "FREE" : `₹${order.shippingPrice}`}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 font-medium">Total:</span>
                      <span className="text-lg font-bold text-rose-600">
                        ₹{order.totalPrice?.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-12">
        <p className="text-lg font-bold text-white mb-1">🛒 cholaKart</p>
        <p className="text-sm">Built with ❤️ using MongoDB + Express + React + Node.js</p>
      </footer>
    </div>
  );
};

export default MyOrdersPage;
