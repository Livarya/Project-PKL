const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nik: { type: String, required: true, unique: true },
  nama: { type: String, required: true },
  jabatan: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema); 