import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";


import "../styles/book.css"; // 👈 nhớ import CSS

function BookList() {
  const [pageBooks, setPageBooks] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const limit = 36;
  const role = localStorage.getItem("role");
  const formatPrice = (price) => {
  return Number(price).toLocaleString("vi-VN");
  };


  // 🔹 Load sách theo page
  useEffect(() => {
    const fetchPageBooks = async () => {
      try {
        const res = await axiosClient.get(
          `/books/page?page=${page}&limit=${limit}`
        );
        setPageBooks(res.data.data || []);
      } catch (err) {
        console.error(err);
        setPageBooks([]);
      }
    };

    fetchPageBooks();
  }, [page]);

  // 🔹 Search trong page hiện tại
  const filteredBooks =
    keyword.trim() === ""
      ? pageBooks
      : pageBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(keyword.toLowerCase()) ||
            book.author.toLowerCase().includes(keyword.toLowerCase())
        );

  // 🔹 Add to cart
  const handleAddToCart = async (bookId) => {
    try {
      await axiosClient.post("/cart/add", {
        book_id: bookId,
        quantity: 1,
      });
      alert("Added to cart successfully!");
    } catch (err) {
      alert("Please login to add to cart");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">📚 Book List</h2>

      {/* SEARCH */}
      {/* <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search trong page hiện tại"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      /> */}
      <input
        type="text"
        className="form-control search-input mb-4"
        placeholder="🔍 Tìm sách trong trang hiện tại..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />      




      {/* BOOK GRID */}
      <div className="row">
        {filteredBooks.length === 0 && (
          <p className="text-muted text-center">
            Không có sách phù hợp trong page này
          </p>
        )}

        {filteredBooks.map((book) => (
          // <div className="col-md-2 col-sm-4 col-6 mb-4" key={book.id}>
          //   <div className="card book-card h-100">
          //     {/* IMAGE */}
          //     <img
          //       src={book.image}
          //       alt={book.title}
          //       className="book-image"
          //       onError={(e) => {
          //         e.target.src =
          //           "https://via.placeholder.com/300x400?text=No+Image";
          //       }}
          //     />

          //     {/* CONTENT */}
          //     <div className="card-body d-flex flex-column">
          //       <h6 className="card-title ">
          //         {book.title}
          //       </h6>
          //       <small className="text-muted">
          //         {book.author}
          //       </small>

          //       <p className="fw-bold text-danger mt-2">
          //         {/* {book.price} đ */}
          //         <td>{formatPrice(book.price)} đ</td>

          //       </p>

          //       {role === "user" && (
          //         <button
          //           className="btn btn-primary btn-sm mt-auto"
          //           onClick={() => handleAddToCart(book.id)}
          //         >
          //           Add to Cart
          //         </button>
          //       )}
          //     </div>
          //   </div>
          // </div>
          <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4" key={book.id}>
          <div className="book-card h-100">

      {/* ===== BADGE ===== */}
      {book.price > 100000 && (
        <span className="book-badge hot">HOT</span>
      )}

      {book.price <= 100000 && (
        <span className="book-badge new">NEW</span>
      )}
      {/* ================= */}

      <div className="book-image-wrapper">
        <img
          src={book.image}
          alt={book.title}
          className="book-image"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x400?text=No+Image";
          }}
        />
      </div>

            <div className="book-info">
              <h6 className="book-title" title={book.title}>
                {book.title}
              </h6>

              <p className="book-author">{book.author}</p>

              <p className="book-price">
                {formatPrice(book.price)} đ
              </p>

              {role === "user" && (
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(book.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>

        ))}
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <button
          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button
          className="btn btn-outline-primary"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      
    </div>
  );
}

export default BookList;
