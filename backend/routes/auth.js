
const express = require('express');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/User');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/token');

const router = express.Router();


const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.COOKIE_SECURE === 'true',
  domain: process.env.COOKIE_DOMAIN || 'localhost',
  path: '/'
};


router.post('/register', async (req, res) => {
  try {
    const { name = '', email, password, role = 'user' } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash, role });
    return res.status(201).json({ message: 'registered', user: { id: user._id, email: user.email, role: user.role }});
  } catch (err) {
    console.error('register err', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const accessToken = signAccessToken(user);

   
    const jti = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    const refreshToken = signRefreshToken({ sub: user._id.toString(), jti });

   
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.json({ accessToken, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('login err', err);
    return res.status(500).json({ message: 'Server error' });
  }
});


router.post('/refresh', async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: 'No refresh token' });

  try {
    const payload = verifyRefreshToken(token);
    const userId = payload.sub;

    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    
    if (user.refreshToken !== token) {
      
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({ message: 'Refresh token mismatch' });
    }

    
    const jti = crypto.randomUUID ? crypto.randomUUID() : crypto.randomBytes(16).toString('hex');
    const newRefreshToken = signRefreshToken({ sub: user._id.toString(), jti });

    user.refreshToken = newRefreshToken;
    await user.save();

    const newAccessToken = signAccessToken(user);

    res.cookie('refreshToken', newRefreshToken, { ...COOKIE_OPTS, maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.json({ accessToken: newAccessToken, user: { id: user._id, email: user.email, role: user.role } });
  } catch (err) {
    console.error('refresh err', err);
    return res.status(401).json({ message: 'Invalid refresh token' });
  }
});


router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      try {
        const payload = verifyRefreshToken(token);
        const user = await User.findById(payload.sub);
        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      } catch (e) { /* ignore */ }
    }
    res.clearCookie('refreshToken', { path: '/' });
    res.json({ message: 'logged out' });
  } catch (err) {
    console.error('logout err', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
