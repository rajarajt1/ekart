const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("✅ MongoDB Connected");
}).catch((err) => {
  console.log("❌ Error:", err);
  process.exit(1);
});

// Product Schema (inline for seed)
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  brand: String,
  stock: Number,
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

const Product = mongoose.models.Product ||
  mongoose.model("Product", productSchema);

// ==========================================
// 12 Sample Products
// ==========================================
const sampleProducts = [
  // Electronics
  {
    name: "iPhone 15 Pro Max",
    description: "Apple iPhone 15 Pro Max with A17 Pro chip, 256GB storage, Titanium design, and ProRAW camera system. Experience the most powerful iPhone ever made.",
    price: 159900,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80",
    category: "Electronics",
    brand: "Apple",
    stock: 45,
    rating: 4.8,
    numReviews: 324,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung Galaxy S24 Ultra with Snapdragon 8 Gen 3, 200MP camera, built-in S Pen, 12GB RAM and 256GB storage.",
    price: 129999,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&q=80",
    category: "Electronics",
    brand: "Samsung",
    stock: 38,
    rating: 4.7,
    numReviews: 256,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling headphones with 30-hour battery life, multi-device connection, and crystal clear hands-free calling.",
    price: 29990,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80",
    category: "Electronics",
    brand: "Sony",
    stock: 62,
    rating: 4.9,
    numReviews: 512,
  },
  {
    name: "MacBook Air M2",
    description: "MacBook Air with M2 chip, 13.6-inch Liquid Retina display, 8GB RAM, 256GB SSD. Incredibly thin, super fast, and all-day battery life.",
    price: 114900,
    image: "https://images.unsplash.com/photo-1611186871525-9ce5c3a3f0e0?w=500&q=80",
    category: "Electronics",
    brand: "Apple",
    stock: 25,
    rating: 4.8,
    numReviews: 189,
  },

  // Clothing
  {
    name: "Men's Classic White Shirt",
    description: "Premium 100% cotton classic white formal shirt. Perfect for office wear, interviews, and formal occasions. Available in all sizes.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
    category: "Clothing",
    brand: "Allen Solly",
    stock: 150,
    rating: 4.3,
    numReviews: 87,
  },
  {
    name: "Women's Floral Kurta",
    description: "Beautiful floral printed kurta made from soft rayon fabric. Comfortable for daily wear and festive occasions. Machine washable.",
    price: 899,
    image: "https://images.unsplash.com/photo-1631233859262-0e9dd6b4bf24?w=500&q=80",
    category: "Clothing",
    brand: "W",
    stock: 200,
    rating: 4.5,
    numReviews: 143,
  },

  // Shoes
  {
    name: "Nike Air Max 270",
    description: "Nike Air Max 270 features the largest Max Air unit yet for an incredibly cushioned ride. Lifestyle sneaker with bold looks and ultimate comfort.",
    price: 12995,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    category: "Shoes",
    brand: "Nike",
    stock: 80,
    rating: 4.6,
    numReviews: 234,
  },
  {
    name: "Adidas Ultraboost 23",
    description: "Adidas Ultraboost 23 running shoes with BOOST midsole technology for incredible energy return. Perfect for long runs and daily training.",
    price: 16999,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80",
    category: "Shoes",
    brand: "Adidas",
    stock: 55,
    rating: 4.7,
    numReviews: 178,
  },

  // Books
  {
    name: "Atomic Habits - James Clear",
    description: "The life-changing million copy bestseller. Tiny Changes, Remarkable Results. Learn how to build good habits and break bad ones.",
    price: 399,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&q=80",
    category: "Books",
    brand: "Penguin Random House",
    stock: 300,
    rating: 4.9,
    numReviews: 876,
  },
  {
    name: "Rich Dad Poor Dad",
    description: "Robert Kiyosaki's #1 Personal Finance book of all time. What the rich teach their kids about money that the poor and middle class do not.",
    price: 299,
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&q=80",
    category: "Books",
    brand: "Plata Publishing",
    stock: 250,
    rating: 4.7,
    numReviews: 654,
  },

  // Home & Kitchen
  {
    name: "Philips Air Fryer HD9200",
    description: "Philips Air Fryer with Rapid Air Technology. Fry, bake, grill, and roast with up to 90% less fat. 4.1L capacity perfect for family of 4.",
    price: 6995,
    image: "https://images.unsplash.com/photo-1648503575960-29c51f1e3f41?w=500&q=80",
    category: "Home & Kitchen",
    brand: "Philips",
    stock: 42,
    rating: 4.5,
    numReviews: 321,
  },
  {
    name: "Prestige Electric Kettle",
    description: "Prestige 1.5L electric kettle with stainless steel body, auto shut-off, and boil-dry protection. Heats water in just 3-4 minutes.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=500&q=80",
    category: "Home & Kitchen",
    brand: "Prestige",
    stock: 95,
    rating: 4.4,
    numReviews: 213,
  },
];

// ==========================================
// Run Seed
// ==========================================
const seedProducts = async () => {
  try {
    // Delete existing products
    await Product.deleteMany({});
    console.log("🗑️  Old products deleted");

    // Insert new products
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✅ ${inserted.length} products added successfully!`);

    console.log("\n📦 Products added:");
    inserted.forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name} - ₹${p.price}`);
    });

    console.log("\n🚀 Now run your server and open http://localhost:5173");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error.message);
    process.exit(1);
  }
};

seedProducts();