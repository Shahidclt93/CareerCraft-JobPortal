import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/userComponents/Navbar";
import Hero from "../components/userComponents/Hero";
import Categories from "../components/userComponents/Categories";
import LatestJobs from "../components/userComponents/LatestJobs";
import Footer from "../components/userComponents/Footer";
import useGetAllJobs from "../hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { loading, error } = useGetAllJobs(); 
  const jobs = useSelector((state) => state.jobs.allJobs);

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
      {loading && <p>Loading jobs...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && <LatestJobs jobs={jobs} />}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
