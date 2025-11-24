// backend/seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Asegúrate de que las rutas a tus modelos sean correctas
const Product = require('./models/Product'); 
const Category = require('./models/Category'); 

// Asegúrate de que esta ruta a tu configuración de DB sea correcta
const connectDB = require('./config/db'); 

// Carga las variables de entorno (como MONGO_URI)
dotenv.config();

// Conecta a la Base de Datos
connectDB(); 

// Datos de ejemplo para las categorías (Tarea 3)
const categoriesData = [
    { name: 'Electrónica' },
    { name: 'Ropa' },
    { name: 'Libros' },
    { name: 'Hogar' },
    { name: 'Deportes' }
];

const seedData = async () => {
    try {
        console.log('Limpiando base de datos...');
        
        // CORRECCIÓN CLAVE: Usar deleteMany({}) para borrar todos los documentos.
        await Product.deleteMany({}); 
        await Category.deleteMany({}); 
        
        console.log('Base de datos limpia.');

        // Insertar categorías (Tarea 3)
        const insertedCategories = await Category.insertMany(categoriesData);
        console.log('Categorías insertadas.');

        // Mapear categorías insertadas para usarlas en productos
        const electronicaId = insertedCategories.find(c => c.name === 'Electrónica')._id;
        const ropaId = insertedCategories.find(c => c.name === 'Ropa')._id;
        const librosId = insertedCategories.find(c => c.name === 'Libros')._id;
        const hogarId = insertedCategories.find(c => c.name === 'Hogar')._id;
        const deportesId = insertedCategories.find(c => c.name === 'Deportes')._id;
        
        // Datos de productos (Tarea 3: 8-12 productos)
        const productsData = [
            {
                name: 'Smartphone Pro 2025',
                description: 'El último smartphone con cámara de 108MP y pantalla OLED.',
                price: 799.99,
                // Imagen de Pexels: Teléfono moderno
                imageUrl: 'https://images.pexels.com/photos/4006152/pexels-photo-4006152.jpeg?auto=compress&cs=tinysrgb&w=800', 
                categoryId: electronicaId, 
                stock: 15
            },
            {
                name: 'Camiseta de Algodón Orgánico',
                description: 'Camiseta básica de algodón 100% orgánico, color blanco.',
                price: 19.50,
                // Imagen de Pexels: Ropa
                imageUrl: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=800', 
                categoryId: ropaId, 
                stock: 50
            },
            {
                name: 'El Gran Libro de Vue',
                description: 'Guía completa para desarrollo frontend con Vue 3 y JavaScript.',
                price: 45.00,
                // Imagen de Pexels: Libros
                imageUrl: 'https://images.pexels.com/photos/159792/bible-old-book-book-pages-old-fashioned-159792.jpeg?auto=compress&cs=tinysrgb&w=800', 
                categoryId: librosId, 
                stock: 8
            },
            {
                name: 'Balón de Fútbol Profesional',
                description: 'Balón oficial de cuero sintético para juegos de alto rendimiento.',
                price: 65.99,
                // Imagen de Pexels: Balón
                imageUrl: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800', 
                categoryId: deportesId, 
                stock: 4
            },
             {
                name: 'Auriculares Inalámbricos Premium',
                description: 'Cancelación de ruido activa y 30 horas de batería.',
                price: 129.00,
                // Imagen de Pexels: Auriculares
                imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=800', 
                categoryId: electronicaId, 
                stock: 22
            },
            {
                name: 'Sudadera con Capucha (Unisex)',
                description: 'Sudadera cómoda y abrigadora, ideal para el frío.',
                price: 55.00,
                // Imagen de Pexels: Ropa
                imageUrl: 'https://images.pexels.com/photos/159844/cellular-phone-flea-market-sale-159844.jpeg?auto=compress&cs=tinysrgb&w=800', 
                categoryId: ropaId, 
                stock: 0 
            },
            {
                name: 'Vajilla de Cerámica (Set 4 personas)',
                description: 'Set de vajilla elegante, resistente para uso diario.',
                price: 85.00,
                // Imagen de Pexels: Hogar
                imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
                categoryId: hogarId,
                stock: 18
            },
            {
                name: 'Esterilla de Yoga Profesional',
                description: 'Esterilla antideslizante de alta densidad para yoga y fitness.',
                price: 35.50,
                // Imagen de Pexels: Deportes
                imageUrl: 'https://images.pexels.com/photos/4079867/pexels-photo-4079867.jpeg?auto=compress&cs=tinysrgb&w=800',
                categoryId: deportesId,
                stock: 10
            }
        ];
        
        await Product.insertMany(productsData);
        console.log('Productos insertados. ¡Datos cargados con éxito! 🎉');

        // Cierra la conexión a la base de datos
        mongoose.connection.close(); 
        
    } catch (error) {
        console.error(`Error al poblar la base de datos: ${error.message}`);
        mongoose.connection.close();
        process.exit(1);
    }
};

seedData();