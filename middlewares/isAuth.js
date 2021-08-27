const jwt   =   require('jsonwebtoken');

const isAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){

        try{
            const decodedToken = jwt.verify(token,process.env.SESSION_SECRET);
            next();
        }
        catch(err){
            res.redirect(`/login?redirectTo=${req.path}`);
        }
    }
    else{
        res.redirect(`/login?redirectTo=${req.path}`);
    }
}

module.exports = { isAuth };