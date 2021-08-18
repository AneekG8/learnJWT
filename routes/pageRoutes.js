const pageController    =   require('../controllers/pageController'),
      { Router }        =   require('express');

const router = Router();

router.get('/home',(req,res)=>{
    pageController.home_get(req,res);
})

router.get('/hidden',(req,res)=>{
    pageController.hidden_get(req,res);
})

module.exports = router;