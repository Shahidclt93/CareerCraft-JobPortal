import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
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
    array: ["0-500k", "500k-1000k", "1000k-5000k", "2000k+"],
  },
];

const FilterMenu = ({setOpenFilterMenu,onFilterChange}) => {
  const [selectedValue, setSelectedValue] = useState({
    
  
      location: "",
      technology: "",
      minSalary: "",
      maxSalary: "",
      minExperience: "",
      maxExperience: ""
    
  });



  useEffect(() => {
    onFilterChange(selectedValue);
  }, [selectedValue]);


 
  const handleChange = (value, filterType) => {
    setSelectedValue((prev)=> {
      const updatedValue = {...prev}
      switch(filterType){
        case "Location":
          updatedValue.location = value
          break;

          case "Technology":
          updatedValue.technology = value
          break;

           case "Salary": {
          const [minSal, maxSal] = value.split("-");
          updatedValue.minSalary = minSal.replace("k", "000");
          updatedValue.maxSalary = maxSal ? maxSal.replace("k", "000") : "";
          updatedValue.minSalary = minSal ? minSal.replace("k+", "000") : "" ;
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

      return updatedValue

    
    });
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
        <div key={index}>
          <h2 className="font-bold text-lg">{data.filterType}</h2>
          <RadioGroup
            value={selectedValue[data.filterType.toLowerCase()]}
            onValueChange={(value) => handleChange(value, data.filterType)}
          >
            {data.array.map((item, indx) => {
              const itemId = `Id${index}-${indx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <label htmlFor={itemId}>{item}</label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterMenu;