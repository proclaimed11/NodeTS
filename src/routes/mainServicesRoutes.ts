import { Router } from "express";
import type { Response,Request} from "express";
import { MaintananceService } from "../services/maintServices.js";

const router = Router();

const servEng = new MaintananceService();

router.post("/new-service",async(req:Request, res:Response)=>{
    try {
        const {service,cost}:{service:string, cost:number} = req.body;

        const addRecord = await servEng.addService(service,cost);

        res.status(201).json({
            message:"service added successfully!",
            addRecord
        })
    } catch (error) {
    res.json({error:error})
    }
})


router.get("/services",async(req:Request, res:Response)=>{
    try {
        const allServices = await servEng.getAllServices();

        res.json({
            message:"services loaded successfully!",
            allServices
        })
    } catch (error) {
    res.json({error:error})
    }
})

router.get("/services/:id",async(req:Request, res:Response)=>{
    try {
        const id = Number(req.params.id);

        const serviceWithId = await servEng.getServicesWithId(id);

        res.json({
            message:`service with id:${id} is loaded successfully`,
            serviceWithId
        })
    } catch (error) {
    res.json({error:error})
    }
})

export default router;