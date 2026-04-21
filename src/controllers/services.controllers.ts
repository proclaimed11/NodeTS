import type { Response,Request } from "express";
import { Services } from "../services/services.services.js";
import { validataCreateService, validateId, validateUpdatesInput } from "../validators/services.validators.js";

const engine = new Services();

export const getAllServices=async(req:Request, res:Response)=>{
    const allServices = await engine.getServices();

    res.status(200).json({
        message:"Services fetched successfully",
        data:allServices
    });

}

export const getServiceId=async(req:Request, res:Response)=>{
    const id = Number(req.params.id);

    validateId(id);

    const fetchServiceId = await engine.getServiceId(id);

    res.status(200).json({
    message:"service fetched successfully",
    data:fetchServiceId
    })
}

export const createService=async(req:Request, res:Response)=>{
    const {service, cost}:{service:string, cost:number}=req.body;

    validataCreateService({service, cost});

    const newService = await engine.addService(service, cost);

    res.status(201).json({
    message:"service created successfully",
    data:newService
    })

}

export const updatedService=async(req:Request, res:Response)=>{
const id =Number(req.params.id);

validateId(id)

const updates = req.body;

validateUpdatesInput(updates)

const serviceUpdate = await engine.updateService(id, updates);

res.status(200).json({
    message:"Service updated successfully!",
    data:serviceUpdate
})
}


export const deleteServices=async(req:Request, res:Response)=>{
const id =Number(req.params.id);

validateId(id);

const serviceDelete = await engine.deleteService(id);

res.status(200).json({
    message:serviceDelete.message,
    data:serviceDelete.id
})
}