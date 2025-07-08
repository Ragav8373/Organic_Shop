const productModel = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    console.log("Fetching product with ID:", req.params.id); 

    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Fetch single product error:", error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}


exports.updateProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;
    product.stock = req.body.stock;

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
}
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne(); 

    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



