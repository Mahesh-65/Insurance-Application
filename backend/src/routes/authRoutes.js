const express = require('express');
const { register, login, profile } = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.get('/profile', protect, profile);

module.exports = router;
