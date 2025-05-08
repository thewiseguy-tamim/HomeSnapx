import { useEffect, useState } from "react";
import apiClient from "../Services/api-client";


const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) {
      apiClient.defaults.headers.common["Authorization"] = `JWT ${authTokens.access}`;
      fetchUserProfile();
    }
  }, [authTokens]);

  const handleAPIError = (error, defaultMessage = "Something Went Wrong! Try Again") => {
    console.error(error.response?.data || error.message);

    if (error.response && error.response.data) {
      const errorMessage = Object.values(error.response.data).flat().join("\n");
      setErrorMsg(errorMessage);
      return { success: false, message: errorMessage };
    }
    setErrorMsg(defaultMessage);
    return { success: false, message: defaultMessage };
  };

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get("/users/profile/");
      setUser(response.data);
    } catch (error) {
      console.error("Error Fetching user", error);
    }
  };

  // Update User Profile (first name, last name, phone, bio, social media)
  const updateUserProfile = async (data) => {
    setErrorMsg("");
    try {
      if (!authTokens?.access) {
        setErrorMsg("You need to be logged in.");
        return { success: false };
      }
  
      const formData = new FormData();
      formData.append("first_name", data.first_name);
      formData.append("last_name", data.last_name);
      formData.append("address", data.address);
      formData.append("phone_number", data.phone_number);
  
      // Log the profile_picture data to check if it's being correctly passed
      if (data.profile_picture && data.profile_picture[0]) {
        console.log("Appending profile picture:", data.profile_picture[0]);
        formData.append("profile_picture", data.profile_picture[0]);
      } else {
        console.log("No profile picture found in the data.");
      }
  
      // Log the content of FormData to check
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
  
      const response = await apiClient.put("/users/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Profile updated:", response.data);
      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      return handleAPIError(error);
    }
  };
  

  // Change Password
  const changePassword = async (data) => {
    setErrorMsg("");
    try {
      // data = { old_password: "xxx", new_password: "xxx" }
      await apiClient.patch("/users/profile/update/", data);
      return { success: true };
    } catch (error) {
      return handleAPIError(error);
    }
  };

  // Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/users/api/token/", userData);
      setAuthTokens(response.data);
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      apiClient.defaults.headers.common["Authorization"] = `JWT ${response.data.access}`;

      await fetchUserProfile();
      return { success: true };
    } catch (error) {
      if (error.response?.data?.detail) {
        setErrorMsg(error.response.data.detail);
      } else {
        setErrorMsg("Login failed! Try again.");
      }
      return { success: false };
    }
  };

  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/users/register/", userData);
      return {
        success: true,
        message: "Registration successful. Check your email to activate your account.",
      };
    } catch (error) {
      return handleAPIError(error, "Registration Failed! Try Again");
    }
  };

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("cartId");

    delete apiClient.defaults.headers.common["Authorization"];
  };

  return {
    user,
    errorMsg,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    changePassword,
  };
};

export default useAuth;
