// backend/routes/api/products.js

const express = require('express');
const router = express.Router();
// Importamos el controlador que contiene toda la lógica de negocio
const productController = require('../../controllers/productController');

// Rutas de API para /api/products

// 1. OBTENER TODOS LOS PRODUCTOS (GET /api/products)
// Tarea 4/6: Carga el catálogo principal.
router.get('/', productController.getAllProducts);

// 2. CREAR NUEVO PRODUCTO (POST /api/products)
// Tarea 9: Crea un producto nuevo desde el formulario.
router.post('/', productController.createProduct);

// 3. OBTENER PRODUCTO POR ID (GET /api/products/:id)
// Tarea 8: Carga los detalles del producto.
router.get('/:id', productController.getProductById);

// 4. ACTUALIZAR PRODUCTO POR ID (PUT/PATCH /api/products/:id)
// Tarea 9: Edita un producto existente.
router.put('/:id', productController.updateProduct);

// 5. ELIMINAR PRODUCTO POR ID (DELETE /api/products/:id)
// Tarea 9: Elimina un producto.
router.delete('/:id', productController.deleteProduct);

module.exports = router;