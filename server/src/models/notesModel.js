import mongoose from 'mongoose'
import { string } from 'zod'

const noteSchema = mongoose.Schema({
    title:String,
    content:String
},{timestamps:true})
export const note = mongoose.model("note",noteSchema,"notes")