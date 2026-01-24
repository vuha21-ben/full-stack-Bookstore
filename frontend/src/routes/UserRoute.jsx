import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Chưa đăng nhập
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Không phải user
  if (role !== "user") {
    return <Navigate to="/" replace />;
  }

  // ✅ Là user → cho vào
  return children;
}

export default UserRoute;