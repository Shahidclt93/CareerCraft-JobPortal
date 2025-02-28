import { setAllJobs } from "../redux/jobSlice";
import { JOB_API_ENDPOINT } from "../utils/apisEndPoints";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { token } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchAllJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("API Response:", res.data);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllJobs();
  }, [dispatch, token]);
  return { loading, error };
};

export default useGetAllJobs;
