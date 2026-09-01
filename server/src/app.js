import express, { json } from 'express'
const app=express()
import cors from 'cors'
import router from './routes/routerIndex.js'

app.use(cors())
app.use(json())
app.use(router)

export default app