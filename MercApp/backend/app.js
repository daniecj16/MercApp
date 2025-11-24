const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Conectar a la Base de Datos
connectDB();

// 1. Middlewares Esenciales
// Permite que el Frontend (Vue) acceda a la API (Tarea 4)
app.use(cors()); 
// Para parsear el body de las peticiones JSON
app.use(express.json({ extended: false })); 
// Para servir imágenes subidas estáticamente
app.use('/uploads', express.static('uploads')); 

// 2. Definición de Rutas de la API (Mounting)
app.use('/api/products', require('./routes/api/products'));
app.use('/api/categories', require('./routes/api/categories'));

// 3. Manejo de Ruta 404 (Último middleware si no se encontró ruta)
app.use((req, res) => {
    // Tarea 2: Manejo de errores 404
    res.status(404).json({ msg: 'Error 404: Ruta API no encontrada' });
});


module.exports = app;