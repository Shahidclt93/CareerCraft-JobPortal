import React from "react";
import { IoIosClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setAppliedFilter } from "../../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Pune",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Remote",
    ],
  },
  {
    filterType: "Technology",
    array: [
      "Mern",
      "React",
      "Data Scientist",
      "Fullstack",
      "Node",
      "Python",
      "Java",
      "Frontend",
      "Backend",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-500k", "500k-1000k", "1000k-5000k", "2000k+"],
  },
];

const FilterMenu = ({ setOpenFilterMenu }) => {
  const dispatch = useDispatch();
  const { appliedFilter = {} } = useSelector((store) => store.job);

  const handleChange = (value, filterType) => {
    let updatedValue = { ...appliedFilter };

    switch (filterType) {
      case "Location":
        updatedValue.location = value;
        break;

      case "Technology":
        updatedValue.technology = value;
        break;

      case "Salary": {
        const [minSal, maxSal] = value.split("-");
        updatedValue.minSalary = minSal.replace("k", "000");
        updatedValue.maxSalary = maxSal ? maxSal.replace("k", "000") : "";
        break;
      }

      case "Experience": {
        const [minEx, maxEx] = value.split("-");
        updatedValue.minExperience = minEx;
        updatedValue.maxExperience = maxEx ? maxEx.replace(" years", "") : "";
        break;
      }

      default:
        break;
    }

    dispatch(setAppliedFilter(updatedValue));

    return updatedValue;
  };

  const resetFilters = () => {
    dispatch(
      setAppliedFilter({
        location: "",
        technology: "",
        minSalary: "",
        maxSalary: "",
        minExperience: "",
        maxExperience: "",
      })
    );
  };

  return (
    <div className="w-full bg-white rounded-md border p-3">
      <div className="flex justify-between">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <IoIosClose
          className="md:hidden"
          size={26}
          onClick={() => setOpenFilterMenu(false)}
        />
      </div>
      <hr className="mt-3" />

      {filterData.map((data, index) => (
        <div key={index} className="my-3">
          <label className="font-bold text-lg block mb-1">
            {data.filterType}
          </label>

          <select
            className="w-full p-2 border rounded-md"
            value={
              data.filterType === "Salary"
                ? appliedFilter.minSalary && appliedFilter.maxSalary
                  ? `${parseInt(appliedFilter.minSalary) / 1000}k-${
                      parseInt(appliedFilter.maxSalary) / 1000
                    }k`
                  : ""
                : data.filterType === "Experience"
                ? appliedFilter.minExperience && appliedFilter.maxExperience
                  ? `${appliedFilter.minExperience}-${appliedFilter.maxExperience} years`
                  : ""
                : appliedFilter[data.filterType.toLowerCase()] || ""
            }
            onChange={(e) => handleChange(e.target.value, data.filterType)}
          >
            <option value="">Select {data.filterType}</option>
            {data.array.map((item, indx) => (
              <option key={indx} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button
        onClick={resetFilters}
        className="w-full bg-gray-200 text-gray-700 rounded-md py-2 mt-4 hover:bg-gray-300 transition"
        disabled={Object.values(appliedFilter).every((val) => val === "")}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterMenu;
