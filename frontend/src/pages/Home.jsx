import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/userComponents/Navbar";
import Hero from "../components/userComponents/Hero";
import Categories from "../components/userComponents/Categories";
import LatestJobs from "../components/userComponents/LatestJobs";
import Footer from "../components/userComponents/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-3">
        <Hero />
        <Categories />
        <LatestJobs />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
