import express from "express"
import ProfileRouter from "./routes/profileRoute.js"
import ServiceRouter from "./routes/serviceRoute.js"


const app = express();
app.use(express.json());

app.use("/", ProfileRouter);
app.use("/", ServiceRouter);

app.get("/", (req,res)=>{
res.send(`
    <h1>This is a Node + Typesript practice 💵</h1>
    <p><strong><a href="/user-profile">GET</a></strong>: This is the user profile</p>
    `)
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log(`listening on Port: ${PORT}`)  
})