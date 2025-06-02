import express from "express";
import { register, login, userlogout, adminlogout, getUserProfile, getAllUsers, updateOwnProfile, updateAnyProfile} from "../controllers/auth.controller.js";
import { isAdminAuthenticated ,isUserAuthenticated } from "../middlewares/protected.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);

router.get("/user/logout",isUserAuthenticated,userlogout);
router.get("/admin/logout",isAdminAuthenticated,adminlogout);

//Fetch own profile 
router.get("/user/me", isUserAuthenticated, getUserProfile );
router.get("/admin/me", isAdminAuthenticated, getUserProfile );

// Update own profile (User or Admin)
router.patch("/user/me", isUserAuthenticated, updateOwnProfile);
router.patch("/admin/me", isAdminAuthenticated, updateOwnProfile);

// Admin updates any user or admin
router.patch("/admin/user/:id", isAdminAuthenticated, updateAnyProfile);

// Admin fetches all users/admins
router.get("/admin/users", isAdminAuthenticated, getAllUsers);


export default router;