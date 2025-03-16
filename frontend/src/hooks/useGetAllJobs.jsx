import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "../redux/jobSlice";
import axios from "axios";
import { JOB_API_ENDPOINT } from "../utils/apisEndPoints";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const { token } = useSelector((store) => store.auth);
  const { searchedQuery, appliedFilter } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/`, {
          params: { ...appliedFilter, searchedKeyword: searchedQuery },
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
          setFilteredJobs(res.data.jobs);
        } else {
          setError("Failed to fetch jobs.");
          setFilteredJobs([]);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(error.message || "An error occurred.");
        setFilteredJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchedQuery, appliedFilter, dispatch, token]);

  return { loading, error, filteredJobs };
};

export default useGetAllJobs;
