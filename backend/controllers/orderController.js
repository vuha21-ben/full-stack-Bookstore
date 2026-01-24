const db = require("../config/db");

// ===============================
// 1) TẠO ĐƠN HÀNG
// ===============================
exports.createOrder = (req, res) => {
    const user_id = req.user.id;

    // Lấy giỏ hàng của user
    const getCartSQL = `
        SELECT cart_items.*, books.price 
        FROM cart_items 
        JOIN books ON cart_items.book_id = books.id
        WHERE cart_items.user_id = ?
    `;

    db.query(getCartSQL, [user_id], (err, cartItems) => {
        if (err) return res.status(500).json(err);

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Tính tổng tiền
        const totalPrice = cartItems.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        // Tạo đơn hàng
        const createOrderSQL = `
            INSERT INTO orders (user_id, total_price)
            VALUES (?, ?)
        `;

        db.query(createOrderSQL, [user_id, totalPrice], (err, result) => {
            if (err) return res.status(500).json(err);

            const order_id = result.insertId;

            // Tạo order_items
            const orderItemSQL = `
                INSERT INTO order_items (order_id, book_id, quantity, price)
                VALUES ?
            `;

            const orderItemValues = cartItems.map(item => [
                order_id,
                item.book_id,
                item.quantity,
                item.price
            ]);

            db.query(orderItemSQL, [orderItemValues], (err) => {
                if (err) return res.status(500).json(err);

                // Xóa giỏ hàng sau khi mua
                const clearCartSQL = `DELETE FROM cart_items WHERE user_id = ?`;

                db.query(clearCartSQL, [user_id], () => {
                    res.json({
                        message: "Order created successfully",
                        order_id,
                        total_price: totalPrice
                    });
                });
            });
        });
    });
};

// ===============================
// 2) USER XEM ĐƠN HÀNG CỦA CHÍNH MÌNH
// ===============================
exports.getMyOrders = (req, res) => {
    const user_id = req.user.id;

    const sql = `SELECT * FROM orders WHERE user_id = ?`;

    db.query(sql, [user_id], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// ===============================
// 3) ADMIN XEM TẤT CẢ ĐƠN HÀNG
// ===============================
exports.getAllOrders = (req, res) => {
    const sql = "SELECT * FROM orders ORDER BY created_at DESC";

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};



exports.getOrderDetail = (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;

  // Lấy đơn hàng (đảm bảo user chỉ xem đơn của mình)
  const orderSql = `
    SELECT * FROM orders 
    WHERE id = ? AND user_id = ?
  `;

  db.query(orderSql, [orderId, userId], (err, orders) => {
    if (err) return res.status(500).json(err);
    if (orders.length === 0)
      return res.status(404).json({ message: "Order not found" });

    // Lấy item trong đơn
    const itemsSql = `
      SELECT b.title, oi.price, oi.quantity
      FROM order_items oi
      JOIN books b ON oi.book_id = b.id
      WHERE oi.order_id = ?
    `;

    db.query(itemsSql, [orderId], (err2, items) => {
      if (err2) return res.status(500).json(err2);

      res.json({
        order: orders[0],
        items,
      });
    });
  });
};
