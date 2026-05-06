import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosInstance";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products");
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Navbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
        <h2>🛒 eKart</h2>
        <div>
          {user ? (
            <>
              <span style={{ marginRight: "15px" }}>Hello, {user.name}</span>
              <button onClick={handleLogout} style={{ padding: "8px 16px", cursor: "pointer" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/login")} style={{ marginRight: "10px", padding: "8px 16px", cursor: "pointer" }}>
                Login
              </button>
              <button onClick={() => navigate("/register")} style={{ padding: "8px 16px", cursor: "pointer" }}>
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Products */}
      <h3>All Products</h3>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && products.length === 0 && (
        <p>No products found. Add some from the admin panel.</p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {products.map((product) => (
          <div key={product._id} style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "15px" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "4px" }} />
            <h4 style={{ marginTop: "10px" }}>{product.name}</h4>
            <p style={{ color: "gray" }}>{product.category}</p>
            <p style={{ fontWeight: "bold" }}>₹{product.price}</p>
            <button style={{ width: "100%", padding: "8px", background: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;