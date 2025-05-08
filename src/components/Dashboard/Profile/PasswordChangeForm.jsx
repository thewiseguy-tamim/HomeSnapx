import { useState } from "react";


const PasswordChangeForm = ({ register, errors, watch, isEditing }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-link text-primary font-semibold p-0 h-auto min-h-0"
      >
        Change Password
      </button>

      {isOpen && (
        <div className="space-y-3 pl-2 mt-2 border-l-2 border-base-300">
          <div className="form-control">
            <label className="label">Current Password</label>
            <input
              type={showPassword ? "text" : "password"}
              disabled={!isEditing}
              {...register("current_password")}
              className="input input-bordered bg-base-200 w-full"
            />
          </div>

          <div className="form-control">
            <label className="label">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              disabled={!isEditing}
              {...register("new_password", {
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="input input-bordered bg-base-200 w-full"
            />
            {errors.new_password && (
              <p className="text-red-500">{errors.new_password.message}</p>
            )}
          </div>

          <div className="form-control">
            <label className="label">Confirm New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              disabled={!isEditing}
              {...register("confirm_new_password", {
                validate: (value) =>
                  value === watch("new_password") || "Passwords do not match",
              })}
              className="input input-bordered bg-base-200 w-full"
            />
            {errors.confirm_new_password && (
              <p className="text-red-500">
                {errors.confirm_new_password.message}
              </p>
            )}
          </div>

          {isEditing && (
            <label className="label cursor-pointer">
              <span className="label-text">Show Password</span>
              <input
                type="checkbox"
                className="toggle"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordChangeForm;
