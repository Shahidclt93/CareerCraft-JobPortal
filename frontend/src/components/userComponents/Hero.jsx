import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { PiBuildingOfficeBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };

  return (
    <div>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <span className="px-4 mx-auto flex justify-center items-center py-2 gap-2 rounded-full bg-gray-200 text-red-600 font-medium">
            <span className="text-[#614232]">
              <PiBuildingOfficeBold />
            </span>
            Top Leading Job Hunting Platform
          </span>

          <h2 className="text-5xl font-bold">
            Find, Apply & <br />
            Achieve Your <span className="text-[#00A36C]">Job Today</span>
          </h2>
          <p>
            Begin Your Search for Life-Changing Career Opportunities in Your{" "}
            <br />
            Chosen Field and Get Hired Fast
          </p>
          <div className="flex md:w-1/2  w-full shadow-lg border border-gray-300 pl-5 h-12 overflow-hidden rounded-full items-center gap-4 mx-auto ">
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
      </div>
    </div>
  );
};

export default Hero;
