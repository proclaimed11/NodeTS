import Router from "express";
import { logout, refreshAccessToken } from "../../controllers/auth/refresh.con.js";

const router = Router();

router.post("/refresh-token", refreshAccessToken);

router.post("/logout", logout);

export default router;