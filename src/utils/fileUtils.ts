import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFilePath =async (filename:string):Promise<string>=>{
return path.join(__dirname,"..","..",filename);
}  

export const readNotes=async():Promise<string>=>{
    try {
       const notesPath = await getFilePath("notes.txt");
       const notes = fs.readFileSync(notesPath, "utf-8");
       return notes
    } catch (error) {
         console.error("Error reading file:", error);
         throw error;
    }
}

export const appendService =async(log:string)=>{
    const servicePath = await getFilePath("service.txt");
    fs.appendFileSync(servicePath,log,"utf-8");
}

