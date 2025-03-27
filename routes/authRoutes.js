const express = require('express');
const { register, login } = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// приклад захищеного роута
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome, admin!' });
});

module.exports = router;