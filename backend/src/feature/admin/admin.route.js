import express from "express";
import AdminController from "./admin.controller.js";

const AdminRouter=express.Router();
const adminController=new AdminController();
console.log("helloss")
AdminRouter.post('/login',adminController.logIn)
AdminRouter.get('/logout',adminController.logOut)

export default AdminRouter;