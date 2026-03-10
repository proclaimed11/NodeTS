import type { Response, Request } from "express";
import { Router } from "express";
import { MaintananceService } from "../services/maintananceServices.js";


const router = Router();
const engine = new MaintananceService();

router.post("/add-service", async(req:Request, res:Response)=>{
  try {
    const {service, cost}:{service:string, cost:number} = req.body;
   
     const newServiceRecord = await engine.addService(service,cost);

    res.status(201).json({
        message:"Service added successfuly!",
        service:newServiceRecord,
    })

  } catch (error) {
    res.status(400).json({error:`error loading service ${error}`})
  }
})

export default router;