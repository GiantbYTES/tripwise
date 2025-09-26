const router = require('express').Router();
const authController = require('../controllers/authController.js');
const tripController = require("../controllers/tripController.js")
const authenticateToken = require('../middlewares/authenticateToken.js');
const validateUserInput = require("../middlewares/validateUserInput.js")



router.post('/login',validateUserInput,authController.login);
router.post('/signup',validateUserInput, authController.signup);
router.post('/logout', authController.logout);
router.post('/refresh', authController.refresh);

router.get('/me',authenticateToken,authController.me)
router.post("/insert-to-db",authenticateToken,tripController)
router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: "Welcome to dashboard", user: req.user });
});

module.exports = router;
