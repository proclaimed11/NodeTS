import { Router } from "express";
import type { Request, Response } from "express";
import type { User } from "../types/types.js";
import { setTimeout } from "timers/promises";
import { readNotes } from "../utils/fileUtils.js";

const router = Router();


const users:User[]=[
    {
        id:1,
        name:"Pascal Kibona",
        email:"pascal.kibona@example.com"
    }
];

const fetchVehicleData =async():Promise<string>=>{
await new Promise((resolver)=>setTimeout(1000,resolver));
return "Vehicle data fetched successfully!";
}

router.get("/profile", async (req:Request, res:Response)=>{
    try {
        const user = users[0];

        if(!user){throw new Error("User not found!");}

        const myNotes = await readNotes();

        const vehicleData = await fetchVehicleData();

        res.json({
            user,
            vehicleData,
            myNotes:myNotes || "No notes found!"
        }) 
    } catch (error) {
        throw new Error("Error fetching profile data: "+error);
    }
});

export default router;



