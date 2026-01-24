import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Chưa đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Không phải admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Là admin → cho vào
  return children;
}

export default AdminRoute;