const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  landmark: { type: String },
  paymentMethod: { type: String, required: true },
  totalItems: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  cartItems: [
    {
      productId: { type: String },
      name: String,
      price: Number,
      qty: Number,
    }
  ],
}, { timestamps: true });

module.exports = mongoose.model('Checkout', checkoutSchema);
