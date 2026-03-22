import express from "express";
import { dbConnTest } from "./db/connection.js";
import { config } from "./config/index.js";
import ServiceRouter from "./routes/mainServicesRoutes.js";

const app = express();
app.use(express.json());
app.use("/",ServiceRouter);

const PORT = config.port;


const initializeServer=()=>{

//Testing connection
dbConnTest();

app.listen(PORT,()=>{
console.log("App running on port 3000")
})
}

initializeServer()
