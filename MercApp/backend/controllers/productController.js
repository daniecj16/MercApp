// backend/controllers/productController.js

const Product = require('../models/Product');
// Importar Category si lo necesitas para el populate
// const Category = require('../models/Category'); 

// Utilizaremos async/await para las operaciones de Mongoose
// Nota: req y res son objetos de Express

// --------------------------------------------------------
// 1. OBTENER TODOS LOS PRODUCTOS (GET /api/products)
// --------------------------------------------------------
const getProducts = async (req, res) => {
    try {
        // En el futuro, aquí va la lógica de filtrado y búsqueda
        // .populate('categoryId') es crucial si quieres mostrar el nombre de la categoría
        const products = await Product.find({})
            // .populate('categoryId'); // Descomentar si Category.js existe
        
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --------------------------------------------------------
// 2. OBTENER PRODUCTO POR ID (GET /api/products/:id)
// --------------------------------------------------------
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        // Maneja errores de formato de ID (ej: ID inválido)
        res.status(500).json({ message: error.message });
    }
};

// --------------------------------------------------------
// 3. CREAR NUEVO PRODUCTO (POST /api/products)
// --------------------------------------------------------
const createProduct = async (req, res) => {
    try {
        // req.body contiene los datos enviados desde el formulario
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        // Maneja errores de validación de Mongoose
        res.status(400).json({ message: error.message });
    }
};

// --------------------------------------------------------
// 4. ACTUALIZAR PRODUCTO (PUT /api/products/:id)
// --------------------------------------------------------
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,         // Devuelve el documento modificado
            runValidators: true // Ejecuta las validaciones del esquema de Mongoose
        });
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }
        
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// --------------------------------------------------------
// 5. ELIMINAR PRODUCTO (DELETE /api/products/:id)
// --------------------------------------------------------
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar' });
        }
        
        // Retorna el producto eliminado o un mensaje de éxito
        res.status(200).json({ message: 'Producto eliminado con éxito', product: product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// CLAVE: Exportar TODAS las funciones requeridas por productRoutes.js
module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};