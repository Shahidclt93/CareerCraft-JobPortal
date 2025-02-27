import express from "express";
import {
  login,
  logout,
  profile,
  register,
  updateProfile,
} from "../controllers/user.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";
import passport from "passport";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// **Google OAuth Callback Route**
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const { user, token } = req.user;

    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.redirect(`https://careercraft-frontend.onrender.com`);
  }
);

router.route("/me").get(authenticateToken, profile);
router.route("/logout").post(logout);
router
  .route("/profile/update")
  .post(authenticateToken, singleUpload, updateProfile);

export default router;
