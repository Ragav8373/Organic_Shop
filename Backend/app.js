

// const express = require('express');
// const app = express();
// const dotenv = require('dotenv');
// const path = require('path');
// const cors = require('cors');
// const multer = require('multer');

// dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// const connectDb = require('./config/connectDb');
// connectDb();

// const Product = require('./models/productModel');

// const productRoutes = require('./routes/product');
// const orderRoutes = require('./routes/order');
// const userRoutes = require('./routes/user'); 
// const adminRoutes = require('./routes/admin');
// const contactRoutes = require('./routes/contact');

// const checkoutRoutes = require("./routes/checkoutRoutes");
// app.use("/api/checkout", checkoutRoutes);



// app.use(express.json());
// app.use(cors());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });
// const upload = multer({ storage });

// app.use('/api', productRoutes);  
// app.use('/api', orderRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api', contactRoutes);


// app.post('/single', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const { name, price, ratings, category, stock, description } = req.body;

//     const imagePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

//     const product = await Product.create({
//       name,
//       price,
//       ratings,
//       category,
//       stock,
//       description,
//       images: [{ image: imagePath }]
//     });

//     res.status(201).json({
//       message: 'Product uploaded and saved successfully',
//       product
//     });
//   } catch (error) {
//     console.error('Error saving product:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const multer = require('multer');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Connect to MongoDB
const connectDb = require('./config/connectDb');
connectDb();

// Models
const Product = require('./models/productModel');

// Middleware
app.use(express.json());

// ✅ Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// ==========================
// Routes
// ==========================
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');        // GET /orders -> admin page
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');        // POST /login
const contactRoutes = require('./routes/contact');
const checkoutRoutes = require("./routes/checkoutRoutes"); // POST /checkout

// Mount routes
app.use('/api', productRoutes);           // Products
app.use('/api/admin', orderRoutes);       // Admin fetch orders
app.use('/api/users', userRoutes);        // Users
app.use('/api/admin', adminRoutes);       // Admin login
app.use('/api', contactRoutes);           // Contact
app.use('/api/checkout', checkoutRoutes); // Checkout

// ==========================
// File upload route
// ==========================
app.post('/single', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

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

// ==========================
// Start server
// ==========================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
