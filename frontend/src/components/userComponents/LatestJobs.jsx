import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";
import useGetAllJobs from "../../hooks/useGetAllJobs";

const LatestJobs = () => {
  const { loading, error } = useGetAllJobs();
  const allJobs = useSelector((state) => state.jobs?.allJobs || []);

  return (
    <div className="max-w-7xl my-20 flex flex-col items-center">
      <h2 className="text-3xl font-bold">
        <span className="text-[#00A36C]">Latest </span>Job Openings
      </h2>

      {/* Show Loading */}
      {loading && <p className="text-center mt-3">Loading jobs...</p>}

      {/* Show Error */}
      {error && <p className="text-center text-red-500 mt-3">Error: {error}</p>}

      {/* Job Cards */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-5">
          {allJobs.length === 0 ? (
            <span>No Job Available</span>
          ) : (
            allJobs
              .slice(0, 6)
              .map((job) =>
                job?._id ? (
                  <JobCard key={job._id} job={job} />
                ) : (
                  <span key={Math.random()}>Invalid Job Data</span>
                )
              )
          )}
        </div>
      )}
    </div>
  );
};

export default LatestJobs;
