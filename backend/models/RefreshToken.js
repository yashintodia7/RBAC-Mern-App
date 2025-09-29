
const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  jti: { type: String, required: true, unique: true },  
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tokenHash: { type: String, required: true },
  revoked: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
