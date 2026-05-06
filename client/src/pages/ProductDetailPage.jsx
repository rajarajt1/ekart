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

  if (loading) {
    return (
      <div>
        <Navbar />
        <p style={{ textAlign: "center", padding: "50px" }}>
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Navbar />
        <p style={{ textAlign: "center", padding: "50px", color: "red" }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Navbar />

      <div style={styles.container}>
        {/* Back Button */}
        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div style={styles.productBox}>
          {/* Left: Image */}
          <div style={styles.imageBox}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.image}
            />
          </div>

          {/* Right: Details */}
          <div style={styles.details}>
            <h2 style={styles.productName}>{product.name}</h2>

            <p style={styles.category}>
              Category: <strong>{product.category}</strong>
            </p>

            <p style={styles.brand}>
              Brand: <strong>{product.brand}</strong>
            </p>

            {/* Rating */}
            <p style={styles.rating}>
              ⭐ {product.rating} / 5 ({product.numReviews} reviews)
            </p>

            {/* Price */}
            <p style={styles.price}>₹{product.price}</p>

            {/* Stock */}
            <p style={{
              color: product.stock > 0 ? "green" : "red",
              fontWeight: "600",
              marginBottom: "15px",
            }}>
              {product.stock > 0
                ? `✅ In Stock (${product.stock} available)`
                : "❌ Out of Stock"}
            </p>

            {/* Description */}
            <p style={styles.description}>{product.description}</p>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div style={styles.qtyRow}>
                <span style={{ fontWeight: "600" }}>Quantity:</span>
                <div style={styles.qtyControls}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span style={styles.qtyNum}>{qty}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() =>
                      setQty((q) => Math.min(product.stock, q + 1))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={styles.btnRow}>
              <button
                style={{
                  ...styles.addCartBtn,
                  background: added ? "#00cc66" : "#e94560",
                  opacity: product.stock === 0 ? 0.5 : 1,
                }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {added ? "✅ Added to Cart!" : "🛒 Add to Cart"}
              </button>

              <button
                style={styles.buyNowBtn}
                onClick={() => {
                  handleAddToCart();
                  navigate("/cart");
                }}
                disabled={product.stock === 0}
              >
                ⚡ Buy Now
              </button>
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
  backBtn: {
    background: "none",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
    color: "#e94560",
    marginBottom: "20px",
    fontWeight: "600",
  },
  productBox: {
    display: "flex",
    gap: "40px",
    background: "white",
    borderRadius: "15px",
    padding: "30px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    flexWrap: "wrap",
  },
  imageBox: {
    flex: 1,
    minWidth: "280px",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    objectFit: "cover",
    maxHeight: "400px",
  },
  details: {
    flex: 1,
    minWidth: "280px",
  },
  productName: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "10px",
  },
  category: {
    color: "#666",
    marginBottom: "5px",
  },
  brand: {
    color: "#666",
    marginBottom: "5px",
  },
  rating: {
    color: "#ff9800",
    marginBottom: "10px",
  },
  price: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#e94560",
    marginBottom: "10px",
  },
  description: {
    color: "#555",
    lineHeight: "1.7",
    marginBottom: "20px",
  },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
  },
  qtyControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "2px solid #e94560",
    borderRadius: "8px",
    padding: "4px 8px",
  },
  qtyBtn: {
    background: "none",
    border: "none",
    fontSize: "1.3rem",
    cursor: "pointer",
    color: "#e94560",
    fontWeight: "bold",
    padding: "0 5px",
  },
  qtyNum: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    minWidth: "30px",
    textAlign: "center",
  },
  btnRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  addCartBtn: {
    flex: 1,
    padding: "14px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "background 0.3s",
  },
  buyNowBtn: {
    flex: 1,
    padding: "14px",
    background: "#ff9800",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
  },
};

export default ProductDetailPage;