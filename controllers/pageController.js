const home_get = (req,res) => {
    res.render('page/home');
}

const hidden_get = (req,res) => {
    res.render('page/hidden');
}

module.exports = {
    home_get,
    hidden_get
}