import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loginUser } = useAuthContext(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser({ username: data.username, password: data.password }); 
      if (response?.success) {
        if (response?.user?.role === 'admin') {
          navigate("/dashboard");
        } else {
          navigate("/dashboard/client");
        }
      }
    } catch (error) {
      console.log("Login Failed", error);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold">Login</h2>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                className={`input input-bordered w-full ${
                  errors.username ? "input-error" : ""
                }`}
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="label-text-alt text-error">
                  {errors.username.message}
                </span>
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
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}
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
