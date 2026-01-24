const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Badao114kk",   
    database: "bookstore"
});





db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Error:", err);
        return;
    }
    console.log("MySQL Connected!");
});

module.exports = db;






















// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });