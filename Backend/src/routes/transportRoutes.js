const express = require('express');
const { searchAllTransports } = require('../controllers/transportController');

const router = express.Router();

router.get('/search', searchAllTransports);

module.exports = router;