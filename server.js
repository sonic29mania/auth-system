const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB підключено');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Сервер працює на порту ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Помилка MongoDB:', err.message);
  });

app.use('/auth', authRoutes);
