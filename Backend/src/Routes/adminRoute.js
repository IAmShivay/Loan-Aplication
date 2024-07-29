const express = require('express');
const { registerAdmin } = require('../Controllers/adminController');
const { isAuthenticated } = require('../Middleware/auth');

const router = express.Router();

router.post('/registerAdmin',isAuthenticated,registerAdmin);

module.exports = router;
