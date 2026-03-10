import type { Response, Request } from "express";
import { Router } from "express";
import type { User } from "../types/index.js";
import { readNotes } from "../utils/fileUtils.js";

const router = Router();

const users:User[]=[{
    id:1,
    firstName:"Pascal",
    midName:"Robert",
    lastName:"Kibona",
    role:"admin",
    email:"pascalkibona@gmail.com",
    createdAt:new Date().toISOString().split("T")[0] ?? "",
    updatedAt:new Date().toISOString().split("T")[0] ?? ""
}]

const vehicleData =async():Promise<string>=>{
await new Promise((resolver)=>setTimeout(resolver,1000));
return "Toyota 4 door subaru"
}


router.get("/user-profile", async(req:Request, res:Response)=>{
  try {

    const user = users[0];

    if(!user){
        res.json({error:"No user available"});
        return;
    }
    
    const vehicle = await vehicleData();

    const notes = await readNotes();

    res.status(201).json({
        message:"User loaded successfully!",
        user:user,
        vehicle:vehicle,
        myNotes:notes
    })

  } catch (error) {
    res.status(400).json({error:`error loading user ${error}`})
  }
})

export default router;