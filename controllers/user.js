const{setToken}=require('../middleware/auth');

exports.loginUser=async(req,res,next)=>{ 
    if(!req.body.name){
        res.send("please provide the username");
        return;
    }
    const token=setToken(req.body);
    res.json({token:token});
}

