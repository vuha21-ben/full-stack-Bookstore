const db = require("../config/db");

// 1) Thêm sách vào giỏ

exports.addToCart = (req, res) => {
    const user_id = req.user.id;   // lấy từ token
    const { book_id, quantity } = req.body;

    if (!book_id) {
        return res.status(400).json({ message: "Missing book_id" });
    }

    const sql = `
        INSERT INTO cart_items (user_id, book_id, quantity)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `;

    db.query(sql, [user_id, book_id, quantity || 1], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Added to cart successfully" });
    });
};



// 2) Lấy giỏ hàng của user

exports.getCart = (req, res) => {
    const user_id = req.user.id;

    const sql = `
        SELECT cart_items.*, books.title, books.author, books.price
        FROM cart_items
        JOIN books ON cart_items.book_id = books.id
        WHERE cart_items.user_id = ?
    `;

    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};


// 3) Cập nhật số lượng
// exports.updateCart = (req, res) => {
//     const { id, quantity } = req.body;

//     const sql = `
//         UPDATE cart_items SET quantity = ? WHERE id = ?
//     `;

//     db.query(sql, [quantity, id], (err) => {
//         if (err) return res.status(500).json(err);
//         res.json({ message: "Cart updated" });
//     });
// };

exports.updateCartItem = (req, res) => {
    const user_id = req.user.id;
    const { quantity } = req.body;
    const item_id = req.params.id;

    const sqlCheck = "SELECT * FROM cart_items WHERE id = ? AND user_id = ?";

    db.query(sqlCheck, [item_id, user_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0)
            return res.status(403).json({ message: "Not allowed" });

        const sqlUpdate = "UPDATE cart_items SET quantity = ? WHERE id = ?";
        db.query(sqlUpdate, [quantity, item_id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Cart updated" });
        });
    });
};



// 4) Xóa sản phẩm khỏi giỏ
exports.removeFromCart = (req, res) => {
    const user_id = req.user.id;
    const item_id = req.params.id;

    const sqlCheck = "SELECT * FROM cart_items WHERE id = ? AND user_id = ?";

    db.query(sqlCheck, [item_id, user_id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0)
            return res.status(403).json({ message: "Not allowed" });

        const sqlDelete = "DELETE FROM cart_items WHERE id = ?";
        db.query(sqlDelete, [item_id], (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Item removed" });
        });
    });
};



// 5) Xoá toàn bộ giỏ hàng của user đang đăng nhập
exports.clearCart = (req, res) => {
    const user_id = req.user.id; // 👈 LẤY TỪ TOKEN

    const sql = "DELETE FROM cart_items WHERE user_id = ?";

    db.query(sql, [user_id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Cart cleared successfully" });
    });
};

