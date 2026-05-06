import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";

const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Shoes",
  "Books",
  "Home & Kitchen",
  "Sports",
  "Beauty",
];

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [addedMap, setAddedMap] = useState({});

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category !== "All") params.append("category", category);
      if (sort) params.append("sort", sort);
      params.append("limit", "100");

      const { data } = await axiosInstance.get(`/products?${params}`);
      setProducts(data.products || data || []);
    } catch (err) {
      setError("Failed to fetch products. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, sort]);

  // Search on enter key
  const handleSearchKey = (e) => {
    if (e.key === "Enter") fetchProducts();
  };

  // Add to cart with animation
  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedMap((prev) => ({ ...prev, [product._id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [product._id]: false }));
    }, 1500);
  };

  // Star rating display
  const renderStars = (rating) => {
    return "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">
          Welcome to <span className="text-red-500">eKart</span>
        </h1>
        <p className="text-gray-300 text-lg mb-6">
          Discover amazing products at great prices
        </p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearchKey}
            placeholder="Search products..."
            className="flex-1 px-5 py-3 rounded-xl text-gray-800 focus:outline-none text-sm"
          />
          <button
            onClick={fetchProducts}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Search
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Filter & Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all
                  ${category === cat
                    ? "bg-red-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500 border border-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-red-400 bg-white"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        {/* Results Info */}
        {!loading && (
          <p className="text-gray-500 text-sm mb-6">
            Showing <strong>{products.length}</strong> products
            {category !== "All" && ` in ${category}`}
            {search && ` for "${search}"`}
          </p>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-red-500 border-t-transparent mb-4" />
            <p className="text-gray-400 font-medium">Loading products...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">⚠️</p>
            <p className="text-red-500 font-semibold text-lg">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-xl"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">🛍️</p>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-400 mb-6">
              {search
                ? `No results for "${search}"`
                : "No products in this category yet"}
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-semibold"
            >
              Show All Products
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                {/* Image */}
                <div
                  className="relative overflow-hidden cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />

                  {/* Out of Stock Badge */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white bg-opacity-90 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4">
                  {/* Brand */}
                  <p className="text-gray-400 text-xs font-medium mb-1 uppercase tracking-wide">
                    {product.brand}
                  </p>

                  {/* Name */}
                  <h3
                    className="font-bold text-gray-800 text-sm mb-2 cursor-pointer hover:text-red-500 transition-colors line-clamp-2"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-400 text-sm">
                      {renderStars(product.rating || 0)}
                    </span>
                    <span className="text-gray-400 text-xs">
                      ({product.numReviews || 0})
                    </span>
                  </div>

                  {/* Price & Stock */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-red-500 font-bold text-xl">
                      ₹{product.price?.toLocaleString("en-IN")}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        product.stock > 10
                          ? "bg-green-100 text-green-600"
                          : product.stock > 0
                          ? "bg-orange-100 text-orange-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.stock > 10
                        ? "In Stock"
                        : product.stock > 0
                        ? `Only ${product.stock} left`
                        : "Out of Stock"}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="flex-1 py-2 border-2 border-red-500 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-50 transition-all"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className={`flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-all
                        ${addedMap[product._id]
                          ? "bg-green-500"
                          : product.stock === 0
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                      {addedMap[product._id] ? "✅ Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-8 mt-12">
        <p className="text-lg font-bold text-white mb-2">
          🛒 eKart
        </p>
        <p className="text-sm">
          Built with ❤️ using MongoDB + Express + React + Node.js
        </p>
      </footer>
    </div>
  );
};

export default ProductListPage;