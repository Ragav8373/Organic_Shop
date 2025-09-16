const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel'); // Make sure this path is correct

// MongoDB connection URL
const DB_URL = 'mongodb://localhost:27017/shop';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log(' Connected to MongoDB');

    const email = 'ragav9760@gmail.com';
    const password = 'ragav2004';
    const number = '6380962804';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin user
    const newAdmin = new User({
      firstname: 'Admin',
      lastname: 'User',
      email,
      number,
      password: hashedPassword,
      isAdmin: true,
      address: '',
      pincode: '',
      country: '',
      city: '',
      gender: '',
      languages: []
    });

    await newAdmin.save();

    console.log('Admin created successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error(' Error connecting to MongoDB:', err);
    process.exit(1);
  });
