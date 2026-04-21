import express from "express"
import { config } from "./config/index.js";
import { dbTestConn } from "./db/conn.js";
import serviceRouter from "./routers/services.routers.js";
import { errorHandler } from "./middlewares/errors.middleware.js";

const app = express();

app.use(express.json());

app.use(errorHandler);

app.use("/", serviceRouter);

const PORT = config.port;

const initializeServer=async()=>{
dbTestConn();
app.listen(PORT,()=>{
console.log(`Server running on port:${PORT}`)
})
}

initializeServer();