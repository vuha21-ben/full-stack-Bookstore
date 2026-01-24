
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import BookList from "./pages/BookList";
// import Cart from "./pages/Cart";
// import Login from "./pages/Login";
// import MyOrders from "./pages/MyOrders";
// import OrderDetail from "./pages/OrderDetail";
// import AdminBooks from "./pages/AdminBooks";
// import Register from "./pages/Register";
// import AdminRoute from "./routes/AdminRoute";
// import UserRoute from "./routes/UserRoute";

// import Auth from "./pages/Auth";






// function AppContent() {
//   const location = useLocation();

//   const hideNavbar =
//     location.pathname === "/login" ||
//     location.pathname === "/register";
//     location.pathname === "/auth";

//   return (
//     <>
//       {!hideNavbar && <Navbar />}

//       <Routes>
//         {/* PUBLIC */}
//         <Route path="/" element={<BookList />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route path="/auth" element={<Auth />} />


//         {/* USER ONLY */}
//         <Route
//           path="/cart"
//           element={
//             <UserRoute>
//               <Cart />
//             </UserRoute>
//           }
//         />

//         <Route
//           path="/my-orders"
//           element={
//             <UserRoute>
//               <MyOrders />
//             </UserRoute>
//           }
//         />

//         <Route
//           path="/orders/:id"
//           element={
//             <UserRoute>
//               <OrderDetail />
//             </UserRoute>
//           }
//         />

//         {/* ADMIN ONLY */}
//         <Route
//           path="/admin/books"
//           element={
//             <AdminRoute>
//               <AdminBooks />
//             </AdminRoute>
//           }
//         />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppContent />
//     </BrowserRouter>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import BookList from "./pages/BookList";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import OrderDetail from "./pages/OrderDetail";
import AdminBooks from "./pages/AdminBooks";
import Register from "./pages/Register";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from "./routes/UserRoute";
import Auth from "./pages/Auth";



function AppContent() {
  const location = useLocation();

  // Ẩn Navbar ở các trang auth
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/auth";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />

        {/* USER ONLY */}
        <Route
          path="/cart"
          element={
            <UserRoute>
              <Cart />
            </UserRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <UserRoute>
              <MyOrders />
            </UserRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <UserRoute>
              <OrderDetail />
            </UserRoute>
          }
        />

        {/* ADMIN ONLY */}
        <Route
          path="/admin/books"
          element={
            <AdminRoute>
              <AdminBooks />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
