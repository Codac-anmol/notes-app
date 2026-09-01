import { user } from "../models/userModel.js";
import { note } from "../models/notesModel.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/jwtGen.js";


export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await user.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email"
            })
        }

        const hashPass = await bcrypt.hash(password, 12)

        const newUser = await user.create({
            name,
            email,
            password: hashPass,
            notes: []
        })

        const userAgent = req.get("User-Agent")
        const token = await generateToken(newUser._id, userAgent)

        res.status(200).json({
            userName: newUser.name,
            token,
            notes: newUser.notes
        })


    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    const existingUser = await user.findOne({ email }).populate("notes")
    if (!existingUser) {
        return res.status(400).json({
            message: "User dont exists "
        })
    }
    const userAgent = req.get("User-Agent")
    if (await bcrypt.compare(password, existingUser.password)){
        const token = await generateToken(existingUser._id, userAgent)

        res.status(200).json({
            userName: existingUser.name,
            token,
            notes:existingUser.notes
        })
    }else{return res.status(400).json({
            message: "Wrong credentials please enter valid one  "
        })
    }
}

export const getUser =async (req,res)=>{
    try{
        const usr = await user.findOne({_id:req.user}).populate("notes")
        if(usr){
            return res.status(200).json({
                userName:usr.name,
                notes:usr.notes
            })
        }else{
            return res.status(500).json({
                "err":"login/register baby "
            })
        }
    }catch(err){
        return res.status(400).json(err)
    }
}

