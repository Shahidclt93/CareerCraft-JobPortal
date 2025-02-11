import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice";

const Category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Mern Developer",
  "Data Scientist",
  "DevOps",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Product Manager",
  "UX/UI Designer",
  "Graphics Designer",
  "Video Editor",
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/jobs");
  };
  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Categories
        </h1>
        <p className="text-center text-gray-600">
        Navigate Our Extensive Job Market
        </p>
      </div>

      <Carousel className="w-8/12 sm:w-9/12 my-10 mx-auto">
        <CarouselContent className="">
          {Category.map((category, index) => {
            return (
              <CarouselItem key={index} className="basis-1/1">
                <Button
                  className="sm:text-sm text-xs "
                  onClick={() => searchjobHandler(category)}
                >
                  {category}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
