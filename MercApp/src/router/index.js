import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'; // Carga directa (no lazy) para la ruta principal

// -------------------------------------------------------------------------
// Tarea 10: Lazy Loading (Carga perezosa) para optimización
// Usamos 'import()' para cargar estos componentes solo cuando se necesitan.
// La ruta es '../views/' porque index.js está en 'src/router/'
// -------------------------------------------------------------------------
const AboutView = () => import('../views/AboutView.vue'); 
const CartView = () => import('../views/CartView.vue'); 
const ProductDetailView = () => import('../views/ProductDetail.vue');
const NewProductView = () => import('../views/NewProductView.vue'); 
const NotFoundView = () => import('../views/NotFoundView.vue'); // Para el manejo de 404


const router = createRouter({
  // Tarea 5: Configuración de historial (URL limpias)
  history: createWebHistory(import.meta.env.BASE_URL),
  
  routes: [
    // 1. Tarea 5: Ruta Home/Catálogo
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    
    // 2. Tarea 5: Ruta de Detalle de Producto (Ruta dinámica)
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetailView
    },
    
    // 3. Tarea 9: Ruta de Creación de Producto (Alta)
    {
      path: '/product/new',
      name: 'NewProduct',
      component: NewProductView
    },

    // 4. Tarea 9: Ruta de Edición de Producto (usa la misma vista que NewProduct)
    {
        path: '/product/:id/edit',
        name: 'EditProduct',
        component: NewProductView
    },

    // 5. Tarea 5 & 10: Ruta del Carrito (Lazy Loaded)
    {
      path: '/cart',
      name: 'Cart',
      component: CartView
    },
    
    // 6. Tarea 5 & 10: Ruta Acerca de (Lazy Loaded)
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    
    // 7. Tarea 5: Ruta 404 (Catch-all)
    {
      // Esta ruta debe ser la última
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView
    }
  ]
});

export default router;