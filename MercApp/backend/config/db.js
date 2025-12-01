// backend/config/db.js

const mongoose = require('mongoose');
// Usamos dotenv para cargar las variables del archivo .env local
require('dotenv').config(); 

/**
 * Función que establece y maneja la conexión con MongoDB Atlas usando Mongoose.
 * * Utiliza process.env.MONGODB_URI, asegurando la parametrización para desarrollo 
 * local y para despliegue en Railway (donde la variable es inyectada).
 */
const connectDB = async () => {
    try {
        // CLAVE: Conexión asíncrona usando la URI de las variables de entorno
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
        
    } catch (error) {
        // En caso de error, muestra el mensaje y sale del proceso
        console.error(`❌ Error de Conexión a MongoDB: ${error.message}`);
        
        // Finaliza la aplicación con un código de error (1)
        process.exit(1); 
    }
};

module.exports = connectDB;