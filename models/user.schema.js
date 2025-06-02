import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    middlename:{
        type: String,
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        minLength: [8, "Password Must Contain At Least 8 Characters "],
        select: false,
        required: true,
    },
    role:{
        type: String,
        enum:["User","Admin"],
        required: true,
    },

},{ timestamps: true });

const User = mongoose.model("User",userSchema);

export default User;