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

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [shipping, setShipping] = useState({
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");

  if (!user) {
    navigate("/login");
    return null;
  }

  if (cartItems.length === 0) {
    navigate("/");
    return null;
  }

  const taxPrice = Number((cartTotal * 0.18).toFixed(2));
  const shippingPrice = cartTotal > 500 ? 0 : 50;
  const totalPrice = Number((cartTotal + taxPrice + shippingPrice).toFixed(2));

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (!shipping.address || !shipping.city || !shipping.state || !shipping.pinCode) {
      setError("Please fill all shipping fields");
      return;
    }
    setError("");
    setStep(2);
  };

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
      await axiosInstance.post("/orders", orderData);
      clearCart();
      navigate("/my-orders");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    { value: "COD", label: "Cash on Delivery", icon: "💵" },
    { value: "UPI", label: "UPI Payment", icon: "📱" },
    { value: "Card", label: "Credit / Debit Card", icon: "💳" },
    { value: "NetBanking", label: "Net Banking", icon: "🏦" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Checkout</h2>

        {/* Step Indicator */}
        <div className="flex items-center mb-8">
          <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold ${step >= 1 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"}`}>
            <span className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-xs font-bold">1</span>
            Shipping
          </div>
          <div className={`flex-1 h-1 mx-2 rounded-full ${step >= 2 ? "bg-rose-400" : "bg-gray-200"}`} />
          <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold ${step >= 2 ? "bg-rose-600 text-white" : "bg-gray-200 text-gray-500"}`}>
            <span className="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center text-xs font-bold">2</span>
            Payment
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Left: Form */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {/* STEP 1: Shipping */}
            {step === 1 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-5">📦 Shipping Address</h3>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
                    ⚠️ {error}
                  </div>
                )}

                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Street Address</label>
                    <input
                      type="text"
                      name="address"
                      value={shipping.address}
                      onChange={handleShippingChange}
                      placeholder="Enter your street address"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                      <input
                        type="text"
                        name="city"
                        value={shipping.city}
                        onChange={handleShippingChange}
                        placeholder="City"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                      <input
                        type="text"
                        name="state"
                        value={shipping.state}
                        onChange={handleShippingChange}
                        placeholder="State"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">PIN Code</label>
                    <input
                      type="text"
                      name="pinCode"
                      value={shipping.pinCode}
                      onChange={handleShippingChange}
                      placeholder="6-digit PIN code"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors"
                      maxLength={6}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 rounded-xl transition-all mt-2 border-none cursor-pointer text-sm"
                  >
                    Continue to Payment →
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2: Payment */}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-5">💳 Payment Method</h3>

                {/* Address Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                  <p className="font-semibold text-gray-700 text-sm mb-1">📦 Delivering to:</p>
                  <p className="text-gray-600 text-sm">
                    {shipping.address}, {shipping.city}, {shipping.state} – {shipping.pinCode}
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="text-rose-600 text-xs font-semibold mt-2 hover:underline bg-transparent border-none cursor-pointer p-0"
                  >
                    ✏️ Edit Address
                  </button>
                </div>

                {/* Payment Options */}
                <div className="space-y-3 mb-6">
                  {paymentOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        paymentMethod === opt.value
                          ? "border-rose-500 bg-rose-50"
                          : "border-gray-200 hover:border-rose-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={opt.value}
                        checked={paymentMethod === opt.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="accent-rose-600"
                      />
                      <span className="text-xl">{opt.icon}</span>
                      <span className="font-medium text-gray-700 text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                    ⚠️ {error}
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 text-white font-bold py-4 rounded-xl transition-all border-none cursor-pointer text-sm"
                >
                  {loading ? "Placing Order..." : "🎉 Place Order"}
                </button>
              </div>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-80 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/50?text=Img"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 flex-shrink-0">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (18%)</span>
                <span>₹{taxPrice}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shippingPrice === 0 ? "text-green-600 font-medium" : ""}>
                  {shippingPrice === 0 ? "FREE" : `₹${shippingPrice}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between items-center">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-xl text-rose-600">₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-12">
        <p className="text-lg font-bold text-white mb-1">🛒 cholaKart</p>
        <p className="text-sm">Built with ❤️ using MongoDB + Express + React + Node.js</p>
      </footer>
    </div>
  );
};

export default CheckoutPage;
