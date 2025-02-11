import express from "express";

import authenticateToken from "../middleware/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
  searchJobs,
  deleteJob
} from "../controllers/job.js";

const router = express.Router();

router.route("/post").post(authenticateToken, postJob);
router.route("/get").get( getAllJobs);
router.route("/getadminjobs").get(authenticateToken, getAdminJobs);
router.route("/get/:id").get( getJobById);
router.route("/search/:keyword?").get(searchJobs);
router.route("/delete/:id").delete(authenticateToken,deleteJob);
export default router;
