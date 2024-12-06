const jwt=require('jsonwebtoken');
const secret="Nidhwaal#2323"
const logger = require('../utility/logger');

exports.setToken=(user)=>{
    return jwt.sign({
        name:user.name,
    },secret,{ expiresIn: '1h' })

}

exports.verifyToken=(req,res,next)=>{
    const token = req.headers.token;
    if(!token)return res.status(401).json({ message: 'Access denied. No token provided.' });
    try{
        const decode=jwt.verify(token,secret);
        req.user=decode;
        next();

    }
    catch(err){
        logger.error(`Response Sent :${err}`);
        res.status(403).json({ message: 'Invalid or expired token.' });

    }
}