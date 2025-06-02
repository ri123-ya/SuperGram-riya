import jwt from "jsonwebtoken";

export const generateToken =(user,res)=>{
    const cookieName = user.role === "Admin" ? "adminToken" : "userToken";
    const token = jwt.sign({ _id: user._id , role : user.role},process.env.JWT_SECRET,{
        expiresIn: "7d",
    });

    res.cookie(cookieName,token,{
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
        secure: true,
        sameSite: "None"

    });
    return token;
}