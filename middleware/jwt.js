var jwt = require('jsonwebtoken');
const JWT_SECRET = "jbdksvjnasclncsn"


const auth = (req,res,next)=>{
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send("auth failed")     
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
        
    } catch (error) {
        res.status(401).send("auth failed")  
        
    }
}


module.exports = auth