import express from 'express'
import mongoose, { connect } from 'mongoose'


import dotenv from 'dotenv'
dotenv.config()

const url = process.env.DbURL

export const conn = async ()=>{
    try {
        await mongoose.connect(url)
        console.log(`connected db @ ${url}`)
    }catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}