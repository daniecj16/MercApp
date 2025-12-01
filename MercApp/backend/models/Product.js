// backend/models/Product.js

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // Nombre del producto (obligatorio)
    name: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true, // Elimina espacios en blanco al inicio/final
        maxlength: [100, 'El nombre no puede exceder los 100 caracteres']
    },
    // Descripción completa del producto (obligatorio)
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
    },
    // Precio del producto (obligatorio y debe ser positivo)
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        default: 0,
        min: [0, 'El precio debe ser un número positivo']
    },
    // Stock/Inventario (obligatorio y no negativo)
    stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        default: 0,
        min: [0, 'El stock no puede ser negativo']
    },
    // URL de la imagen (opcional)
    imageUrl: {
        type: String,
        default: 'no-image-url.jpg'
    },
    // Referencia a la Categoría (CLAVE: Relación con otro Modelo)
    // Asumimos que tienes un modelo Category ya definido.
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Nombre del modelo de la colección de Categorías
        required: [true, 'La categoría es obligatoria']
    },
    // Fecha de creación del registro
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Crear y exportar el modelo a partir del esquema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;