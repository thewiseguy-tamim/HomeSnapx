import { Route, Routes } from "react-router";
import About from "../pages/Services/About";
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
import Cart from "../pages/home/Cart";  
import Orders from "../pages/home/Order";
import PaymentSuccess from "../pages/home/PaymentSuccess";
import PurchaseForm from "../pages/home/PurchaseForm";
import Home from "../pages/home/home.jsx";
import Contact from "../pages/home/Contact";
import UserReviews from "../components/Review/userReview";
import ClientDashboard from "../pages/home/ClientDashboard";
import AddService from "../components/Add Service/addService";
import EditService from "../components/Add Service/EditService";
import ServiceList from "../components/Add Service/ServiceList"; // Add this import
import User from "../components/User";

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
        <Route path="/contact" element={<Contact />} />
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
        <Route path="client" element={<ClientDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<Cart />} />  
        <Route path="orders" element={<Orders />} />
        <Route path="reviews" element={<UserReviews />} /> 
        <Route path="addService" element={<AddService />} /> 
        <Route path="services" element={<ServiceList />} />
        <Route path="users" element={<User/>} />
        <Route path="EditService/:id" element={<EditService />} /> 
        <Route path="payment/success" element={<PaymentSuccess />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;