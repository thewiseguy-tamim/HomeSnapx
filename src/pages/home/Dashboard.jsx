import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
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

const StatCard = ({ icon: Icon, title, value, loading, error }) => {
  return (
    <div className="stat-card">
      <div className="card-body p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        </div>
        {loading ? (
          <p className="mt-2 text-2xl font-bold text-gray-600">Loading...</p>
        ) : error ? (
          <p className="mt-2 text-sm text-indigo-700 bg-indigo-100 px-2 py-1 rounded w-fit">Admin Only</p>
        ) : (
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
};

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await authApiClient.get("/orders/");
        const fetchedOrders = res.data.results || res.data;
        const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrders(sortedOrders.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status.toUpperCase()) {
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

  return (
    <div className="mt-6 order-card">
      <div className="card-body">
        <h3 className="card-title text-lg text-gray-800">Recent Orders</h3>
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
            <p className="text-gray-600">No recent orders found.</p>
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
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const servicesRes = await authApiClient.get("/services/");
        const totalServices = (servicesRes.data.results || servicesRes.data).length;

        let totalOrders = 0;
        try {
          const ordersRes = await authApiClient.get("/orders/");
          totalOrders = (ordersRes.data.results || ordersRes.data).length;
        } catch (orderError) {
          console.error("Failed to fetch orders:", orderError);
        }

        let totalUsers = 0;
        try {
          const usersRes = await authApiClient.get("/users/");
          totalUsers = (usersRes.data.results || usersRes.data).length;
        } catch (error) {
          console.error("Failed to fetch users:", error);
          setUserError("Admin access required to view users.");
        }

        const reviewsRes = await authApiClient.get("/reviews/");
        const reviews = reviewsRes.data.results || reviewsRes.data;
        const averageRating =
          reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
            : 0;

        setStats({
          totalServices,
          totalOrders,
          totalUsers,
          averageRating,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        setUserError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Dashboard</h1>
      {userError && <p className="text-red-500 mb-4">{userError}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FiPackage}
          title="Total Services"
          value={stats.totalServices}
          loading={loading}
          error={userError}
        />
        <StatCard
          icon={FiShoppingCart}
          title="Total Orders"
          value={stats.totalOrders}
          loading={loading}
          error={null}
        />
        <StatCard
          icon={FiUsers}
          title="Total Users"
          value={stats.totalUsers}
          loading={loading}
          error={userError}
        />
        <StatCard
          icon={FiStar}
          title="Average Rating"
          value={stats.averageRating}
          loading={loading}
          error={userError}
        />
      </div>
      <Order />
    </div>
  );
}