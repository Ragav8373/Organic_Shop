const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: ' Email and password are required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: ' Invalid email or password',
      });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: ' Access denied: Not an admin',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: ' Invalid email or password',
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: true },
      process.env.JWT_SECRET || 'secretKey',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      message: ' Admin logged in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    console.error(' Admin login error:', error);
    res.status(500).json({
      success: false,
      message: ' Server error',
      error: error.message,
    });
  }
};
