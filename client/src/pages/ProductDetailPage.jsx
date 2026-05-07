import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const empty = 5 - full;
    return "★".repeat(full) + "☆".repeat(empty);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <div className="animate-spin rounded-full h-14 w-14 border-4 border-rose-500 border-t-transparent mb-4" />
          <p className="text-gray-400 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="text-center py-32">
          <p className="text-5xl mb-4">😞</p>
          <p className="text-red-500 font-semibold text-lg">{error || "Product not found"}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-rose-600 text-white px-6 py-2 rounded-xl hover:bg-rose-700 transition-all border-none cursor-pointer"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb / Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium text-sm mb-6 bg-transparent border-none cursor-pointer p-0"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 flex flex-col md:flex-row gap-10">
          {/* Left: Image */}
          <div className="flex-1 min-w-0">
            <div className="relative rounded-xl overflow-hidden bg-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-h-96 object-contain"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                  <span className="bg-red-500 text-white px-5 py-2 rounded-full font-bold">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 min-w-0">
            {/* Category & Brand */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-rose-50 text-rose-600 text-xs font-semibold px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-gray-400 text-xs uppercase tracking-wider font-medium">
                {product.brand}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-400 text-lg">{renderStars(product.rating || 0)}</span>
              <span className="text-gray-600 text-sm font-medium">
                {product.rating?.toFixed(1) || "0.0"}
              </span>
              <span className="text-gray-400 text-sm">({product.numReviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-4xl font-bold text-rose-600">
                ₹{product.price?.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-5">
              {product.stock > 10 ? (
                <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-sm font-semibold px-3 py-1.5 rounded-lg">
                  ✅ In Stock ({product.stock} available)
                </span>
              ) : product.stock > 0 ? (
                <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 text-sm font-semibold px-3 py-1.5 rounded-lg">
                  ⚡ Only {product.stock} left!
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 text-sm font-semibold px-3 py-1.5 rounded-lg">
                  ❌ Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              {product.description}
            </p>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700 font-semibold text-sm">Qty:</span>
                <div className="flex items-center gap-2 border-2 border-rose-200 rounded-xl px-3 py-1.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="text-rose-500 font-bold text-xl w-7 h-7 flex items-center justify-center hover:bg-rose-50 rounded-lg border-none bg-transparent cursor-pointer"
                  >
                    −
                  </button>
                  <span className="text-gray-800 font-bold text-lg min-w-8 text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="text-rose-500 font-bold text-xl w-7 h-7 flex items-center justify-center hover:bg-rose-50 rounded-lg border-none bg-transparent cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-500 text-sm">
                  Total: <strong className="text-rose-600">₹{(product.price * qty).toLocaleString("en-IN")}</strong>
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 min-w-32 py-3.5 rounded-xl font-semibold text-sm text-white border-none cursor-pointer transition-all ${
                  added
                    ? "bg-green-500"
                    : product.stock === 0
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                {added ? "✅ Added to Cart!" : "🛒 Add to Cart"}
              </button>

              <button
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                disabled={product.stock === 0}
                className="flex-1 min-w-32 py-3.5 rounded-xl font-semibold text-sm text-white bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed border-none cursor-pointer transition-all"
              >
                ⚡ Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
              <div className="text-xs text-gray-500">
                <div className="text-lg mb-1">🚚</div>
                <div className="font-medium text-gray-700">Free Delivery</div>
                <div>on orders over ₹500</div>
              </div>
              <div className="text-xs text-gray-500">
                <div className="text-lg mb-1">🔄</div>
                <div className="font-medium text-gray-700">Easy Returns</div>
                <div>7 day return policy</div>
              </div>
              <div className="text-xs text-gray-500">
                <div className="text-lg mb-1">🔒</div>
                <div className="font-medium text-gray-700">Secure Pay</div>
                <div>100% safe checkout</div>
              </div>
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

export default ProductDetailPage;
