import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("jwttoken");

      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://127.0.0.1:8000/api/my-orders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-8 text-gray-700">Loading orders...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-gray-700">You have no previous orders.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded shadow mb-6 cursor-pointer hover:shadow-lg"
            onClick={() => navigate(`/order/${order.id}`)}
          >
            <div className="flex justify-between mb-2">
              <p className="font-semibold text-lg">Order #{order.id}</p>
              <span
                className={`px-3 py-1 rounded text-sm ${order.status === "Completed"
                    ? "bg-green-200 text-green-800"
                    : order.status === "Cancelled"
                      ? "bg-red-200 text-red-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
              >
                {order.status}
              </span>
            </div>

            <p className="mb-2">Total Amount: ₹{order.total_price}</p>
            <p className="text-gray-500 text-sm mb-4">
              Date: {new Date(order.created_at).toLocaleString()}
            </p>

            <h3 className="font-semibold mb-2">Items:</h3>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 items-center mb-2 bg-gray-50 p-2 rounded"
              >
                <img
                  src={
                    item.product.images?.[0]?.image
                      ? `http://127.0.0.1:8000${item.product.images[0].image}`
                      : "https://via.placeholder.com/50"
                  }
                  alt={item.product.heading}
                  className="w-12 h-12 object-contain rounded"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.product.heading}</p>
                  <p className="text-gray-600 text-sm">
                    Qty: {item.quantity} | ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistoryPage;
