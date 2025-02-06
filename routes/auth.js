const express = require('express');
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/authMiddlewareRefresh');

const router = express.Router();

router.post('/signup', authController.register);

router.post('/login', authController.login);

router.get('/current', verifyToken, authController.currentUser);

router.post('/refresh', authController.refresh);

module.exports = router;
