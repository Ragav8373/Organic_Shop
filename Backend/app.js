

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const connectDb = require('./config/connectDb');
connectDb();

const Product = require('./models/productModel');

const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user'); 
const adminRoutes = require('./routes/admin');
const contactRoutes = require('./routes/contact');


app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

app.use('/api', productRoutes);  
app.use('/api', orderRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', contactRoutes);


app.post('/single', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { name, price, ratings, category, stock, description } = req.body;

    const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const product = await Product.create({
      name,
      price,
      ratings,
      category,
      stock,
      description,
      images: [{ image: imagePath }]
    });

    res.status(201).json({
      message: 'Product uploaded and saved successfully',
      product
    });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});








