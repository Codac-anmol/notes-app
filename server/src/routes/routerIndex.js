import express from 'express'
import userRouter from './userRouter.js'
import notesRouter from './notesRouter.js'
import { auth } from '../middleweres/auth.js'
import { validate } from '../middleweres/validateMidddlewere.js'

const router = express.Router()

router.use('/notes',auth,notesRouter)
router.use('/user',userRouter)

export default router