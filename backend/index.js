import express from "express"
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import bodyParser from "body-parser"
import cors from "cors"
import EnergyRouter from "./src/feature/energySector/enrgySector.route.js";
import AdminRouter from "./src/feature/admin/admin.route.js";

const server= express();

server.use(express.static('public'));
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());


//routes
server.use('/api/energy', EnergyRouter);
server.use('/api/admin',AdminRouter)





server.listen(3200,()=>{
    
    console.log("server is listening on port no 3200");
    connectUsingMongoose();
})