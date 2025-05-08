import { useState, useEffect } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import OrderTable from "./OrderTable";
import authApiClient from "../../Services/auth-api-client";
import Cookies from 'js-cookie';

const OrderCard = ({ order, onCancel }) => {
  const { user } = useAuthContext();
  const [status, setStatus] = useState(order.status);
  const [loading, setLoading] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState(null);

  useEffect(() => {
    const loadItems = () => {
      if (!order.items || !Array.isArray(order.items)) {
        console.log("No items found in order:", order);
        setItems([]);
        setItemsLoading(false);
        return;
      }

      try {
        console.log("Order items:", order.items);
        setItems(order.items);
        setItemsLoading(false);
      } catch (err) {
        console.error("Error loading item details:", err);
        setItemsError("Failed to load item details. Please try again.");
        setItemsLoading(false);
      }
    };

    loadItems();
  }, [order.items]);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      const res = await authApiClient.patch(`/orders/${order.id}/`, {
        status: newStatus,
        total_price: order.total_price,
      });
      if (res.status === 200) {
        setStatus(newStatus);
        alert(`Order updated to: ${res.data.status}`);
      }
    } catch (err) {
      console.error("Status update error:", err);
      alert("Failed to update order status. Please try again later.");
    }
  };

  const handlePayment = async () => {
    // Validate payload
    if (!order.id) {
      alert("Invalid order ID.");
      return;
    }
    if (!order.total_price || parseFloat(order.total_price) <= 0) {
      alert("Order total rivetotal price must be positive.");
      return;
    }
    if (!items.length) {
      alert("No items in the order.");
      return;
    }
    const cus_name = `${user?.first_name || "Guest"} ${user?.last_name || ""}`.trim();
    const cus_email = user?.email || "guest@example.com";
    const cus_phone = user?.phone_number || "0000000000";
    const ship_postcode = "1000"; 
    if (!cus_name || cus_name.length < 2) {
      alert("Customer name must be at least 2 characters long.");
      return;
    }
    if (!cus_email || !cus_email.includes('@')) {
      alert("Valid customer email is required.");
      return;
    }
    if (!cus_phone || cus_phone.length < 5) {
      alert("Customer phone number must be at least 5 digits.");
      return;
    }
    if (!ship_postcode || ship_postcode.length < 4) {
      alert("Shipping postcode must be at least 4 characters.");
      return;
    }

    setLoading(true);
    try {
      const csrfToken = Cookies.get('csrftoken');
      const res = await authApiClient.post("/payment/initiate/", {
        amount: parseFloat(order.total_price),
        orderId: order.id,
        numItems: items.length,
        cus_name,
        cus_email,
        cus_phone,
        ship_postcode,
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      });

      if (res.data?.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        console.error("Payment response:", res.data);
        alert(`Payment initiation failed: ${res.data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Payment error:", err.response?.data || err.message);
      const errorMessage = err.response?.data?.error || "An error occurred while processing payment.";
      alert(`Payment failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setCanceling(true);
    try {
      await onCancel(order.id);
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel the order. Please try again.");
    } finally {
      setCanceling(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8">
      <div className="bg-gray-100 p-6 flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold">Order #{order.id}</h2>
          <p className="text-gray-600 text-sm">
            Placed on {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          {user?.is_staff ? (
            <select
              value={status}
              onChange={handleStatusChange}
              className="px-3 py-1 rounded-full text-white text-sm font-medium bg-blue-500"
            >
              <option value="PENDING">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          ) : (
            <span
  className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
    status === "PENDING" ? "bg-red-500" :
    status === "COMPLETED" ? "bg-green-500" :
    "bg-gray-500" 
  }`}
>
  {status}
</span>

          )}
          {!user?.is_staff &&
            status !== "COMPLETED" &&
            status !== "CANCELLED" && (
              <button
                onClick={handleCancel}
                className="text-blue-700 hover:underline"
                disabled={canceling}
              >
                {canceling ? "Canceling..." : "Cancel"}
              </button>
            )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-medium text-lg mb-4">Items</h3>
        {itemsLoading ? (
          <p className="animate-pulse text-gray-500">Loading items...</p>
        ) : itemsError ? (
          <p className="text-red-500">{itemsError}</p>
        ) : items.length > 0 ? (
          <OrderTable items={items} />
        ) : (
          <p>No items found for this order.</p>
        )}
      </div>

      <div className="border-t p-6 flex flex-col items-end">
        <div className="space-y-2 w-full max-w-[200px]">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>${parseFloat(order.total_price).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Total:</span>
            <span>${parseFloat(order.total_price).toFixed(2)}</span>
          </div>
        </div>
        {!user?.is_staff && status === "PENDING" && (
          <button
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;