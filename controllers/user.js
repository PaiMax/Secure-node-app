const{setToken}=require('../middleware/auth');
const logger = require('../utility/logger');

exports.loginUser=async(req,res,next)=>{ 
    logger.info(`${req.method}:${req.originalUrl}: Enter`);
    if(!req.body.name){
        logger.info(`resposne sent : please provide the username`);
        res.status(400).send("please provide the username");
        return;
    }
    const token=setToken(req.body);
    res.status(200).json({token:token});
}

