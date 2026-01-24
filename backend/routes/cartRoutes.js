// const express = require("express");
// const router = express.Router();
// const cartController = require("../controllers/cartController");

// router.post("/add", cartController.addToCart);
// router.get("/:user_id", cartController.getCart);
// router.put("/update", cartController.updateCart);
// router.delete("/remove/:id", cartController.removeFromCart);

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const cartController = require("../controllers/cartController");


// router.post("/add", cartController.addToCart);
// router.get("/:user_id", cartController.getCart);

// // RESTful update
// router.put("/update/:id", cartController.updateCartItem);

// // Delete 1 item
// router.delete("/delete/:id", cartController.removeFromCart);

// router.delete("/clear/:user_id", cartController.clearCart);


// module.exports = router;


const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cartController");
const auth = require("../middleware/auth");

// ================= CART ROUTES =================

// Thêm sản phẩm vào giỏ hàng (user đang đăng nhập)
router.post("/add", auth, cartController.addToCart);

// Lấy giỏ hàng của chính user đang đăng nhập
router.get("/", auth, cartController.getCart);

// Cập nhật số lượng item trong giỏ
router.put("/update/:id", auth, cartController.updateCartItem);

// Xóa 1 item khỏi giỏ
router.delete("/delete/:id", auth, cartController.removeFromCart);

// Xóa toàn bộ giỏ hàng
router.delete("/clear", auth, cartController.clearCart);

module.exports = router;
