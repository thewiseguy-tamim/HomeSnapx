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
    formState: { errors },
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
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto space-y-4"
      encType="multipart/form-data"
    >
      {/* First Name */}
      <div className="form-control">
        <label className="label">First Name</label>
        <input
          type="text"
          disabled={!isEditing}
          placeholder={user?.first_name || "First Name"}
          {...register("first_name", { required: "First name is required" })}
          className="input input-bordered bg-base-200 w-full"
        />
        {errors.first_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.first_name.message}
          </p>
        )}
      </div>

      {/* Last Name */}
      <div className="form-control">
        <label className="label">Last Name</label>
        <input
          type="text"
          disabled={!isEditing}
          placeholder={user?.last_name || "Last Name"}
          {...register("last_name")}
          className="input input-bordered bg-base-200 w-full"
        />
      </div>

      {/* Email (read-only) */}
      <div className="form-control">
        <label className="label">Email</label>
        <input
          type="email"
          disabled
          placeholder={user?.email || "Email"}
          {...register("email")}
          className="input input-bordered bg-base-200 w-full"
        />
      </div>

      {/* Phone Number */}
      <div className="form-control">
        <label className="label">Phone Number</label>
        <input
          type="text"
          disabled={!isEditing}
          placeholder={user?.phone_number || "Phone Number"}
          {...register("phone_number")}
          className="input input-bordered bg-base-200 w-full"
        />
      </div>

      {/* Profile Picture */}
      {isEditing && (
        <div className="form-control">
          <label className="label">Profile Picture</label>
          <input
            type="file"
            {...register("profile_picture")}
            className="input input-bordered bg-base-200 w-full"
          />
        </div>
      )}

      {/* Password Section */}
      <PasswordChangeForm
        register={register}
        errors={errors}
        watch={watch}
        isEditing={isEditing}
      />

      {/* Action Buttons */}
      <ProfileButtons
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isSubmitting={false}
      />
    </form>
  );
};

export default Profile;
