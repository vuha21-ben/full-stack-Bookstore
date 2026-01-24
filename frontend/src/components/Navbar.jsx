// import { Link } from "react-router-dom";

// function Navbar() {
//   const role = localStorage.getItem("role");

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           📚 BookStore
//         </Link>

//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Books
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">
//                 Cart
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/my-orders">
//                 My Orders
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/login">
//                 Login
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


// import { Link } from "react-router-dom";

// function Navbar() {

//   const role = localStorage.getItem("role");

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/">
//           📚 BookStore
//         </Link>

//         <div className="collapse navbar-collapse">
//           <ul className="navbar-nav ms-auto">
//             <li className="nav-item">
//               <Link className="nav-link" to="/">
//                 Books
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">
//                 Cart
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/my-orders">
//                 My Orders
//               </Link>
//             </li>

//             {/* 👇 CHỈ HIỆN KHI ROLE = ADMIN */}
//             {role === "admin" && (
//               <li className="nav-item">
//                 <Link className="nav-link" to="/admin/orders">
//                   Admin Orders
//                 </Link>
//               </li>
//             )}

//             <li className="nav-item">
//               <Link className="nav-link" to="/login">
//                 Login
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("role");
  //   navigate("/login");
  // };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/auth", { replace: true });
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          📚 BookStore
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {/* BOOKS – ai cũng xem được */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Books
              </Link>
            </li>

            {/* ===== USER MENU ===== */}
            {role === "user" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    Cart
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-orders">
                    My Orders
                  </Link>
                </li>
              </>
            )}

            {/* ===== ADMIN MENU ===== */}
            {role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/books">
                    Manage Books
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link className="nav-link" to="/admin/orders">
                    Admin Orders
                  </Link>
                </li> */}
              </>
            )}

            {/* ===== AUTH ===== */}
            {!token ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
