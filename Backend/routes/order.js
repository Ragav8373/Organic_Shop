
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/productModel');

// POST: Create a new order
router.post('/order', async (req, res) => {
  try {
    const cartItems = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const items = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.product._id || item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product._id || item.product}` });
      }

      if (product.stock < item.qty) {
        return res.status(400).json({ message: `Insufficient stock for: ${product.name}` });
      }

      // Update stock
      product.stock -= item.qty;
      await product.save();

      items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        ratings: product.ratings,
        stock: product.stock,
        images: product.images,
        category: product.category,
        seller: product.seller,
        numOfReviews: product.numOfReviews,
        productCreatedAt: product.createdAt,
        qty: item.qty
      });
    }

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    const newOrder = await Order.create({ items, totalPrice });

    res.status(201).json({
      message: 'Order saved successfully',
      order: newOrder
    });

  } catch (error) {
    console.error('Error saving order:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ success: false, message: 'Failed to load orders' });
  }
});

module.exports = router;
