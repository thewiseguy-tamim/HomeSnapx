import { useEffect, useState } from "react";
import authApiClient from "../../Services/auth-api-client";
import OrderCard from "../../components/Order/OrderCard";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await authApiClient.get("/orders/");
        console.log("Orders response:", res.data); 
        const fetchedOrders = res.data.results || res.data;
        const sortedOrders = fetchedOrders.sort((a, b) => {
          const statusPriority = {
            PENDING: 1,
            COMPLETED: 2,
            FAILED: 3,
            CANCELLED: 3,
          };
          return statusPriority[a.status] - statusPriority[b.status];
        });
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
      console.log("Cancel response:", response.data); 
      if (response.status === 200) {
        setOrders((prev) => {
          const updatedOrders = prev.map((order) =>
            order.id === orderId ? { ...order, status: "CANCELLED" } : order
          );
          // Re-sort orders after cancellation
          return updatedOrders.sort((a, b) => {
            const statusPriority = {
              PENDING: 1,
              COMPLETED: 2,
              FAILED: 3,
              CANCELLED: 3,
            };
            return statusPriority[a.status] - statusPriority[b.status];
          });
        });
        alert("Order canceled successfully.");
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Failed to cancel order: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length ? (
        orders.map((order) => (
          <OrderCard key={order.id} order={order} onCancel={handleCancelOrder} />
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default Orders;