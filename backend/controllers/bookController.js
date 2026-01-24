const db = require("../config/db");

// Lấy toàn bộ sách
// exports.getBooks = (req, res) => {
//     const sql = "SELECT * FROM books";
//     db.query(sql, (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         res.json(result);
//     });
// };

exports.getBooks = (req, res) => {
    const sql = "SELECT * FROM books WHERE is_deleted = 0";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result);
    });
};


// Lấy 1 sách theo id
exports.getBookById = (req, res) => {
    const sql = "SELECT * FROM books WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json(result[0]);
    });
};

// Thêm sách
exports.createBook = (req, res) => {
    const { title, author, price, description, image } = req.body;
    const sql = "INSERT INTO books (title, author, price, description, image) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [title, author, price, description, image], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Book added successfully", id: result.insertId });
    });
};

// Cập nhật sách
exports.updateBook = (req, res) => {
    const { title, author, price, description, image } = req.body;
    const sql = `
        UPDATE books 
        SET title=?, author=?, price=?, description=?, image=? 
        WHERE id=?
    `;
    db.query(sql, [title, author, price, description, image, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Book updated successfully" });
    });
};

// Xoá sách

// exports.deleteBook = (req, res) => {
//     const sql = "DELETE FROM books WHERE id = ?";
//     db.query(sql, [req.params.id], (err, result) => {
//         if (err) return res.status(500).json({ error: err });
//         res.json({ message: "Book deleted successfully" });
//     });
// };

exports.deleteBook = (req, res) => {
  const id = req.params.id;

  const sql = "UPDATE books SET is_deleted = 1 WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Delete book failed" });
    }

    res.json({ message: "Book soft-deleted successfully" });
  });
};


// Tìm kiếm sách theo keyword
// exports.searchBooks = (req, res) => {
//     const keyword = req.query.keyword;

//     if (!keyword) {
//         return res.status(400).json({ message: "Missing keyword" });
//     }

//     const sql = `
//         SELECT * FROM books
//         WHERE title LIKE ? 
//         OR author LIKE ?
//         OR description LIKE ?
//     `;

//     const searchValue = `%${keyword}%`;

//     db.query(sql, [searchValue, searchValue, searchValue], (err, result) => {
//         if (err) return res.status(500).json({ error: err });

//         res.json(result);
//     });
// };


exports.searchBooks = (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword) {
        return res.status(400).json({ message: "Missing keyword" });
    }

    const sql = `
        SELECT * FROM books
        WHERE is_deleted = 0
        AND (
            title LIKE ?
            OR author LIKE ?
            OR description LIKE ?
        )
    `;

    const searchValue = `%${keyword}%`;

    db.query(sql, [searchValue, searchValue, searchValue], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.json(result);
    });
};




// Lấy sách theo trang
// exports.getBooksPaging = (req, res) => {
//     const page = parseInt(req.query.page) || 1;   // Trang hiện tại
//     const limit = parseInt(req.query.limit) || 15; // Số sách mỗi trang
//     const offset = (page - 1) * limit;            // Bỏ qua bao nhiêu sách

//     const sql = `
//         SELECT * FROM books
//         LIMIT ? OFFSET ?
//     `;

//     db.query(sql, [limit, offset], (err, result) => {
//         if (err) return res.status(500).json({ error: err });

//         res.json({
//             page,
//             limit,
//             data: result
//         });
//     });
// };


exports.getBooksPaging = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;

    const sql = `
        SELECT * FROM books
        WHERE is_deleted = 0
        LIMIT ? OFFSET ?
    `;

    db.query(sql, [limit, offset], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        res.json({
            page,
            limit,
            data: result
        });
    });
};



