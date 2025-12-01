// backend/routes/api/products.js

const express = require('express');
const router = express.Router();
// Importamos el controlador que contiene toda la lógica de negocio
const productController = require('../../controllers/productController');

// Rutas de API para /api/products

// 1. OBTENER TODOS LOS PRODUCTOS (GET /api/products)
router.get('/', productController.getAllProducts);

// 2. CREAR NUEVO PRODUCTO (POST /api/products)
router.post('/', productController.createProduct);

// 3. OBTENER PRODUCTO POR ID (GET /api/products/:id)
router.get('/:id', productController.getProductById);

// 4. ACTUALIZAR PRODUCTO POR ID (PUT/PATCH /api/products/:id)
router.put('/:id', productController.updateProduct);

// 5. ELIMINAR PRODUCTO POR ID (DELETE /api/products/:id)
router.delete('/:id', productController.deleteProduct);

module.exports = router;