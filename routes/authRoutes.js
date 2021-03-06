const authController    =   require('../controllers/authController'),
      { Router }        =   require('express');

const router = Router();


router.get('/login',authController.login_get);

router.post('/login',authController.login_post);

router.get('/signup',authController.signup_get);

router.post('/signup',authController.signup_post);

router.post('/logout',authController.logout_post);

module.exports = router;