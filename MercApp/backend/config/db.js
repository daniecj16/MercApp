// Maneja la conexión a MongoDB usando Mongoose.
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Conectado...');
  } catch (err) {
    console.error(err.message);
    // Salir del proceso con fallo
    process.exit(1);
  }
};

module.exports = connectDB;