// const express = require("express");
// const router = express.Router();
// const bookController = require("../controllers/bookController");

// // Lấy danh sách sách
// router.get("/", bookController.getBooks);


// // Lấy 1 sách theo id
// router.get("/:id", bookController.getBookById);

// // Thêm sách
// router.post("/add", bookController.createBook);

// // Cập nhật sách
// router.put("/:id", bookController.updateBook);

// // Xóa sách
// router.delete("/:id", bookController.deleteBook);




// console.log("Book routes loaded!");


// module.exports = router;





const express = require("express");
const router = express.Router();

const bookController = require("../controllers/bookController");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

// ⚠ SEARCH & PAGE phải đặt TRƯỚC :id
router.get("/search", bookController.searchBooks);
router.get("/page", bookController.getBooksPaging);

// ===== PUBLIC ROUTES =====
router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);

// ===== ADMIN ROUTES =====
router.post("/add", auth, isAdmin, bookController.createBook);
router.put("/:id", auth, isAdmin, bookController.updateBook);
router.delete("/:id", auth, isAdmin, bookController.deleteBook);

module.exports = router;



