import express from "express"
import { config } from "./config/index.js";
import { dbTestConn } from "./db/conn.js";
import serviceRouter from "./routers/services.routers.js";
import userRouter from "./routers/users.routers.js";
import { errorHandler } from "./middlewares/errors.middleware.js";
import { verifyToken } from "./middlewares/auth.middlewares.js";


const app = express();

app.use(express.json());

app.use(errorHandler);

app.use("/", userRouter);
app.use("/", verifyToken, serviceRouter);

const PORT = config.port;

const initializeServer=async()=>{
dbTestConn();
app.listen(PORT,()=>{
console.log(`Server running on port:${PORT}`)
})
}

initializeServer();