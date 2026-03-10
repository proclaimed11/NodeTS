import type { ServiceLog } from "../types/index.js";
import { appendService } from "../utils/fileUtils.js";

export class MaintananceService{
    private services:ServiceLog[]=[];

    addService=async(serviceName:string, cost:number):Promise<ServiceLog>=>{
      try {
        if(!serviceName || typeof serviceName !== "string") {throw new Error("Service is required and has to be a string")}
        if(!cost || typeof cost !== "number" || cost < 0) {throw new Error("Cost is required and should be a number greater than 0")}

        const newService:ServiceLog={
            serviceName:serviceName,
            cost:cost,
            date:new Date().toISOString().split("T")[0] ?? " "
        }

        appendService(`${newService.serviceName} || ${newService.cost} || ${newService.date}`);

        this.services.push(newService);

        return newService;

      } catch (error) {
        console.log("Error :", error);
        throw error;
      }
    }
}