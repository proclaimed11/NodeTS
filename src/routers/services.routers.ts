import type { Request,Response } from "express";
import { Router } from "express";
import { createService, deleteServices, getAllServices, getServiceId, updatedService } from "../controllers/services.controllers.js";

const router = Router();

router.get("/services", getAllServices);

router.get("/services/:id", getServiceId);

router.post("/new-service", createService);

router.put("/services/:id", updatedService);

router.delete("/services/:id", deleteServices);

export default router;