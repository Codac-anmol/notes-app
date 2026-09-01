import jwt from 'jsonwebtoken'

export const generateToken = ((userID,userAgent) => {
    const token = jwt.sign(
        {
            userID,
            userAgent,
        },
        process.env.SECRET,
        {expiresIn:"1d"}
    )
    return token;
}) 