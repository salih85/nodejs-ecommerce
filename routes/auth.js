const express = require('express');
const { adminLoginpage, adminLogin, adminlogout, adminRegisterpage, adminRegister } = require('../controllers/auth');
const router = express.Router();

// router
//     .route('/')
//     .get(adminLoginpage);

router
    .route('/admin/login')
    .get(adminLoginpage)
    .post(adminLogin);

router
    .route('/admin/register')
    .get(adminRegisterpage)
    .post(adminRegister);

router
    .route('/admin/logout')
    .get(adminlogout);

module.exports = router;