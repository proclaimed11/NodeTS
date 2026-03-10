export interface User{
    id:number,
    firstName:string,
    midName:string,
    lastName:string,
    role:string,
    email:string,
    createdAt:string,
    updatedAt:string
}


export interface ServiceLog{
    serviceName:string,
    cost:number,
    date:string
}