import mongoose from "mongoose";
const url= "mongodb+srv://vaibhav:chor1234@cluster0.572a8.mongodb.net/"

export const connectUsingMongoose=async()=>{
    try{
        await mongoose.connect(url,{
        })
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log(err);
    }
}