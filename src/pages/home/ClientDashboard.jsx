import { useEffect, useState } from "react";
import { FiShoppingCart, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import authApiClient from "../../Services/auth-api-client";

// Add custom CSS for gradient backgrounds
const customStyles = `
  .dashboard-container {
    background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 50%, #c3dafe 100%);
    min-height: 100vh;
    padding: 2rem;
  }
  .stat-card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.9), rgba(240, 248, 255, 0.7));
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  }
  .order-card {
    background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(245, 248, 255, 0.8));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  }
  .table-zebra tr {
    transition: background-color 0.2s ease;
  }
  .table-zebra tr:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

// Inject styles into the document
const styleSheet = document.createElement("style");
styleSheet.innerText = customStyles;
document.head.appendChild(styleSheet);

const StatCard = ({ icon: Icon, title, value, loading }) => {
  return (
    <div className="stat-card">
      <div className="card-body p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        </div>
        {loading ? (
          <p className="mt-2 text-2xl font-bold text-gray-600">Loading...</p>
        ) : (
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
};

const Order = ({ orders, loading, error }) => {
  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "badge badge-success bg-green-500/80 text-white";
      case "PROCESSING":
      case "PENDING":
        return "badge badge-warning bg-yellow-500/80 text-white";
      case "SHIPPED":
        return "badge badge-info bg-blue-500/80 text-white";
      case "CANCELLED":
      case "FAILED":
        return "badge badge-error bg-red-500/80 text-white";
      default:
        return "badge badge-neutral bg-gray-500/80 text-white";
    }
  };

  const getServiceName = (order) => {
    // Try both `items` and `order_items` to handle potential API inconsistencies
    const items = order.items || order.order_items || [];
    return items?.[0]?.service?.name || "Unknown";
  };

  const getClientName = (order) => {
    return order.user?.first_name || "Unknown";
  };

  return (
    <div className="mt-6 order-card">
      <div className="card-body">
        <h3 className="card-title text-lg text-gray-800">Your Recent Orders</h3>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-600">Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length ? (
            <table className="table table-zebra">
              <thead>
                <tr className="text-gray-700">
                  <th>Order ID</th>
                  <th>Transaction ID</th>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.transaction_id || "N/A"}</td>
                    <td>{getClientName(order)}</td>
                    <td>{getServiceName(order)}</td>
                    <td>
                      <div className={getStatusBadge(order.status)}>{order.status || "Unknown"}</div>
                    </td>
                    <td>
                      {order.created_at
                        ? new Date(order.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td>${parseFloat(order.total_price || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No recent orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledFailedOrders: 0,
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all orders, handling pagination
        let allOrders = [];
        let nextPage = "/orders/";
        while (nextPage) {
          const response = await authApiClient.get(nextPage);
          const data = response.data;
          console.log("API response for /orders/:", data); // Debug: Inspect raw response
          allOrders = [...allOrders, ...(data.results || data)];
          nextPage = data.next; // Continue if there's a next page
        }

        console.log("Fetched orders:", allOrders); // Debug: Inspect processed orders

        // Verify orders belong to authenticated user
        if (allOrders.length > 0 && allOrders.some(order => !order.user)) {
          console.warn("Some orders lack user data, which should not happen with proper backend filtering.");
        }

        // Since backend filters by user, allOrders should only contain authenticated user's orders
        const userOrders = allOrders;

        if (!userOrders.length) {
          // setError("Yet to place any orders.");
          setStats({
            totalOrders: 0,
            pendingOrders: 0,
            completedOrders: 0,
            cancelledFailedOrders: 0,
          });
          setOrders([]);
          return;
        }

        // Calculate stats
        const totalOrders = userOrders.length;
        const pendingOrders = userOrders.filter((order) =>
          ["PENDING", "PROCESSING"].includes(order.status?.toUpperCase())
        ).length;
        const completedOrders = userOrders.filter((order) =>
          order.status?.toUpperCase() === "COMPLETED"
        ).length;
        const cancelledFailedOrders = userOrders.filter((order) =>
          ["CANCELLED", "FAILED"].includes(order.status?.toUpperCase())
        ).length;

        const sortedOrders = userOrders
          .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
          .slice(0, 20);

        setStats({
          totalOrders,
          pendingOrders,
          completedOrders,
          cancelledFailedOrders,
        });
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError(
          error.response?.status === 401
            ? "Unauthorized: Please check your authentication credentials."
            : error.response?.status === 403
            ? "Forbidden: You lack permission to view orders."
            : "Failed to load your dashboard data. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FiShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          loading={loading}
        />
        <StatCard
          icon={FiClock}
          title="Pending Orders"
          value={stats.pendingOrders}
          loading={loading}
        />
        <StatCard
          icon={FiCheckCircle}
          title="Completed Orders"
          value={stats.completedOrders}
          loading={loading}
        />
        <StatCard
          icon={FiXCircle}
          title="Cancelled/Failed Orders"
          value={stats.cancelledFailedOrders}
          loading={loading}
        />
      </div>
      <Order orders={orders} loading={loading} error={error} />
    </div>
  );
}