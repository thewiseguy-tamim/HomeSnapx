import axios from "axios";

export default axios.create({
    baseURL: "https://household-service.vercel.app",
});