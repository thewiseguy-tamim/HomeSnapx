
import { Navigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user === null) return <p className="alert alert-warning alert-soft font-bold flex justify-center">Please Login</p>;
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;