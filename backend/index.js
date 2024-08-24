import express from "express"
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

const server= express();





const userRouter=express.Router();
userRouter.get("/users",(req,res)=>{
    res.send("hello worldsss")
})

server.use(userRouter)

server.listen(3200,()=>{
    
    console.log("server is listening on port no 3200");
    connectUsingMongoose();
})