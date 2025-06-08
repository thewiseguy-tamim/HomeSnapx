import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import authApiClient from "../../Services/auth-api-client";



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
  .filter-select {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 0.5rem;
    font-size: 0.9rem;
    color: #374151;
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

const Order = ({ statusFilter, setStatusFilter }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "PENDING", label: "Pending" },
    { value: "PROCESSING", label: "Processing" },
    { value: "SHIPPED", label: "Shipped" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
    { value: "FAILED", label: "Failed" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let allOrders = [];
        let nextPage = `/api/admin-orders/${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`;
        while (nextPage) {
          const response = await authApiClient.get(nextPage);
          if (!response.headers["content-type"]?.includes("application/json")) {
            console.error("Non-JSON response from admin-orders:", response.data);
            throw new Error("Received non-JSON response from server");
          }
          const data = response.data;
          allOrders = [...allOrders, ...(data.results || data)];
          nextPage = data.next;
        }
        console.log("Fetched orders:", allOrders);
        const sortedOrders = allOrders.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
        setError("Failed to load orders. Please try logging in again.");
        if (error.response?.status === 401) {
          localStorage.removeItem("authTokens");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [statusFilter]);

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

  const getCustomerFirstName = (order) => {
    return order.user?.first_name || "Unknown";
  };

  const getServiceName = (order) => {
    return order.items?.[0]?.service?.name || "Unknown";
  };

  return (
    <div className="mt-6 order-card">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h3 className="card-title text-lg text-gray-800">All Orders</h3>
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
                  <th>Customer</th>
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
                    <td>
                      {order.transaction_id ||
                        new URLSearchParams(window.location.search).get("tran_id") ||
                        "N/A"}
                    </td>
                    <td>{getCustomerFirstName(order)}</td>
                    <td>{getServiceName(order)}</td>
                    <td>
                      <div className={getStatusBadge(order.status)}>{order.status}</div>
                    </td>
                    <td>
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td>${parseFloat(order.total_price || 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalOrders: 0,
    totalUsers: 0,
    averageRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
  const fetchStats = async () => {
    try {
      setLoading(true);

      // Fetch services
      let totalServices = 0;
      try {
        const servicesRes = await authApiClient.get("/services/");
        if (!servicesRes.headers["content-type"]?.includes("application/json")) {
          console.error("Non-JSON response from services:", servicesRes.data);
          throw new Error("Received non-JSON response from server");
        }
        totalServices = (servicesRes.data.results || servicesRes.data).length;
      } catch (error) {
        console.error("Failed to fetch services:", error.message);
        totalServices = 0;
      }

      // Fetch orders
      let totalOrders = 0;
      let allOrders = [];
      let nextPage = `/api/admin-orders/${statusFilter !== "all" ? `?status=${statusFilter}` : ""}`;
      while (nextPage) {
        const ordersRes = await authApiClient.get(nextPage);
        if (!ordersRes.headers["content-type"]?.includes("application/json")) {
          console.error("Non-JSON response from admin-orders:", ordersRes.data);
          throw new Error("Received non-JSON response from server");
        }
        const data = ordersRes.data;
        allOrders = [...allOrders, ...(data.results || data)];
        nextPage = data.next;
      }
      totalOrders = allOrders.length;

      // Fetch users (optional)
      let totalUsers = 0;
      try {
        const usersRes = await authApiClient.get("/users/");
        if (!usersRes.headers["content-type"]?.includes("application/json")) {
          console.error("Non-JSON response from users:", usersRes.data);
          throw new Error("Received non-JSON response from server");
        }
        totalUsers = (usersRes.data.results || usersRes.data).length;
      } catch (error) {
        console.error("Failed to fetch users:", error.message);
        totalUsers = 0;
      }

      // Fetch reviews (optional)
      let averageRating = 0;
      try {
        const reviewsRes = await authApiClient.get("/reviews/");
        if (!reviewsRes.headers["content-type"]?.includes("application/json")) {
          console.error("Non-JSON response from reviews:", reviewsRes.data);
          throw new Error("Received non-JSON response from server");
        }
        const reviews = reviewsRes.data.results || reviewsRes.data;
        averageRating =
          reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
            : 0;
      } catch (error) {
        console.error("Failed to fetch reviews:", error.message);
        averageRating = 0;
      }

      setStats({
        totalServices,
        totalOrders,
        totalUsers,
        averageRating,
      });
    } catch (error) {
      console.error("Failed to fetch stats:", error.message);
      setError("Failed to load dashboard data. Please try logging in again.");
      if (error.response?.status === 401) {
        localStorage.removeItem("authTokens");
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };
  fetchStats();
}, [statusFilter]);

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FiPackage}
          title="Total Services"
          value={stats.totalServices}
          loading={loading}
        />
        <StatCard
          icon={FiShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          loading={loading}
        />
        <StatCard
          icon={FiUsers}
          title="Total Users"
          value={stats.totalUsers}
          loading={loading}
        />
        <StatCard
          icon={FiStar}
          title="Average Rating"
          value={stats.averageRating}
          loading={loading}
        />
      </div>
      <Order statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
    </div>
  );
}