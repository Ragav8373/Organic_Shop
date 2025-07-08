


  const orderModel = require('../models/orderModel');
  const productModel = require('../models/productModel');

  exports.createOrder = async (req, res, next) => {
  try {
    const rawItems = req.body;
    const items = [];

    for (const item of rawItems) {
      const product = await productModel.findById(item.product._id);
      if (!product) continue;

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

      product.stock -= item.qty;
      await product.save();
    }

    const totalPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    const order = await orderModel.create({ items, totalPrice });

    res.json({ success: true, order });

  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
