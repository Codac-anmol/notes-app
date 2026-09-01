import {z} from 'zod'

export const noteVSchema = z.object({
    title:z.string().max(500,"title must be less than 500 characters"),
    content:z.string()
})

export const noteUpdateVSchema = z.object({
    id:z.string(),
    title:z.string().max(500,"title must be less than 500 characters"),
    content:z.string()
})

export const noteDelSchema = z.object({
    id:z.string(),
})
