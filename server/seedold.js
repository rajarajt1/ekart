// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// // Connect DB
// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log("✅ MongoDB Connected");
// });

// // Product Model
// const productSchema = new mongoose.Schema(
//   {
//     name: String,
//     description: String,
//     price: Number,
//     image: String,
//     category: String,
//     brand: String,
//     stock: Number,
//     rating: { type: Number, default: 0 },
//     numReviews: { type: Number, default: 0 },
//   },
//   { timestamps: true }
// );

// const Product = mongoose.model("Product", productSchema);

// // ==================== SAMPLE PRODUCTS ====================
// const products = [

//   // ==================== ELECTRONICS ====================
//   {
//     name: "iPhone 15 Pro",
//     description:
//       "Latest Apple iPhone 15 Pro with A17 Pro chip, titanium design, and advanced camera system with 48MP main camera. Features USB-C connectivity and Action Button.",
//     price: 134900,
//     image:
//       "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format",
//     category: "Electronics",
//     brand: "Apple",
//     stock: 45,
//     rating: 4.8,
//     numReviews: 245,
//   },
//   {
//     name: "Samsung Galaxy S24 Ultra",
//     description:
//       "Samsung's flagship phone with built-in S Pen, 200MP camera, Snapdragon 8 Gen 3 processor, and 5000mAh battery with AI features.",
//     price: 124999,
//     image:
//       "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format",
//     category: "Electronics",
//     brand: "Samsung",
//     stock: 30,
//     rating: 4.7,
//     numReviews: 189,
//   },
//   {
//     name: "MacBook Air M3",
//     description:
//       "Apple MacBook Air with M3 chip, 13-inch Liquid Retina display, 8GB RAM, 256GB SSD. Ultra-thin design with 18-hour battery life.",
//     price: 114900,
//     image:
//       "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format",
//     category: "Electronics",
//     brand: "Apple",
//     stock: 20,
//     rating: 4.9,
//     numReviews: 312,
//   },
//   {
//     name: "Sony WH-1000XM5 Headphones",
//     description:
//       "Industry-leading noise canceling wireless headphones with 30-hour battery life, multipoint connection, and crystal clear hands-free calling.",
//     price: 29990,
//     image:
//       "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&auto=format",
//     category: "Electronics",
//     brand: "Sony",
//     stock: 60,
//     rating: 4.8,
//     numReviews: 432,
//   },
//   {
//     name: "iPad Pro 12.9 inch",
//     description:
//       "Apple iPad Pro with M2 chip, stunning Liquid Retina XDR display, Thunderbolt connectivity, and support for Apple Pencil 2nd generation.",
//     price: 112900,
//     image:
//       "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format",
//     category: "Electronics",
//     brand: "Apple",
//     stock: 25,
//     rating: 4.7,
//     numReviews: 178,
//   },
//   {
//     name: "Dell XPS 15 Laptop",
//     description:
//       "Dell XPS 15 with Intel Core i7 13th Gen, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX 4060, 15.6-inch OLED display.",
//     price: 179990,
//     image:
//       "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&auto=format",
//     category: "Electronics",
//     brand: "Dell",
//     stock: 15,
//     rating: 4.6,
//     numReviews: 134,
//   },
//   {
//     name: "OnePlus 12",
//     description:
//       "OnePlus 12 with Snapdragon 8 Gen 3, Hasselblad camera system, 100W SUPERVOOC charging, 5400mAh battery, and 120Hz AMOLED display.",
//     price: 64999,
//     image:
//       "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&auto=format",
//     category: "Electronics",
//     brand: "OnePlus",
//     stock: 40,
//     rating: 4.5,
//     numReviews: 267,
//   },
//   {
//     name: "boAt Airdopes 141",
//     description:
//       "boAt Airdopes 141 TWS earphones with 42H total playback, IWP technology, BEAST Mode for gaming, and IPX4 water resistance.",
//     price: 1299,
//     image:
//       "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format",
//     category: "Electronics",
//     brand: "boAt",
//     stock: 200,
//     rating: 4.2,
//     numReviews: 1543,
//   },

//   // ==================== CLOTHING ====================
//   {
//     name: "Men's Casual Cotton T-Shirt",
//     description:
//       "Premium 100% cotton casual t-shirt for men. Comfortable fit with round neck design. Available in multiple colors. Perfect for everyday wear.",
//     price: 599,
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format",
//     category: "Clothing",
//     brand: "H&M",
//     stock: 150,
//     rating: 4.3,
//     numReviews: 892,
//   },
//   {
//     name: "Women's Floral Summer Dress",
//     description:
//       "Beautiful floral print summer dress for women. Light and breathable fabric. Perfect for casual outings and summer days. Available in sizes S to XL.",
//     price: 1499,
//     image:
//       "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format",
//     category: "Clothing",
//     brand: "Zara",
//     stock: 80,
//     rating: 4.5,
//     numReviews: 456,
//   },
//   {
//     name: "Men's Slim Fit Jeans",
//     description:
//       "Classic slim fit denim jeans for men. Made with stretch denim for comfort. Features 5-pocket styling with button and zip closure. Machine washable.",
//     price: 1999,
//     image:
//       "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format",
//     category: "Clothing",
//     brand: "Levi's",
//     stock: 100,
//     rating: 4.4,
//     numReviews: 678,
//   },
//   {
//     name: "Women's Yoga Leggings",
//     description:
//       "High-waist yoga leggings with moisture-wicking fabric. Four-way stretch for full range of motion. Squat-proof and comfortable for all workouts.",
//     price: 1299,
//     image:
//       "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&auto=format",
//     category: "Clothing",
//     brand: "Nike",
//     stock: 120,
//     rating: 4.6,
//     numReviews: 534,
//   },

//   // ==================== SHOES ====================
//   {
//     name: "Nike Air Max 270",
//     description:
//       "Nike Air Max 270 running shoes with Max Air unit in the heel for all-day cushioning. Mesh upper for breathability. Foam midsole for lightweight comfort.",
//     price: 12995,
//     image:
//       "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format",
//     category: "Shoes",
//     brand: "Nike",
//     stock: 75,
//     rating: 4.7,
//     numReviews: 892,
//   },
//   {
//     name: "Adidas Ultraboost 23",
//     description:
//       "Adidas Ultraboost 23 with responsive BOOST cushioning, Primeknit+ upper, and Continental rubber outsole. Perfect for running and everyday wear.",
//     price: 16999,
//     image:
//       "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format",
//     category: "Shoes",
//     brand: "Adidas",
//     stock: 50,
//     rating: 4.6,
//     numReviews: 567,
//   },
//   {
//     name: "Puma Classic Sneakers",
//     description:
//       "Puma classic leather sneakers with timeless design. Cushioned insole for all-day comfort. Low-cut silhouette with lace-up closure.",
//     price: 4999,
//     image:
//       "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=500&auto=format",
//     category: "Shoes",
//     brand: "Puma",
//     stock: 90,
//     rating: 4.4,
//     numReviews: 345,
//   },
//   {
//     name: "Woodland Men's Boots",
//     description:
//       "Genuine leather Woodland boots with waterproof construction. Rubber outsole for grip and durability. Perfect for outdoor adventures and trekking.",
//     price: 5999,
//     image:
//       "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500&auto=format",
//     category: "Shoes",
//     brand: "Woodland",
//     stock: 40,
//     rating: 4.5,
//     numReviews: 289,
//   },

//   // ==================== BOOKS ====================
//   {
//     name: "Atomic Habits by James Clear",
//     description:
//       "A revolutionary system to get 1 percent better every day. Learn how tiny changes in behavior can lead to remarkable results and transform your life.",
//     price: 499,
//     image:
//       "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format",
//     category: "Books",
//     brand: "Penguin Books",
//     stock: 200,
//     rating: 4.9,
//     numReviews: 3421,
//   },
//   {
//     name: "Rich Dad Poor Dad",
//     description:
//       "Robert Kiyosaki's personal finance classic about what the rich teach their kids about money that the poor and middle class do not.",
//     price: 399,
//     image:
//       "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format",
//     category: "Books",
//     brand: "Plata Publishing",
//     stock: 150,
//     rating: 4.7,
//     numReviews: 2876,
//   },
//   {
//     name: "The Psychology of Money",
//     description:
//       "Morgan Housel's timeless lessons on wealth, greed, and happiness. Explains how your mindset around money is more important than financial knowledge.",
//     price: 449,
//     image:
//       "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format",
//     category: "Books",
//     brand: "Harriman House",
//     stock: 175,
//     rating: 4.8,
//     numReviews: 1987,
//   },

//   // ==================== HOME & KITCHEN ====================
//   {
//     name: "Instant Pot Duo 7-in-1",
//     description:
//       "7-in-1 electric pressure cooker that works as slow cooker, rice cooker, steamer, saute pan, yogurt maker, and warmer. 6-quart capacity for family cooking.",
//     price: 8999,
//     image:
//       "https://images.unsplash.com/photo-1585837575652-267c041d77d4?w=500&auto=format",
//     category: "Home & Kitchen",
//     brand: "Instant Pot",
//     stock: 35,
//     rating: 4.7,
//     numReviews: 1234,
//   },
//   {
//     name: "Philips Air Fryer XXL",
//     description:
//       "Philips Air Fryer with Rapid Air Technology for crispy results with up to 90% less fat. 1.4kg capacity perfect for the whole family. Easy to clean.",
//     price: 12999,
//     image:
//       "https://images.unsplash.com/photo-1648146329701-7e859dc86fc7?w=500&auto=format",
//     category: "Home & Kitchen",
//     brand: "Philips",
//     stock: 28,
//     rating: 4.6,
//     numReviews: 876,
//   },
//   {
//     name: "Himalaya Pink Salt Lamp",
//     description:
//       "Natural Himalayan crystal rock salt lamp with warm amber glow. Said to purify air and create a calming ambiance. Includes dimmer switch and bulb.",
//     price: 1499,
//     image:
//       "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format",
//     category: "Home & Kitchen",
//     brand: "Himalayan Glow",
//     stock: 65,
//     rating: 4.3,
//     numReviews: 567,
//   },

//   // ==================== SPORTS ====================
//   {
//     name: "Yoga Mat Premium 6mm",
//     description:
//       "Premium non-slip yoga mat with alignment lines. 6mm thick for joint support and comfort. Eco-friendly TPE material. Includes carry strap.",
//     price: 1999,
//     image:
//       "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&auto=format",
//     category: "Sports",
//     brand: "Boldfit",
//     stock: 90,
//     rating: 4.5,
//     numReviews: 743,
//   },
//   {
//     name: "Adjustable Dumbbell Set",
//     description:
//       "Adjustable dumbbell set from 5kg to 25kg per dumbbell. Space-saving design replaces 15 sets of weights. Quick-change weight selector mechanism.",
//     price: 24999,
//     image:
//       "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format",
//     category: "Sports",
//     brand: "PowerBlock",
//     stock: 15,
//     rating: 4.8,
//     numReviews: 432,
//   },
//   {
//     name: "Nivia Carbonite Football",
//     description:
//       "FIFA quality pro football with 32-panel design and thermally bonded construction. Suitable for professional matches and practice sessions.",
//     price: 1499,
//     image:
//       "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&auto=format",
//     category: "Sports",
//     brand: "Nivia",
//     stock: 80,
//     rating: 4.4,
//     numReviews: 389,
//   },

//   // ==================== BEAUTY ====================
//   {
//     name: "Lakme 9 to 5 Lipstick",
//     description:
//       "Long-lasting Lakme 9 to 5 lipstick with rich color payoff. Enriched with Vitamin E for moisturized lips. Stays fresh for up to 12 hours.",
//     price: 349,
//     image:
//       "https://images.unsplash.com/photo-1586495777744-4e6232bf7840?w=500&auto=format",
//     category: "Beauty",
//     brand: "Lakme",
//     stock: 200,
//     rating: 4.3,
//     numReviews: 1876,
//   },
//   {
//     name: "Neutrogena Face Wash",
//     description:
//       "Oil-free acne fighting face wash with salicylic acid. Removes oil, dirt, and makeup without over-drying. Dermatologist tested and gentle for daily use.",
//     price: 599,
//     image:
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&auto=format",
//     category: "Beauty",
//     brand: "Neutrogena",
//     stock: 120,
//     rating: 4.5,
//     numReviews: 2134,
//   },
//   {
//     name: "Biotique Bio Honey Gel",
//     description:
//       "Ayurvedic moisturizing face gel with honey and wheat germ. Hydrates and nourishes all skin types. No parabens, no chemicals, 100% botanical extracts.",
//     price: 199,
//     image:
//       "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format",
//     category: "Beauty",
//     brand: "Biotique",
//     stock: 150,
//     rating: 4.2,
//     numReviews: 876,
//   },

//   // ==================== TOYS ====================
//   {
//     name: "LEGO Classic Creative Brick Box",
//     description:
//       "LEGO Classic 484-piece brick box with storage. Includes bricks in 29 different colors for unlimited creative building. For ages 4 and above.",
//     price: 3499,
//     image:
//       "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500&auto=format",
//     category: "Toys",
//     brand: "LEGO",
//     stock: 55,
//     rating: 4.9,
//     numReviews: 987,
//   },
//   {
//     name: "Remote Control Racing Car",
//     description:
//       "High-speed 1:16 scale RC racing car with 2.4GHz radio control. Speed up to 30 km/h. 4WD off-road capability. Rechargeable battery included.",
//     price: 2499,
//     image:
//       "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=500&auto=format",
//     category: "Toys",
//     brand: "Redcat Racing",
//     stock: 40,
//     rating: 4.4,
//     numReviews: 567,
//   },
// ];

// // ==================== SEED FUNCTION ====================
// const seedProducts = async () => {
//   try {
//     // Delete existing products
//     await Product.deleteMany({});
//     console.log("🗑️  Old products deleted");

//     // Insert new products
//     const created = await Product.insertMany(products);
//     console.log(`✅ ${created.length} products added 