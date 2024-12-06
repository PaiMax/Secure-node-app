const jwt=require('jsonwebtoken');
const secret="Nidhwaal#2323"

exports.setToken=(user)=>{
    return jwt.sign({
        name:user.name,
    },secret,{ expiresIn: '1h' })

}

exports.verifyToken=(req,res,next)=>{
    console.log(req.headers.token);
    const token = req.headers.token;
    if(!token)return res.status(401).json({ message: 'Access denied. No token provided.' });
    try{
        const decode=jwt.verify(token,secret);
        req.user=decode;
        next();

    }
    catch(err){
        res.status(403).json({ message: 'Invalid or expired token.' });

    }
}