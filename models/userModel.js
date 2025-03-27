const { DataTypes } = require('sequelize');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// PostgreSQL / MySQL модель
function defineUserModel(sequelize) {
  return sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'user' }
  });
}

// Mongo модель
const mongoUserSchema = new mongoose.Schema({
  id: Number,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

mongoUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const MongoUser = mongoose.model('MongoUser', mongoUserSchema);

module.exports = { defineUserModel, MongoUser };