import { query } from "../db/connection.js";
import type { ServiceRecord } from "../types/index.js";

export class MaintananceService {
    private serviceLog:ServiceRecord[]=[];

    addService=async(serviceName:string, serviceCost:number):Promise<ServiceRecord>=>{
     try {
        if(!serviceName || typeof serviceName !== "string"){throw new Error("Service is required and has to be a string")}
        if(!serviceCost || typeof serviceCost !== "number" || serviceCost < 0){throw new Error("Cost is required and has to be a value greater than 0")}

        const newRecord:ServiceRecord={
            serviceName,
            serviceCost,
            serviceDate:new Date().toISOString().split("T")[0] ?? ""
        }

        this.serviceLog.push(newRecord);

        const insertedRecord = await query<ServiceRecord>(`INSERT INTO service_records(service_name,service_cost,record_date)
            VALUES($1, $2, $3)
            RETURNING *
            `,[newRecord.serviceName, newRecord.serviceCost, newRecord.serviceDate]);

        const record = insertedRecord[0]

         if(!record){throw new Error("No record was added")}

        return record;
     } catch (error) {
        console.error("Error creating or adding service", error)
        throw error;
     }
    }

    getAllServices=async():Promise<ServiceRecord[]>=>{
     try {
        const allServices = await query<ServiceRecord>(`SELECT * FROM service_records`);

        if(allServices.length == 0){throw new Error("No records available")}

         return allServices;
     } catch (error) {
        console.error("Error fecthing records")
         throw error;
     }
    }

    getServicesWithId=async(id:number):Promise<ServiceRecord>=>{
     try {
        if(!id || isNaN(id) ||id <= 0){throw new Error(`invalid or unavailabe id:${id}`)}

        const fetchSerivceId = await query<ServiceRecord>(`SELECT * FROM service_records WHERE id = $1`,[id]);

        const record = fetchSerivceId[0];

        if(!record){throw new Error (`Service with id:${id} is not available`)}

         return record;
     } catch (error) {
        console.error("Error fecthing records")
         throw error;
     }
    }
}