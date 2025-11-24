// backend/models/Product.js

const mongoose = require('mongoose');

// 💡 Tarea 1: Modelo Product (id, name, description, price, imageUrl, categoryId, stock)
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0.01 // Tarea 9: Precio numérico > 0
    },
    imageUrl: {
        type: String,
        default: '/placeholder.jpg' // URL de imagen válida
    },
    // Referencia a la categoría (Tarea 1)
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Nombre del modelo de Categoría. ¡Debe coincidir con la exportación de Category.js!
        required: true // Tarea 9: Categoría obligatoria
    },
    stock: {
        type: Number,
        required: true,
        min: 0, // Tarea 9: Stock >= 0
        default: 0
    },
    // Opcional: Timestamp de creación y actualización
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// ✅ EXPORTACIÓN CLAVE: Exportar el modelo compilado
// Esto es lo que permite que seed.js y productController usen métodos como .find() y .deleteMany({})
module.exports = mongoose.model('Product', productSchema);