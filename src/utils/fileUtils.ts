import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getFilePath = async(filename:string) =>{
 return path.join(__dirname,'..',filename);
}

export const readNotes =async():Promise<string>=>{
    try{
        const filePath = await getFilePath('myNotes.txt');
        const notes = await fs.readFileSync(filePath,'utf-8');
        return notes;
    }catch(err){
        console.error('Error reading notes:', err);
        throw err;
    }
}

export const appenddata = async(data:string):Promise<void>=>{
    const filePath = await getFilePath('services.txt');
    await fs.appendFileSync(filePath , data+'\n');
}

