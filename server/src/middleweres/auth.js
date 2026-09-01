import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(400).json({ "error": " please login / signIn " })
    }
    else {
        try {
            const decode = jwt.verify(token, process.env.SECRET)
            if (req.get("User-Agent") === decode.userAgent) {
                req.user = decode.userID
                next()
            }else{
                res.status(400).json({
                    error:"require to login again"
                })
            }

        } catch (err) {
            return res.status(400).json(err)
        }
    }

}