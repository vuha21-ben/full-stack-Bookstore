// require("dotenv").config();   // 👈 PHẢI CÓ

// const express = require("express");
// const cors = require("cors");
// const db = require("./config/db");

// const bookRoutes = require("./routes/bookRoutes");
// const userRoutes = require("./routes/userRoutes");
// const cartRoutes = require("./routes/cartRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Backend API is running!");
// });

// // API Books
// app.use("/api/books", bookRoutes);

// // API Users
// app.use("/api/users", userRoutes);

// app.use("/api/cart", cartRoutes);


// app.listen(3001, () => {
//     console.log("Server is running on port 3001");
// });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend API is running!");
});

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});


