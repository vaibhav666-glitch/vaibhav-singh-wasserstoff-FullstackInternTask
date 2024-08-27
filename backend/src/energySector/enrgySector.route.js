import express from "express";
import EnergySectorController from "./energySector.controller.js";

const energySectorController=new EnergySectorController();

const EnergyRouter=express.Router();
EnergyRouter.get("/",(req,res)=>{energySectorController.getEnergy(req,res)});
EnergyRouter.post("/",(req,res)=>{energySectorController.addEnergy(req,res)});

export default EnergyRouter