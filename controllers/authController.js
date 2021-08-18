const login_get = (req,res) => {
    res.render('auth/login');
}

const login_post = (req,res)=>{

}

const signup_get = (req,res) => {
    res.render('auth/signup');
}

const signup_post = (req,res) => {

}

module.exports = {
    login_get,
    login_post,
    signup_get,
    signup_post
}