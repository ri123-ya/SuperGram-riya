import jwt from "jsonwebtoken";
import user from "../models/user.schema.js";

export const isAdminAuthenticated = async(req,res,next) =>{
     const token = req.cookies.adminToken;

     if(!token){
        return res.status(403).json({ message: "Admin not authenticated"});
     }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await user.findById(decoded._id);
        if(req.user.role !== "Admin"){
            return res.status(403).json({message:"Not Authorized. Only Admins!"});
        
        }
         next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token"});
    }

};


export const isUserAuthenticated = async(req,res,next) =>{
     const token = req.cookies.userToken;

     if(!token){
        return res.status(403).json({ message: "User not authenticated"});
     }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await user.findById(decoded._id);
        if(req.user.role !== "User"){
            return res.status(403).json({message:"Not Authorized. Only Users!"});
        
        }
         next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token"});
    }

};