const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, getAllOrders } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.route("/").post(protect, createOrder).get(protect, adminOnly, getAllOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);

module.exports = router;