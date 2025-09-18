const jwt=require('jsonwebtoken');

exports.adminOnly=(req,res,next)=>{
    const token=req.cookies?.admin
    if(!token){
        return res.redirect('/admin/login')
    }
    try{
        var decoded=jwt.verify(token,process.env.JWT_SCRET);
         // console.log(decoded);
          req.user=decoded
         return next()    
    }catch(err){
        console.log('Token expired or invalid:', err.message);
    }
    //console.log(token)
    return res.redirect('/admin/login')
}