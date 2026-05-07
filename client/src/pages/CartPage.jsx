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

  const taxPrice = Number((cartTotal * 0.18).toFixed(2));
  const shippingPrice = cartTotal > 500 ? 0 : 50;
  const totalWithTax = (cartTotal + taxPrice + shippingPrice).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🛒 My Cart</h2>

        {/* Empty Cart */}
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-24 px-6">
            <p className="text-6xl mb-4">🛒</p>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty!</h3>
            <p className="text-gray-400 mb-8">Add some products to get started</p>
            <button
              onClick={() => navigate("/")}
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-8 py-3 rounded-xl transition-all border-none cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Left: Cart Items */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <p className="text-gray-600 text-sm font-medium">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
                </p>
                <button
                  onClick={clearCart}
                  className="text-red-500 border border-red-300 hover:bg-red-50 text-xs font-medium px-3 py-1.5 rounded-lg transition-all bg-transparent cursor-pointer"
                >
                  🗑️ Clear Cart
                </button>
              </div>

              {/* Items */}
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-b-0 flex-wrap"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl cursor-pointer flex-shrink-0"
                    onClick={() => navigate(`/product/${item._id}`)}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=No+Img"; }}
                  />

                  <div className="flex-1 min-w-32">
                    <h4
                      className="font-semibold text-gray-800 text-sm cursor-pointer hover:text-rose-600 transition-colors mb-0.5"
                      onClick={() => navigate(`/product/${item._id}`)}
                    >
                      {item.name}
                    </h4>
                    <p className="text-gray-400 text-xs mb-1">{item.brand}</p>
                    <p className="text-rose-600 font-bold text-sm">
                      ₹{item.price?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  {/* Qty Controls */}
                  <div className="flex items-center gap-2 border-2 border-rose-200 rounded-xl px-2 py-1">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="text-rose-500 font-bold text-lg w-6 h-6 flex items-center justify-center hover:bg-rose-50 rounded border-none bg-transparent cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-bold text-gray-800 min-w-6 text-center text-sm">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="text-rose-500 font-bold text-lg w-6 h-6 flex items-center justify-center hover:bg-rose-50 rounded border-none bg-transparent cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="text-right min-w-20">
                    <p className="font-bold text-gray-800 text-sm mb-1">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-400 hover:text-red-600 text-xs font-medium bg-transparent border-none cursor-pointer transition-colors"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-80 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-5">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span className="font-medium text-gray-800">₹{taxPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={`font-medium ${shippingPrice === 0 ? "text-green-600" : "text-gray-800"}`}>
                    {shippingPrice === 0 ? "FREE 🎉" : `₹${shippingPrice}`}
                  </span>
                </div>
                {shippingPrice > 0 && (
                  <p className="text-xs text-gray-400 bg-amber-50 border border-amber-100 px-3 py-2 rounded-lg">
                    Add ₹{(500 - cartTotal).toFixed(0)} more for FREE shipping
                  </p>
                )}
              </div>

              <div className="border-t border-gray-100 my-4" />

              <div className="flex justify-between items-center mb-5">
                <span className="font-bold text-gray-800">Total</span>
                <span className="font-bold text-xl text-rose-600">₹{totalWithTax}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3.5 rounded-xl transition-all mb-3 border-none cursor-pointer text-sm"
              >
                Proceed to Checkout →
              </button>
              <button
                onClick={() => navigate("/")}
                className="w-full text-rose-600 hover:bg-rose-50 font-medium py-2.5 rounded-xl transition-all border-2 border-rose-200 bg-transparent cursor-pointer text-sm"
              >
                ← Continue Shopping
              </button>
            </div>
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

export default CartPage;
