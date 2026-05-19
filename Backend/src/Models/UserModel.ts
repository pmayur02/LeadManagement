import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email:{type:String, required:true, unique:true,trim: true,lowercase: true},
    password:{type:String, required:true},
    role:{type:String, enum:["admin", "user"],default: "user", required:true},
    status:{type:String, enum:["active","inactive"],default: "active", required:true}

}, { timestamps: true })


export const User = mongoose.model("User", userSchema);