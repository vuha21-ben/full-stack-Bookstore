const db = require("../config/db");
const bcrypt = require("bcrypt");

// Đăng ký tài khoản
exports.register = (req, res) => {
    const { username, password } = req.body;

    const checkUser = "SELECT * FROM users WHERE username = ?";
    db.query(checkUser, [username], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            res.json({ message: "User registered successfully" });
        });
    });
};

// Đăng nhập
// exports.login = (req, res) => {
//     const { username, password } = req.body;

//     const sql = "SELECT * FROM users WHERE username = ?";
//     db.query(sql, [username], (err, result) => {
//         if (err) return res.status(500).json({ error: err });

//         if (result.length === 0) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         const user = result[0];

//         const passwordMatch = bcrypt.compareSync(password, user.password);

//         if (!passwordMatch) {
//             return res.status(400).json({ message: "Incorrect password" });
//         }

//         res.json({ message: "Login successful", userId: user.id });
//     });
// };

const jwt = require("jsonwebtoken");
const SECRET_KEY = "mysecretkey123"; // Có thể đặt trong .env

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length === 0) {
            return res.status(400).json({ message: "User not found" });
        }

        const user = result[0];

        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // 🟢 TẠO JWT TOKEN
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    });
};

