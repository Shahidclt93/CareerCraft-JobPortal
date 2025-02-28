import React, { useEffect, useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import {
  JOB_API_ENDPOINT,
  APPLICATION_API_ENDPOINT,
} from "../utils/apisEndPoints";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../redux/jobSlice";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const JobDetails = () => {
  const params = useParams();
  const jobId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleJob } = useSelector((store) => store.job);
  const { user, token } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(token)
  const isIntiallyApplied =
    singleJob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const applyJobHandler = async () => {
    if (!user) {
      toast.error("You need to sign in to apply for jobs.");
      return;
    }
    try {
      const res = await axios.post(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
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

    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  if (!singleJob) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-7xl p-5">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="flex items-center gap-2 text-gray-500 font-semibold"
        >
          <ArrowLeft />
          <span>Back</span>
        </Button>
        <div className="sm:flex items-center justify-between mt-10">
          <div>
            <h1 className="font-bold text-xl ">{singleJob?.title}</h1>
            <div className=" flex flex-wrap gap-2 items-center mt-4 ">
              <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>
                {singleJob?.position} Open Positions
              </Badge>
              <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>
                {singleJob?.salary}LPA
              </Badge>
              <Badge className={" text-[#00A36C] font-bold"} variant={"ghost"}>
                {singleJob?.location}
              </Badge>
              <Badge className={" text-black font-bold"} variant={"ghost"}>
                {singleJob?.jobType}
              </Badge>
            </div>
          </div>
          <div>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg mt-2 sm:mt-0 ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#00A36C] hover:bg-[#36b98d]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply"}
            </Button>
          </div>
        </div>
        <h1 className="border-b-2 border-b-gray-400 font-medium py-4">
          {singleJob?.description}
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1 ">
            Positions
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.position}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Location:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {" "}
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Salary:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Experience:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} Year
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Total Applicants:{" "}
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Job Type:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.jobType}
            </span>
          </h1>
          <h1 className="font-bold my-1 ">
            Post Date:
            <span className=" pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
