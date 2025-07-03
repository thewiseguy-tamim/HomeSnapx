import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { loginUser, user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Effect to handle redirection after user context updates
  useEffect(() => {
    if (user && !loading) {
      // Redirect based on user role from context
      navigate(user.role === 'ADMIN' ? '/dashboard' : '/dashboard/client');
    }
  }, [user, loading, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginUser({ username: data.username, password: data.password });
      console.log('Login response:', response);
      if (response?.success) {
        // Rely on useEffect to handle redirection after context updates
        // No immediate navigation here
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
  };

  // Functions to auto-fill form fields
  const handleAdminLogin = () => {
    setValue("username", "admin1");
    setValue("password", "1234");
  };

  const handleClientLogin = () => {
    setValue("username", "tamim");
    setValue("password", "Tamim@@1900");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Login</h2>
          <p className="text-base-content/70 mt-2">This is a test website the credentials are given</p>
          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}
          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className={`input input-bordered w-full ${errors.username ? "input-error" : ""}`}
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="label-text-alt text-error">{errors.username.message}</span>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="label-text-alt text-error">{errors.password.message}</span>
              )}
            </div>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                className="btn btn-primary w-1/2"
                onClick={handleAdminLogin}
              >
                Admin
              </button>
              <button
                type="button"
                className="btn btn-primary w-1/2"
                onClick={handleClientLogin}
              >
                Client
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Don't have an account?{" "}
              <Link to="/register" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;