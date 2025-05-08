import { useEffect, useState } from "react";
import apiClient from "../Services/api-client";



const useFetchService = (currentPage, searchQuery, sortOrder) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const url = `/services/?name=${searchQuery}&ordering=${sortOrder}&page=${currentPage}`;
      
      try {
        const response = await apiClient.get(url);
        const data = await response.data;

        if (data.results) {
          setServices(data.results);
          setTotalPages(Math.ceil(data.count / data.results.length) || 1);
        } else {
          console.error("Unexpected response structure", data);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchServices();
  }, [currentPage, searchQuery, sortOrder]);

  return { services, loading, totalPages };
};

export default useFetchService;
