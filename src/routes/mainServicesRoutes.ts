import { Router } from "express";
import type { Response,Request} from "express";
import { MaintananceService } from "../services/maintServices.js";

const router = Router();

const servEng = new MaintananceService();

router.post("/new-service",async(req:Request, res:Response)=>{
    try {
        const {serviceName,serviceCost}:{serviceName:string, serviceCost:number} = req.body;

        const addRecord = await servEng.addService(serviceName,serviceCost);

        res.status(201).json({
            message:"service added successfully!",
            addRecord
        })
    } catch (error) {
    res.status(404).json({error:error})
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
    res.status(404).json({error:error})
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
    res.status(404).json({error:error});
    }
})

router.put("/service/:id",async(req:Request, res:Response)=>{
try {
    const id = Number(req.params.id);

    const updates = req.body;

    const serviceUpdated = await servEng.updateService(id, updates);
-
    res.json({
        message: `record with id:${id} updated successfully!`,
        serviceUpdated
    })
} catch (error) {
    res.status(404).json({error:error})
}
})

export default router;