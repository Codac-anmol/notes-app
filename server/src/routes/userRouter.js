import express from 'express'
import { signupSchema , loginSchema} from '../validators/userValidator.js'
import { validate } from '../middleweres/validateMidddlewere.js'
import { getUser, login, signup } from '../controllers/userController.js'
import { auth } from '../middleweres/auth.js'

const userRouter = express.Router()


userRouter.post('/register',validate(signupSchema),signup)
userRouter.post('/login',validate(loginSchema),login)
userRouter.get('/',auth,getUser)

export default userRouter 