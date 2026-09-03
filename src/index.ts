import express from "express";
import { config } from "./config/index.js";
import { dbTestConn } from "./db/conn.js";
import authRouter from "./routes/auth/auth.routes.js";
import refreshRouter from "./routes/auth/refresh.routes.js";
import usersRouter from "./routes/users.routes.js";
import { errorMid } from "./middlewares/error.mid.js";
import { authMid } from "./middlewares/auth.mid.js";

const app = express()

app.use(express.json())

app.use("/auth", authRouter);
app.use("/auth/refresh", refreshRouter )


app.use(authMid)

app.use("/users", usersRouter )

app.use(errorMid);

const PORT = config.port;

const initializeApp =()=>{
    dbTestConn();
    app.listen(PORT, ()=>{
        console.log(`Server running on port : ${PORT}`)
    })
}

initializeApp()