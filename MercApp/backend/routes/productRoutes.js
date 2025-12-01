// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();

// Importar todas las funciones del controlador
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');

// --------------------------------------------------------
// RUTAS DE ACCESO PÚBLICO (Catálogo - GET)
// --------------------------------------------------------

// GET /api/products
// Lista todos los productos (usado en HomeView)
router.get('/', getProducts); 

// GET /api/products/:id
// Obtiene un producto específico por su ID (usado en ProductDetailView)
router.get('/:id', getProductById);


// --------------------------------------------------------
// RUTAS DE ADMINISTRACIÓN (CRUD Completo)
// --------------------------------------------------------

// POST /api/products
// Crea un nuevo producto (usado en NewProductView para Alta)
router.post('/', createProduct);

// PUT /api/products/:id
// Actualiza un producto existente por su ID (usado en NewProductView para Edición)
router.put('/:id', updateProduct);

// DELETE /api/products/:id
// Elimina un producto por su ID (usado en NewProductView)
router.delete('/:id', deleteProduct);


// Exportar el router para que pueda ser utilizado en server.js
module.exports = router;