const express = require('express');
const { paymentService, verifyPayment } = require('../controllers/payment.controllers');
const isAuth = require('../middlewares/isAuth');

const Paymentrouter = express.Router();

Paymentrouter.post('/create-order', isAuth, paymentService);
Paymentrouter.post('/verify', isAuth, verifyPayment); // ✅ NEW

module.exports = Paymentrouter;