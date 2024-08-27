import mongoose  from "mongoose";

import { energySectorSchema } from "./energySector.schema.js";

const energySectorModel= mongoose.model('EnergySector',energySectorSchema)

export default class EnergySectorModel{
    async addData(obj){
        try{
            const data=new energySectorModel(obj)
            await data.save();
            return data;
        }
        catch(err){
            console.log(err);
            return err;
        }
    }

    async getData(){
        try{
            const data=await energySectorModel.find();
            return data;
        }
        catch(err){
            console.log(err);
            return err;
        }
    }
}