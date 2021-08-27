const { response } = require('express');
const session   =   require('express-session'),
      User      =   require('../models/User'),
      bcrypt    =   require('bcrypt'),
      jwt       =   require('jsonwebtoken');

//some handler functions
const authenticateUser = (req,res,id)=>{
    const token = jwt.sign(
        { id },
        process.env.SESSION_SECRET,
        {
            expiresIn: "20s"
    });

    res.cookie('jwt',token,{
        maxAge: 20*1000,
        secure: true,
        httpOnly: true
    });
}

const login_get = (req,res) => {
    res.render('auth/login',{error: null,redirectTo: req.query.redirectTo});
}

const login_post = async (req,res)=>{
    const { email,password } = req.body;

    try{
            
        const user = await User.findOne({email});

        if(!user)
        {
            res.locals.error = "Invalid Email ID";
            res.locals.redirectTo = req.query.redirectTo;
            res.render('auth/login');
        }

        else{
            const match = await bcrypt.compare(password,user.password);

            if(!match){

                res.locals.error = "Invalid Password";
                res.locals.redirectTo = req.query.redirectTo;
                res.render('auth/login');

            }else{
                authenticateUser(req,res,user._id);

                if(!req.query.redirectTo)
                    return res.redirectTo('/home');

                res.redirect(req.query.redirectTo);
            }
        }
    }catch(err){
        res.status(401).json(err);
    }
}

const signup_get = (req,res) => {
    res.locals.error = null;
    res.locals.redirectTo = req.query.redirectTo;
    res.render('auth/signup');
}

const signup_post = async (req,res) => {
    try{
        const newUser = await User.create(req.body);
        authenticateUser(req,res,newUser._id);
        res.redirect(req.query.redirectTo);
    }
    catch(err){
        if(err.code === 11000)
        {
            res.locals.error = "this email is already registered";
            res.locals.redirectTo = req.query.redirectTo;
            res.status(400).render('auth/signup');
        }else{
            res.locals.error = err.message;
            res.locals.redirectTo = req.query.redirectTo;
            res.render('auth/signup');
        }
    }
}

const logout_post = (req,res)=>{
    res.cookie('jwt','',{maxAge: 0});
    res.redirect('back');
}

module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post,
    logout_post
}