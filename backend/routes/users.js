const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getMe, updateUser, changePassword } = require('../controllers/userController');

router.get('/me', auth, getMe);
router.put('/update', auth, updateUser);
router.put('/change-password', auth, changePassword);

module.exports = router; 