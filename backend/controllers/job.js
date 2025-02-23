import { query } from "express";
import { Job } from "../models/jobModel.js";

// Post new job 
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    res.status(201).json({
      message: "Job posted successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

// Get All Jobs
export const getAllJobs = async (req, res) => {
  try {
    const { location, technology, minSalary, maxSalary, minExperience, maxExperience, searchedKeyword} = req.query;

    // Build the filter object based on query parameters
    const filter = {};

    if (searchedKeyword) {
      filter.$or = [
        { title: { $regex: searchedKeyword, $options: "i" } }, 
        { description: { $regex: searchedKeyword, $options: "i" } },
        { location: { $regex: searchedKeyword, $options: "i" } }, 
        { requirements: { $regex: searchedKeyword, $options: "i" } }, 
        { jobType: { $regex: searchedKeyword, $options: "i" } }, 
      ];
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }; 
    }

    if (technology) {
      filter.$or = [
        { title: { $regex: technology, $options: "i" } },
        { description: { $regex: technology, $options: "i" } }
      ];
    }

    if (minSalary && maxSalary) {
      filter.salary = { $gte: parseInt(minSalary), $lte: parseInt(maxSalary) };
    } else if (minSalary) {
      filter.salary = { $gte: parseInt(minSalary) };
    } else if (maxSalary) {
      filter.salary = { $lte: parseInt(maxSalary) };
    }

    if (minExperience && maxExperience) {
      filter.experienceLevel = { $gte: parseInt(minExperience), $lte: parseInt(maxExperience) };
    } else if (minExperience) {
      filter.experience = { $gte: parseInt(minExperience) };
    } else if (maxExperience) {
      filter.experience = { $lte: parseInt(maxExperience) };
    }
    // Fetch jobs from the database based on the filter
    const jobs = await Job.find(filter);
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Get Job By Id
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};

//Get all Admin jobs 
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
      sort: { createdAt: -1 },
    });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};


// Delete Job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id; //  authenticated user's ID

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }

    // Check if the user is the creator of the job
    if (job.created_by.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await Job.findByIdAndDelete(jobId);

    return res
      .status(200)
      .json({ message: "Job deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};
