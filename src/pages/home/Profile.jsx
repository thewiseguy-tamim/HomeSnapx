import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordChangeForm from "../../components/Dashboard/Profile/PasswordChangeForm";
import ProfileButtons from "../../components/Dashboard/Profile/ProfileButtons";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user, updateUserProfile, changePassword } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        profile_picture: data.profile_picture,
      };

      const profileRes = await updateUserProfile(profilePayload);

      let passwordRes = { success: true };
      if (data.current_password && data.new_password) {
        passwordRes = await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
      }

      if (profileRes.success && passwordRes.success) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Update failed.");
      }
    } catch (error) {
      alert("An error occurred while updating the profile.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="h-20 w-20 rounded-full bg-white/30 flex items-center justify-center text-3xl font-bold shadow-lg">
              {user?.first_name?.[0] || ""}{user?.last_name?.[0] || ""}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{`${user?.first_name || ""} ${user?.last_name || ""}`}</h1>
              <p className="opacity-80">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="form-control">
              <label className="text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                disabled={!isEditing}
                placeholder={user?.first_name || "First Name"}
                {...register("first_name", { required: "First name is required" })}
                className="input border border-gray-300 rounded-lg px-4 py-2 bg-white w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="form-control">
              <label className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                disabled={!isEditing}
                placeholder={user?.last_name || "Last Name"}
                {...register("last_name")}
                className="input border border-gray-300 rounded-lg px-4 py-2 bg-white w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Email (read-only) */}
          <div className="form-control">
            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              disabled
              placeholder={user?.email || "Email"}
              {...register("email")}
              className="input border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 w-full"
            />
          </div>

          {/* Phone Number */}
          <div className="form-control">
            <label className="text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              disabled={!isEditing}
              placeholder={user?.phone_number || "Phone Number"}
              {...register("phone_number")}
              className="input border border-gray-300 rounded-lg px-4 py-2 bg-white w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          {/* Profile Picture */}
          {isEditing && (
            <div className="form-control">
              <label className="text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <input
                  type="file"
                  {...register("profile_picture")}
                  className="ml-5 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Password Section */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <PasswordChangeForm
              register={register}
              errors={errors}
              watch={watch}
              isEditing={isEditing}
            />
          </div>

          {/* Action Buttons */}
          <ProfileButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;