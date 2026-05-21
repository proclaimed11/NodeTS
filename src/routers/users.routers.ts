import { Router } from "express";
import { login, regUser } from "../controllers/users.contollers.js";

const router = Router();

router.post("/register-user", regUser);

router.post("/login", login);

export default router;