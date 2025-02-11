import React from "react";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";


const JobCard = ({job}) => {
  const navigate = useNavigate();
 
  return (
    <div onClick={()=>navigate(`/job/${job._id}`)} className="p-3 sm:p-5 rounded-md shadow-xl bg-white border border-gray-200 cursor-pointer">
      <div>

        <h1 className="text-lg font-medium"> {job.name} </h1>
       
        <p className="text-sm text-gray-600">India</p>
      </div>
      <div>
        <h2 className="font-bold text-lg my-2">{job.title}</h2>
        <p className="text-sm text-gray-600 truncate">
          {
            job.description
          }
        </p>
      </div>
      <div className=" flex gap-2 items-center mt-4 flex-wrap ">
        <Badge className={" text-blue-600 font-bold"} variant={"ghost"}>
          {job.position} Open Positions
        </Badge>
        <Badge className={" text-[#FA4F09] font-bold"} variant={"ghost"}>
          {job.salary}LPA
        </Badge>
        <Badge className={" text-[#00A36C]  font-bold"} variant={"ghost"}>
          {job.location}
        </Badge>
        <Badge className={" text-black font-bold"} variant={"ghost"}>
          {job.jobType}
        </Badge>
      </div>
    </div>
  );
};

export default JobCard;
