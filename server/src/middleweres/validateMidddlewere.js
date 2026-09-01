
export const validate = (schema)=>{
    return ((req,res,next)=>{
        const bresult = schema.safeParse(req.body);
        if(!(bresult.success)){
            return res.status(400).json(bresult.error.flatten())
        }

        req.body=bresult.data
        next()
    }
    )
}