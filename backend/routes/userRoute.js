import express from "express";
import {
  googleAuth,
  login,
  profile,
  register,
  updateProfile,
} from "../controllers/user.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);

router.get("/google", googleAuth);

router.route("/me").get(authenticateToken, profile);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);

export default router;
