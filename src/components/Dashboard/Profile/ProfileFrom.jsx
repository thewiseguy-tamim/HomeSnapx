import { useForm } from "react-hook-form";
import useAuthContext from "../../../hooks/useAuthContext";

const ProfileForm = ({ isEditing }) => {
  const { user, updateUserProfile } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Submitting form data:", data);
    const response = await updateUserProfile(data);
    if (response.success) {
      alert("Profile updated successfully!");
    } else {
      alert(response.message || "Failed to update profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="form-control">
        <label className="label">First Name</label>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full"
          disabled={!isEditing}
          {...register("first_name", { required: "First name is required" })}
        />
        {errors.first_name && (
          <p className="text-red-500">{errors.first_name.message}</p>
        )}
      </div>

      <div className="form-control">
        <label className="label">Last Name</label>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full"
          disabled={!isEditing}
          {...register("last_name")}
        />
      </div>

      <div className="form-control">
        <label className="label">Email Address</label>
        <input
          type="email"
          className="input input-bordered bg-base-200 w-full"
          disabled
          {...register("email")}
        />
      </div>

      <div className="form-control">
        <label className="label">Phone Number</label>
        <input
          type="text"
          className="input input-bordered bg-base-200 w-full"
          disabled={!isEditing}
          {...register("phone_number")}
        />
      </div>

      {isEditing && (
        <>
          <div className="form-control">
            <label className="label">Profile Picture</label>
            <input
              type="file"
              {...register("profile_picture")}
              className="input input-bordered bg-base-200 w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full mt-4">
            Save Changes
          </button>
        </>
      )}
    </form>
  );
};

export default ProfileForm;
