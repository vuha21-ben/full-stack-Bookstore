import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";


function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosClient.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Bạn cần đăng nhập để xem đơn hàng");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mt-5">
      <h2>📦 Đơn hàng của tôi</h2>

      {orders.length === 0 ? (
        <p>Chưa có đơn hàng nào</p>
      ) : (
        <table className="table mt-3">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Tổng tiền</th>
              <th>Ngày tạo</th>
              <th>Chi tiết</th> {/* 👈 THÊM */}
            </tr>
          </thead>
          {/* <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.total_price} đ</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.total_price} đ</td>
                <td>{new Date(order.created_at).toLocaleString()}</td>
                <td>
                  <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Xem chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default MyOrders;


