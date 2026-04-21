import { query } from "../db/conn.js";
import type { ServiceRecord } from "../types/services.types.js"

export class Services{
    addService=async(service:string, cost:number):Promise<ServiceRecord>=>{
    try {
      if(!service || typeof service !== "string"){
        throw new Error("Service is required and MUST be a string");
      }
      
      if(!cost || typeof cost !== "number" || cost < 0 ){
         throw new Error("Cost is required and has to be a number greater than 0")
      }

      const newService:ServiceRecord={
        service,
        cost,
        date:new Date().toISOString().split("T")[0] ?? ""
      }

      const insertService =await query<ServiceRecord>(`INSERT INTO service_records (service_name, service_cost, record_date)
        VALUES ($1, $2, $3)
        RETURNING *
        `,[newService.service, newService.cost, newService.date]);

        const record = insertService[0];

        if(!record){
       throw new Error("Error inserting record");
        }

        return record;
    } catch (error) {
       throw new Error("Error adding service");
       throw error;
    }
    }

    getServices=async():Promise<ServiceRecord[]>=>{
    try {
      const getAll = await query<ServiceRecord>(`SELECT * FROM service_records`);
       
      if(getAll.length == 0){
       throw new Error("No services available")
      }

      return getAll;
      
    } catch (error) {
       throw new Error("Error fetching services");
       throw error; 
    }
    }

    getServiceId=async(id:number):Promise<ServiceRecord>=>{
    try {
      if(!id || isNaN(id)){
        throw new Error(`invalid id ${id}`)
      }

      const serviceWithId = await query<ServiceRecord>(`SELECT * FROM service_records WHERE id=$1`,[id]);

      const recordId = serviceWithId[0]

      if(!recordId){
       throw new Error(`No record with id ${id}`)
      }

      return recordId;
    } catch (error) {
      throw new Error("Error fetching service");
      throw error;
    }
    }

    updateService=async(id:number, updates:ServiceRecord):Promise<Partial<ServiceRecord>>=>{
    try {
    if(!id || isNaN(id)){
      throw new Error(`invalid id ${id}`);
    }

    const fields:string[]=[]
    const values:any[]=[];
    let paramIndex = 1;

    if(updates.service !== undefined){
      fields.push(`service_name = $${paramIndex}`);
      values.push(updates.service)
      paramIndex++;
    }

    if(updates.cost !== undefined){
      fields.push(`service_cost = $${paramIndex}`);
      values.push(updates.cost)
      paramIndex++;
    }

    if(updates.date !== undefined){
      fields.push(`record_date = $${paramIndex}`);
      values.push(updates.date)
      paramIndex++;
    }

    if(fields.length == 0){
     throw new Error("No fields to update")
    }

    values.push(id);

    const updatedRecord = await query<ServiceRecord>(`
      UPDATE service_records
      SET ${fields.join(", ")}
      WHERE id=$${paramIndex}
      RETURNING *
      `,values);

    const recordUpdate = updatedRecord[0];

    if(!recordUpdate){
    throw new Error("No record updated")
    }

    return recordUpdate
    } catch (error) {
    throw error;
    }
    }

    deleteService=async(id:number):Promise<{id:number, message:string}>=>{
    try {

      if(!id || isNaN(id)){
      throw new Error(`Invalid id: ${id}`)
      }

      const deleted = await query<{id:number}>(`DELETE FROM service_records WHERE id=$1 RETURNING id`,[id]);

      const deletedId = deleted[0]?.id;

      if(!deletedId){
      throw new Error("id not found")
      }

      return {id:deletedId, message:`service record with id:${id} has been deleted successfully!`}
    } catch (error) {
      throw error;
    }
    }
}