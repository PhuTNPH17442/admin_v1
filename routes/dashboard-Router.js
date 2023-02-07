const express = require('express');
const { dashboard, pieChart, customers, userChart, hobbiesChart } = require('../controllers/dashboardController');
const router = express.Router()

router.get('/',dashboard)
router.get('/customers',customers)
router.get('/pieChart',pieChart)
router.get('/userChart',userChart)
router.get('/hobbiesChart',hobbiesChart)

module.exports = {
    routes : router
};