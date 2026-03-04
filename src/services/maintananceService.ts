import type { Service } from "../types/types.js";
import { appenddata } from "../utils/fileUtils.js";

export class MaintenanceService {
    private services: Service[]=[];

    addService=(service:string, cost:number)=>{
      try {
        if(!service || typeof service !=="string"){throw new Error("service is required and MUST be a string!")}
        if(typeof cost !=="number" || cost < 0 || !cost){throw new Error("cost is required and MUST be a number greater than 0!")}

        const newService:Service={
            service,
            cost,
            date:new Date().toISOString().split('T')[0] ?? ""
        }

        this.services.push(newService);

        appenddata(`Service: ${newService.service} | Cost: ${newService.cost} | Date: ${newService.date}`);

      } catch (error) {
        throw error;
      }
    }

    getServices =():Service[]=>{
        return this.services;
    }

    getServicesNumber = ():number=>{
        return this.services.length;
    }
}
