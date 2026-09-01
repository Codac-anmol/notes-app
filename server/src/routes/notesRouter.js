import express from 'express'
import { validate } from '../middleweres/validateMidddlewere.js'
import { noteVSchema , noteUpdateVSchema ,noteDelSchema} from '../validators/noteValidator.js'
import { auth } from '../middleweres/auth.js'
import { createNote ,updateNote ,delNote,getNote} from '../controllers/noteController.js'
const notesRouter = express.Router()

notesRouter.get('/',auth,getNote)
notesRouter.post('/create',validate(noteVSchema),auth,createNote)
notesRouter.patch('/update',validate(noteUpdateVSchema),auth,updateNote)
notesRouter.delete('/del',validate(noteDelSchema),auth,delNote)



export default notesRouter 