import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import { IoIosClose } from "react-icons/io";


const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi",
      "Mumbai",
      "Kolhapur",
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
      "frontend",
      "backend",
      "mobile",
      "desktop",
    ],
  },
  {
    filterType: "Experience",
    array: ["0-3 years", "3-5 years", "5-7 years", "7+ years"],
  },
  {
    filterType: "Salary",
    array: ["0-50k", "50k-100k", "100k-200k", "200k+"],
  },
];

const FilterMenu = ({setOpenFilterMenu,onFilterChange}) => {
  const [selectedValue, setSelectedValue] = useState("");


  const handleChange = (value) => {
    setSelectedValue(value);
    const filters = parseFilterValue(value);
    onFilterChange(filters);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue.toLowerCase()));
  }, [selectedValue]);


  const parseFilterValue = (value) => {
    const filters = {
      minSalary: "",
      maxSalary: "",
      minExperience: "",
      maxExperience: "",
    };
    if (value.includes("k")) {
      const [min, max] = value.split("-");
      filters.minSalary = min.replace("k", "000");
      filters.maxSalary = max ? max.replace("k", "000") : "";
    } else if (value.includes("years")) {
      const [min, max] = value.split("-");
      filters.minExperience = min;
      filters.maxExperience = max ? max.replace(" years", "") : "";
    }
    return filters;
  };

  return (
    <div className="w-full bg-white rounded-md border p-3">
      <div className="flex justify-between">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <IoIosClose className="md:hidden" size={26} onClick={()=> setOpenFilterMenu(false)}/>
      </div>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h2 className="font-bold text-lg">{data.filterType}</h2>

            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId}></RadioGroupItem>
                  <label htmlFor={itemId}>{item}</label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterMenu;