
const express = require('express');
const { authenticateAccessToken, authorizeRoles } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();


router.get('/profile', authenticateAccessToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user: { id: user._id, email: user.email, role: user.role }});
});


router.get('/admin', authenticateAccessToken, authorizeRoles('admin'), (req, res) => {
  res.json({ secret: 'This is admin only data' });
});


router.post('/posts', authenticateAccessToken, authorizeRoles('admin', 'editor'), (req, res) => {
  res.json({ created: true, by: req.user.id });
});

module.exports = router;
