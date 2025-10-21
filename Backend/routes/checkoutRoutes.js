const express = require('express');
const router = express.Router();
const Checkout = require('../models/checkoutModel');

router.post('/', async (req, res) => {
  try {
    console.log("📦 Received checkout data:", req.body); // <== Add this for debugging

    const newCheckout = new Checkout(req.body);
    await newCheckout.save();

    res.status(201).json({
      message: 'Order placed successfully!',
      deliveryId: newCheckout._id
    });
  } catch (error) {
    console.error('❌ Checkout Save Error:', error);
    res.status(500).json({
      message: 'Server error while saving checkout details',
      error: error.message
    });
  }
});

module.exports = router;
