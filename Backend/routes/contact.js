const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please fill all required fields' });
    }

    const contact = new Contact({ name, email, subject, phone, message });
    await contact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
