import React, { useEffect, useState } from "react";
import Navbar from "../components/userComponents/Navbar";
import FilterMenu from "../components/userComponents/FilterMenu";
import JobCard2 from "../components/userComponents/JobCard2";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { JOB_API_ENDPOINT } from "../utils/data";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";
import { setSearchedQuery } from "../redux/jobSlice";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const Jobs = () => {
  const dispatch = useDispatch();

  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(null);


  useEffect(() => {

    const fetchSearchedJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_ENDPOINT}/get/`,

          {
           params:{...filters, searchedKeyword:searchedQuery},
            withCredentials: true,
          }
        );
        console.log(res)
        setFilterJobs(res.data.jobs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSearchedJobs();
  }, [allJobs, searchedQuery, filters]);

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
  };
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <div>
      <Navbar />
      <div className="px-3">
        <div className="flex justify-center w-full">
          <div className="flex md:w-1/2 w-full shadow-lg border border-gray-300 pl-5 h-12 overflow-hidden rounded-full items-center">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find Your Dream Job"
              className="outline-none border-none w-full h-full"
            />
            <Button
              onClick={searchjobHandler}
              className=" rounded-r-full h-full px-5"
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-5">
          <HiOutlineAdjustmentsHorizontal
            className="cursor-pointer md:hidden"
            size={32}
            onClick={() => setOpenFilterMenu((prev) => !prev)}
          />
          <div className="flex gap-5 py-3">
            <div
              className={`w-1/2 md:w-1/5 lg:w-1/5 md:static fixed md:h-full h-screen pb-48 md:overflow-y-hidden overflow-y-auto z-50 ${
                !openFilterMenu && "md:block hidden"
              }`}
            >
              <FilterMenu
                setOpenFilterMenu={setOpenFilterMenu}
                onFilterChange={handleFilterChange}
                s
              />
            </div>

            {filterJobs?.length <= 0 ? (
              <div className="w-full flex justify-center mt-8">
                <span className="text-gray-500">Job not found</span>
              </div>
            ) : (
              <div className="flex-1 mb-5">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {filterJobs?.map((job) => (
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.4 }}
                      key={job._id}
                    >
                      <JobCard2 job={job} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
