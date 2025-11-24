const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const multer = require('multer');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Rutas de productos (CRUD COMPLETO)
router.get('/', productController.getProducts); // GET all
router.get('/:id', productController.getProductById); // GET by ID

// POST: Usamos el middleware de multer para la imagen
router.post('/', upload.single('image'), productController.createProduct);

// PUT/PATCH: Usamos el middleware de multer para la imagen
router.put('/:id', upload.single('image'), productController.updateProduct);

// DELETE
router.delete('/:id', productController.deleteProduct);

module.exports = router;