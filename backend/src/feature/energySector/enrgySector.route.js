import express from "express";
import EnergySectorController from "./energySector.controller.js";
import jwtAuth from "../../middleware/jwt.middleware.js";
const energySectorController=new EnergySectorController();

const EnergyRouter=express.Router();
EnergyRouter.get("/",(req,res)=>{energySectorController.getEnergy(req,res)});
EnergyRouter.post("/",jwtAuth,(req,res)=>{energySectorController.addEnergy(req,res)});

export default EnergyRouter