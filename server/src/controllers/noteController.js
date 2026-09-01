import { note } from '../models/notesModel.js'
import { user } from '../models/userModel.js'

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const newNote = await note.create({
            title,
            content
        })

        await user.findOneAndUpdate({ _id: req.user }, { $push: { notes: newNote._id } }, { returnDocument: 'after' })
        return res.status(200).json({ newNote })
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const updateNote = async (req, res) => {
    try {
        const { id, title, content } = req.body
        const uNote = await note.findOneAndUpdate({ _id: id }, { $set: { title: title, content: content } })
        return res.status(200).json({
            "message": "uppdated sucessfully",
            uNote
        })
    } catch (err) {
        return res.status(400).json(err)
    }

}

export const delNote = async (req, res) => {
    try {
        const { id } = req.body
        await note.findOneAndDelete({ _id: id })
        const u = await user.findOneAndUpdate({ _id: req.user }, { $pull: { notes: id } },{new:true}).populate("notes")
        return res.status(200).json({
            user: u,
            "message": "del sucessfully",
        })
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const getNote = async (req, res) => {
    try {
        const usr = await user.findOne({ _id: req.user }).populate("notes")
        if (!usr) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            notes: usr.notes
        });
    } catch (err) {
        return res.status(400).json(err)
    }

}
