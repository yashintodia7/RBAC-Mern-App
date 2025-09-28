
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'editor', 'admin'], default: 'user' },
  refreshToken: { type: String, default: null } 
  
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
