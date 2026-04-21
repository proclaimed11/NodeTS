export const validateId=(id:number):number=>{
const parsedId = Number(id)
if(!parsedId || isNaN(parsedId) || parsedId<=0){
throw new Error(`invalid id:${id}`);
}
return parsedId;
}

export const validataCreateService=(data:any)=>{
if(!data.service || typeof data.service !== "string"){
throw new Error("service name is required and has to be a string");
}
if(!data.cost || typeof data.cost !== "number" || data.cost < 0){
throw new Error("service cost is required and has to be a number greater than 0");
}
}

export const validateUpdatesInput=(data:any)=>{
if(!data || Object.keys(data).length === 0){
throw new Error("At least one field should be present for the update")
}

if(data.service !== undefined && (typeof data.service !== "string" || data.service.trim() == "")){
throw new Error("Service must be a non empty string")
}

if(data.cost !== undefined && (typeof data.cost=="number" || data.cost.trim()=="")){
throw new Error("Cost must be a non empty number")
}
}