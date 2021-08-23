const isAuth = (req,res,next)=>{
    if(req.session.isAuth)
        next();
    else
        res.redirect(`/login?redirectTo=${req.path}`);
}

module.exports = { isAuth };