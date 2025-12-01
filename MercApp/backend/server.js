// backend/server.js

const express = require('express');
const cors = require('cors');
// Importamos dotenv para cargar el .env local (no necesario en Railway, pero sí en desarrollo)
require('dotenv').config(); 

// Importar la función de conexión a la base de datos
const connectDB = require('./config/db'); 

// Importar las rutas de la API (Asegúrate de que estas rutas existan)
const productRoutes = require('./routes/productRoutes'); 
// const categoryRoutes = require('./routes/categoryRoutes'); // Si tienes rutas de categoría

// 1. CONEXIÓN A LA BASE DE DATOS
connectDB(); 

const app = express();

// 2. MIDDLEWARE PRINCIPAL

// Middleware para parsear JSON (permite recibir datos en formato JSON en peticiones POST/PUT)
app.use(express.json()); 

// 3. CONFIGURACIÓN DE CORS
// Permite peticiones desde el frontend de Netlify y el desarrollo local
const allowedOrigins = [
    'http://localhost:5173', // Desarrollo local de Vite
    process.env.FRONTEND_URL  // URL de producción (Netlify) inyectada por Railway
];

const corsOptions = {
    origin: (origin, callback) => {
        // Permite si el origen está en la lista o si no hay origen (ej: Postman, CURL)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Rechaza el acceso
            callback(new Error('❌ No permitido por las políticas de CORS.'));
        }
    },
    // CLAVE: Permite todos los métodos necesarios para el CRUD y el preflight OPTIONS
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS", 
    credentials: true,
    optionsSuccessStatus: 204 // Respuesta para el preflight OPTIONS
};

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


// 4. RUTAS PRINCIPALES DE LA API

// Ruta de salud (Health Check) - Tarea 5
app.get('/health', (req, res) => {
    res.status(200).send('API is running and healthy! 🚀');
});

// Montar las rutas de productos
app.use('/api/products', productRoutes); 

// Montar las rutas de categorías (Descomentar si tienes el archivo)
// app.use('/api/categories', categoryRoutes); 

// Ruta de Fallback 404
app.use((req, res, next) => {
    res.status(404).send({ message: "Ruta no encontrada." });
});


// 5. INICIO DEL SERVIDOR

// Usa la variable de entorno PORT (inyectada por Railway) o el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
    // Muestra la URL del Frontend permitida (útil para debug local)
    console.log(`CORS permitido para: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});
