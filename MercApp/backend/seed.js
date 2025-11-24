const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');
const Category = require('./models/Category');

const connectDB = require('./config/db');

const seedData = async () => {
    // 1. Conectar a la base de datos
    await connectDB();

    try {
        console.log('Limpiando base de datos...');
        await Product.deleteMany();
        await Category.deleteMany();

        // 2. Crear 3-5 Categorías
        console.log('Creando categorías...');
        const categoriesData = [
            { name: 'Electrónica' },
            { name: 'Ropa y Moda' },
            { name: 'Hogar' },
            { name: 'Alimentos' }
        ];

        const createdCategories = await Category.insertMany(categoriesData);
        
        // Mapear categorías para facilitar el acceso
        const catMap = {};
        createdCategories.forEach(cat => {
            catMap[cat.name] = cat._id;
        });

        // 3. Crear 8-12 Productos
        console.log('Creando productos...');
        const productsData = [
            {
                name: 'Smartphone X10',
                description: 'Teléfono de última generación con cámara 108MP.',
                price: 799.99,
                imageUrl: 'https://picsum.photos/400/400?random=1',
                categoryId: catMap['Electrónica'],
                stock: 15
            },
            {
                name: 'Cargador Rápido USB-C',
                description: 'Carga tu dispositivo en minutos. 65W.',
                price: 25.50,
                imageUrl: 'https://picsum.photos/400/400?random=2',
                categoryId: catMap['Electrónica'],
                stock: 50
            },
            {
                name: 'Camiseta Algodón Orgánico',
                description: 'Suave y cómoda, 100% algodón orgánico.',
                price: 19.95,
                imageUrl: 'https://picsum.photos/400/400?random=3',
                categoryId: catMap['Ropa y Moda'],
                stock: 30
            },
            {
                name: 'Jeans Slim Fit',
                description: 'Ajuste perfecto y duradero.',
                price: 49.99,
                imageUrl: 'https://picsum.photos/400/400?random=4',
                categoryId: catMap['Ropa y Moda'],
                stock: 20
            },
            {
                name: 'Set de Ollas Antiadherentes',
                description: '7 piezas. Ideal para cualquier cocina moderna.',
                price: 120.00,
                imageUrl: 'https://picsum.photos/400/400?random=5',
                categoryId: catMap['Hogar'],
                stock: 10
            },
            {
                name: 'Lámpara de Escritorio LED',
                description: 'Brillo ajustable, luz cálida.',
                price: 35.00,
                imageUrl: 'https://picsum.photos/400/400?random=6',
                categoryId: catMap['Hogar'],
                stock: 40
            },
            {
                name: 'Café Grano Tostado (1kg)',
                description: 'Arábica 100%, tueste medio.',
                price: 15.75,
                imageUrl: 'https://picsum.photos/400/400?random=7',
                categoryId: catMap['Alimentos'],
                stock: 100
            },
            {
                name: 'Aceite de Oliva Extra Virgen',
                description: 'Prensa en frío, sabor intenso.',
                price: 12.90,
                imageUrl: 'https://picsum.photos/400/400?random=8',
                categoryId: catMap['Alimentos'],
                stock: 60
            }
        ];

        await Product.insertMany(productsData);

        console.log('✅ Base de datos poblada exitosamente.');
    } catch (err) {
        console.error('❌ Error al poblar la base de datos:', err);
        process.exit(1);
    } finally {
        mongoose.connection.close();
    }
};

seedData();