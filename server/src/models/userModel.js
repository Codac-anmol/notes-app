import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "note"
    }]
    
},{timestamps:true})

export const user = mongoose.model("user",userSchema,"users")
