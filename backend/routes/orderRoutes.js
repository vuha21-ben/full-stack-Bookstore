// const express = require("express");
// const router = express.Router();
// const orderController = require("../controllers/orderController");
// const auth = require("../middleware/auth");
// router.get("/:id", auth, orderController.getOrderDetail);

// // 👍 1) User tạo đơn hàng
// router.post("/create", auth, orderController.createOrder);

// // 👍 2) User xem đơn hàng của chính mình
// router.get("/my-orders", auth, orderController.getMyOrders);

// // 👍 3) Admin xem tất cả đơn hàng
// router.get("/all", auth, (req, res, next) => {
//     if (req.user.role !== "admin") {
//         return res.status(403).json({ message: "Access denied" });
//     }
//     next();
// }, orderController.getAllOrders);

// module.exports = router;


const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

// 👍 1) User tạo đơn hàng
router.post("/create", auth, orderController.createOrder);

// 👍 2) User xem đơn hàng của chính mình
router.get("/my-orders", auth, orderController.getMyOrders);

// 👍 3) Admin xem tất cả đơn hàng
router.get("/all", auth, (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
}, orderController.getAllOrders);

// ✅ 4) User xem chi tiết 1 đơn hàng (ĐẶT CUỐI)
router.get("/:id", auth, orderController.getOrderDetail);

module.exports = router;

