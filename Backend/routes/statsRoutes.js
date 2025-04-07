const express = require('express');
const router = express.Router();
const { getStats } = require('../controllers/statsController');
const { authUser } = require("../middleware/auth");

router.get('/all', authUser, getStats);

module.exports = router;
