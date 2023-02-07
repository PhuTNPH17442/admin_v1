const express = require('express');
const { login, login1 } = require('../controllers/authController');
const router = express.Router()

router.get('/login',login)
router.post('/login',login1)
module.exports = {
    routes : router
};