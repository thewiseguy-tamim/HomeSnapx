import { Route, Routes } from "react-router";
import About from "../pages/Services/About";
import Home from "../pages/home/Home";
import MainLayout from "../layouts/MainLayout";
import Shop from "../pages/home/Shop";
import Login from "../pages/home/Login";
import Register from "../pages/home/Register";
import Dashboard from "../pages/home/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import ActivateAccount from "../components/Registration/ActivateAccount";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/home/Profile";
import ServiceDetail from "../pages/home/ServiceDetails";
import Cart from "../pages/home/Cart";  // Added Cart import
import Orders from "../pages/home/Order";
import PaymentSuccess from "../pages/home/PaymentSuccess";
import PurchaseForm from "../pages/home/PurchaseForm";


// import AddProduct from "../pages/home/AddProduct";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="shop" element={<Shop />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="activate/:uid/:token" element={<ActivateAccount />} />
        <Route path="shop/:id" element={<ServiceDetail />} />
        <Route path="/purchase/:serviceId" element={<PurchaseForm />} />
      </Route>

      {/* Private Routes */}
      <Route
        path="dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />  {/* Cart route inside dashboard */}
        <Route path="orders" element={<Orders />} />
        <Route path="payment/success" element={<PaymentSuccess />} />
        {/* <Route path="products/add" element={<AddProduct />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
