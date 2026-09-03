import Router from "express";
import { loginByEmail, regUserAcc } from "../../controllers/auth/auth.con.js";

const router = Router();

router.post("/register-account", regUserAcc);

router.post("/login", loginByEmail);

export default router;