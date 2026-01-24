import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Cart() {
  const [items, setItems] = useState([]);

  // 🔹 Load cart
  const fetchCart = async () => {
    try {
      const res = await axiosClient.get("/cart");
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Bạn cần đăng nhập để xem giỏ hàng");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔹 Update quantity (+ / -)
  const updateQuantity = async (itemId, quantity) => {
    try {
      await axiosClient.put(`/cart/update/${itemId}`, {
        quantity,
      });
      fetchCart(); // reload cart
    } catch (err) {
      console.error(err);
      alert("Update quantity failed");
    }
  };

  //Xoá 1 đơn hàng 
  const deleteItem = async (itemId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;

    try {
      await axiosClient.delete(`/cart/delete/${itemId}`);

      // load lại cart sau khi xóa
      fetchCart();
    } catch (err) {
      console.error(err);
      alert("Delete item failed");
    }
  };


  //Xoá toàn bộ đơn hàng 
  const clearCart = async () => {
  if (!window.confirm("Bạn có chắc muốn xóa toàn bộ giỏ hàng?")) return;

  try {
    await axiosClient.delete("/cart/clear");

    // load lại cart
    fetchCart();
    }catch (err) {
      console.error(err);
      alert("Clear cart failed");
    }
  };

  //Đặt hàng - thanh toán 
  const checkout = async () => {
    if (!window.confirm("Xác nhận thanh toán?")) return;

    try {
      await axiosClient.post("/orders/create");

      alert("Đặt hàng thành công!");
      fetchCart(); // cart sẽ trống sau checkout
    }catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };




  // 🔹 Total price
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2>🛒 Giỏ hàng</h2>

      {items.length === 0 ? (
        <p>Giỏ hàng trống</p>
      ) : (
        <>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Sách</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tạm tính</th>
                <th>Xóa</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price} đ</td>

                  {/* Quantity */}
                  <td>
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>

                    {item.quantity}

                    <button
                      className="btn btn-sm btn-outline-secondary ms-2"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </td>

                  <td>{item.price * item.quantity} đ</td>

                  {/* Remove */}
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteItem(item.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h4 className="text-end">
            Tổng tiền: <b>{total} đ</b>
          </h4>
          <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-success" onClick={checkout}>
                Thanh toán (Checkout)
              </button>
            <button className="btn btn-outline-danger" onClick={clearCart}>
              Xóa toàn bộ giỏ hàng
            </button>
          </div>

        </>
      )}
    </div>
  );
}

export default Cart;


