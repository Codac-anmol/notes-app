import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import { conn } from './config/dbConfig.js'
import app from './app.js'
const port = process.env.PORT

await conn()

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})







