import { useEffect, useState } from "react";
import { FiPackage, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";
import authApiClient from "../../Services/auth-api-client";

const StatCard = ({ icon: Icon, title, value, loading, error }) => {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        {loading ? (
          <p className="mt-2 text-2xl font-bold">Loading...</p>
        ) : error ? (
          <p className="mt-2 text-sm text-indigo-700 bg-indigo-100 px-2 py-1 rounded w-fit">Admin Only</p>
        ) : (
          <p className="mt-2 text-2xl font-bold">{value}</p>
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
        return "badge badge-success";
      case "PROCESSING":
      case "PENDING":
        return "badge badge-warning";
      case "SHIPPED":
        return "badge badge-info";
      case "CANCELLED":
      case "FAILED":
        return "badge badge-error";
      default:
        return "badge badge-neutral";
    }
  };

  const getCustomerFirstName = (order) => {
    return order.user?.first_name || "Unknown";
  };

  return (
    <div className="mt-6 card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg">Recent Orders</h3>
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading orders...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : orders.length ? (
            <table className="table table-zebra">
              <thead>
                <tr>
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
            <p>No recent orders found.</p>
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
  // Modified: Added userError state to isolate user fetch errors from other stats
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const servicesRes = await authApiClient.get("/services/");
        const totalServices = (servicesRes.data.results || servicesRes.data).length;

        // Modified: Fetch Total Orders without error impacting other stats
        let totalOrders = 0;
        try {
          const ordersRes = await authApiClient.get("/orders/");
          totalOrders = (ordersRes.data.results || ordersRes.data).length;
        } catch (orderError) {
          console.error("Failed to fetch orders:", orderError);
          // Allow orders to show 0 if fetch fails, avoiding admin-only restriction
        }

        let totalUsers = 0;
        try {
          const usersRes = await authApiClient.get("/users/");
          totalUsers = (usersRes.data.results || usersRes.data).length;
        } catch (error) {
          console.error("Failed to fetch users:", error);
          // Modified: Set userError instead of general error for admin-only restriction
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
        // Modified: General error now only for non-user fetch failures
        setUserError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {/* Modified: Show userError only for relevant stats */}
      {userError && <p className="text-red-500 mb-4">{userError}</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FiPackage}
          title="Total Services"
          value={stats.totalServices}
          loading={loading}
          error={userError}
        />
        {/* Modified: Pass null error to Total Orders to ensure it displays for non-admins */}
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