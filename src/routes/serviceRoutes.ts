import { Router } from "express";
import type { Request, Response } from "express";
import { MaintenanceService } from "../services/maintananceService.js";

const router = Router();

const maintenanceService = new MaintenanceService();

router.post("/add-service", async(req:Request, res:Response)=>{
    try {
        
    } catch (error) {
        
    }
})