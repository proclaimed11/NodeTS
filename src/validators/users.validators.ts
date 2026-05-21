export const validateRegData=(data:any)=>{
if(!data.firstName || data.midName || data.lastName || data.email || data.phoneNumber || data.password){
throw new Error("missing fields");
}

if(![data.firstName || data.midName || data.lastName || data.email || data.phoneNumber].every((field)=> typeof field == "string")){
throw new Error("fields should be a strings");
}
}

export const validateLoginInputs=(data:any)=>{
if(!data.email || !data.password){
throw new Error("missing fields")
}
if(![data.email || data.password].every((field)=> typeof field == "string")){
throw new Error("All inputs should be strings")
}
}