import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await axiosClient.get(`/orders/${id}`);
        setOrder(res.data.order);
        setItems(res.data.items);
      } catch (err) {
        console.error(err);
        alert("Không lấy được chi tiết đơn hàng");
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (!order) return <p className="container mt-5">Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>📦 Chi tiết đơn hàng #{order.id}</h2>

      <p>
        <b>Ngày tạo:</b>{" "}
        {new Date(order.created_at).toLocaleString()}
      </p>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Sách</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tạm tính</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.price} đ</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity} đ</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="text-end">
        Tổng tiền: <b>{order.total_price} đ</b>
      </h4>
    </div>
  );
}

export default OrderDetail;
