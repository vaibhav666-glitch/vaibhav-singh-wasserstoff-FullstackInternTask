import EnergySectorModel from "./energySector.model.js";

export default class EnergySectorController{
    constructor(){
        this.energySectorModel=new EnergySectorModel();
    }

    async addEnergy(req,res){
        try{
            const response=await this.energySectorModel.addData(req.body);
            res.status(201).send(response);
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:"Error in adding data"});
        }
    }

    async getEnergy(req,res){
        try{
            const response=await this.energySectorModel.getData();
            res.status(200).send(response);
        }
        catch(err){
            console.log(err);
            res.status(500).send({message:"Error in getting data"});
        }
    }
}