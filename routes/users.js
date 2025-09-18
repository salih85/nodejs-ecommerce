const express = require('express');
const { ViewCategory, Viewhome } = require('../controllers/user');
const router = express.Router();

router.get('/', Viewhome);
router.get('/home', Viewhome);

// category route (phone, lifestyle, etc.)
router.get('/:category', ViewCategory);

module.exports = router;
