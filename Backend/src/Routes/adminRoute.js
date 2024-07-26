const express = require('express');
const { registerAdmin } = require('../Controllers/adminController');

const router = express.Router();

router.post('/registerAdmin', registerAdmin);

module.exports = router;
