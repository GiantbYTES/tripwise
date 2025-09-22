const router = require('express').Router();
const authController = require('../controllers/authController.js');
const authenticateToken = require('../middlewares/authenticateToken.js');
const validateUserInput = require("../middlewares/validateUserInput.js")



router.post('/login',validateUserInput,authController.login);
router.post('/signup',validateUserInput, authController.signup);
router.post('logout',validateUserInput,authController.logout)
router.post('/refresh',validateUserInput,authController.refresh)


router.get('/dashboard',authenticateToken,(req,res)=>{
})
module.exports = router;
