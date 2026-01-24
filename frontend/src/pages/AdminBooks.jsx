// import { useEffect, useState } from "react";
// import axiosClient from "../api/axiosClient";

// function AdminBooks() {
//   const [books, setBooks] = useState([]);
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [price, setPrice] = useState("");
  


//   const fetchBooks = async () => {
//     try {
//       const res = await axiosClient.get("/books");
//       setBooks(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Không lấy được danh sách sách");
//     }
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const deleteBook = async (id) => {
//     if (!window.confirm("Bạn có chắc muốn xoá sách này?")) return;

//     try {
//       await axiosClient.delete(`/books/${id}`);
//       fetchBooks(); // reload list
//     } catch (err) {
//       console.error(err);
//       alert("Xoá sách thất bại");
//     }
//   };

//   const addBook = async (e) => {
//   e.preventDefault();

//   if (!title || !author || !price) {
//     alert("Vui lòng nhập đầy đủ thông tin");
//     return;
//   }

//   try {
//     await axiosClient.post("/books/add", {
//       title,
//       author,
//       price,
//     });

//     // clear form
//     setTitle("");
//     setAuthor("");
//     setPrice("");

//     fetchBooks(); // reload list
//   } catch (err) {
//     console.error(err);
//     alert("Thêm sách thất bại");
//   }
// };


//   return (
//     <div className="container mt-5">
//       <h2>📚 Quản lý sách (Admin)</h2>
//       <form className="row g-3 mb-4" onSubmit={addBook}>
//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Tên sách"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div className="col-md-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Tác giả"
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//           />
//         </div>

//         <div className="col-md-2">
//           <input
//             type="number"
//             className="form-control"
//             placeholder="Giá"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>

//         <div className="col-md-2">
//           <button type="submit" className="btn btn-success w-100">
//             ➕ Thêm sách
//           </button>
//         </div>
//       </form>


//       <table className="table mt-3">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Tên sách</th>
//             <th>Tác giả</th>
//             <th>Giá</th>
//             <th>Hành động</th>
//           </tr>
//         </thead>

//         <tbody>
//           {books.map((book) => (
//             <tr key={book.id}>
//               <td>{book.id}</td>
//               <td>{book.title}</td>
//               <td>{book.author}</td>
//               <td>{book.price} đ</td>
//               <td>
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => deleteBook(book.id)}
//                 >
//                   Xoá
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default AdminBooks;


import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function AdminBooks() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(""); // 👈 IMAGE URL

  const fetchBooks = async () => {
    try {
      const res = await axiosClient.get("/books");
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert("Không lấy được danh sách sách");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá sách này?")) return;

    try {
      await axiosClient.delete(`/books/${id}`);
      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Xoá sách thất bại");
    }
  };

  // ✅ ADD BOOK
  const addBook = async (e) => {
    e.preventDefault();

    if (!title || !author || !price) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await axiosClient.post("/books/add", {
        title,
        author,
        price,
        image, // 👈 GỬI IMAGE
      });

      // clear form
      setTitle("");
      setAuthor("");
      setPrice("");
      setImage("");

      fetchBooks();
    } catch (err) {
      console.error(err);
      alert("Thêm sách thất bại");
    }
  };

  return (
    <div className="container mt-5">
      <h2>📚 Quản lý sách (Admin)</h2>

      {/* FORM ADD BOOK */}
      <form className="row g-3 mb-4" onSubmit={addBook}>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tên sách"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tác giả"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Giá"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* 👇 IMAGE URL */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Image URL (https://...)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="col-md-1">
          <button type="submit" className="btn btn-success w-100">
            ➕
          </button>
        </div>
      </form>

      {/* LIST BOOKS */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.price} đ</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBook(book.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBooks;

