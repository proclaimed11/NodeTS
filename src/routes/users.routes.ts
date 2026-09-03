import Router from "express";
import { fetchAllUsers, fetchUserProfile, updateUserProfile } from "../controllers/users.con.js";

const router = Router();

router.get("/:id", fetchUserProfile);

router.put("/:id", updateUserProfile)

router.get("/", fetchAllUsers);

export default router;