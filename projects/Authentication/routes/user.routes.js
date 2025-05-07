import express from "express";
import { register, verify, login, getProfile } from "../controllers/user.controller.js";
import isLoggedIn from "../middleware/isLoggedIn.js";


const router = express.Router();

router.post('/register', register);
router.get("/verify/:token", verify);
router.post("/login", login);
router.get("/get-profile", isLoggedIn, getProfile);
// router.post("/logout", isLoggedIn, logout);

export default router;