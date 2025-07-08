const bcrypt = require('bcrypt');
const User = require('../models/userModel');  

exports.registerUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      number,
      password,
      confirmPassword,
      address,
      pincode,
      country,
      city,
      gender,
      languages,
    } = req.body;

    // Validate the required fields
    if (!firstname || !lastname || !email || !password || !confirmPassword || !number || !address || !pincode || !country || !city || !gender || !languages) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if email is already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      number,
      password: hashedPassword,  
      address,
      pincode,
      country,
      city,
      gender,
      languages,
    });

    await newUser.save();

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message, 
    });
  }
};
