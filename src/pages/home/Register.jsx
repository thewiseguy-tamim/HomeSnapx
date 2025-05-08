import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // ✅ Fixed import here
import { useState } from "react";

import ErrorAlert from "../../components/ErrorAlert";
import useAuthContext from "../../hooks/useAuthContext";


const Register = () => {
  const { registerUser, errorMsg } = useAuthContext();
  const [successMsg, setSuccessMsg] = useState("");
  const [formError, setFormError] = useState(""); 
  const navigate = useNavigate(); 

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      if (response.success) {
        setSuccessMsg(response.message);
        setTimeout(() => navigate("/login"), 500); 
        setFormError(""); 
      }
    } catch (error) {
      console.log("Registration failed", error);
  
      if (error.response?.data) {
        const backendErrors = error.response.data;
  
        // Check if any field has uniqueness error
        const errorMessages = Object.values(backendErrors).flat();
        if (errorMessages.length > 0) {
          setFormError(errorMessages.join("\n")); // Show all error messages
        } else {
          setFormError("An error occurred. Please try again.");
        }
      } else {
        setFormError("An error occurred. Please try again.");
      }
    }
  };
  
  

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          {/* Error or Success messages */}
          {errorMsg && <ErrorAlert error={errorMsg} />}
          {successMsg && (
            <div role="alert" className="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Error */}
          {formError && (
            <div role="alert" className="alert alert-error">
              <span>{formError}</span>
            </div>
          )}

          {/* Title */}
          <h2 className="card-title text-2xl font-bold">Sign Up</h2>
          <p className="text-base-content/70">
            Create an account to get started
          </p>

          {/* Form Start */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Username */}
            <div className="form-control">
              <label className="label" htmlFor="username">
                <span className="label-text">Username</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="your_username"
                className="input input-bordered w-full"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="label-text-alt text-error">
                  {errors.username.message}
                </span>
              )}
            </div>

            {/* First Name */}
            <div className="form-control">
              <label className="label" htmlFor="first_name">
                <span className="label-text">First Name</span>
              </label>
              <input
                id="first_name"
                type="text"
                placeholder="John"
                className="input input-bordered w-full"
                {...register("first_name", { required: "First name is required" })}
              />
              {errors.first_name && (
                <span className="label-text-alt text-error">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label className="label" htmlFor="last_name">
                <span className="label-text">Last Name</span>
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Doe"
                className="input input-bordered w-full"
                {...register("last_name", { required: "Last name is required" })}
              />
              {errors.last_name && (
                <span className="label-text-alt text-error">
                  {errors.last_name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-control">
              <label className="label" htmlFor="phone_number">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                id="phone_number"
                type="text"
                placeholder="+198073779734597"
                className="input input-bordered w-full"
                {...register("phone_number", { required: "Phone number is required" })}
              />
              {errors.phone_number && (
                <span className="label-text-alt text-error">
                  {errors.phone_number.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              {errors.password && (
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-control">
              <label className="label" htmlFor="password2">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                id="password2"
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                {...register("password2", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.password2 && (
                <span className="label-text-alt text-error">
                  {errors.password2.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          {/* Link to login */}
          <div className="text-center mt-4">
            <p className="text-base-content/70">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
