# 🛍️ MercApp: Aplicación de Catálogo y Compras (SPA - Vue 3 & Node.js/Express)

## 📌 1. Información del Proyecto

| Campo | Detalle |
| :--- | :--- |
| **Nombre del Estudiante** | **[Nombre Completo del Estudiante Aquí]** |
| **Asignatura** | **[Nombre de la Asignatura Aquí]** |
| **Proyecto** | MercApp (Single Page Application - SPA) |
| **Tecnologías Frontend** | Vue 3 (**Composition API**), Vite, Vue Router |
| **Tecnologías Backend** | Node.js, Express, MongoDB, Mongoose |

***

## 🛠️ 2. Arquitectura y Tecnologías

El proyecto sigue una arquitectura **Cliente-Servidor** comunicada mediante una **API RESTful**.

### 2.1. Backend (API REST)
* **Servidor:** Node.js con **Express**.
* **Base de Datos:** MongoDB.
* **ORM:** Mongoose (Manejo de Modelos y Esquemas).
* **Funcionalidades CRUD:** Endpoints para la gestión de **Productos** y **Categorías**.

### 2.2. Frontend (SPA)
* **Framework:** **Vue 3** (Composition API y `script setup`).
* **Build Tool:** **Vite** (Para un desarrollo rápido y *bundling* eficiente).
* **Routing:** Vue Router (Configurado con **Carga Perezosa**).
* **Estado:** **Composables** personalizados (`useApi`, `useCart`) para gestión de estado y **persistencia local** (`localStorage`).

***

## 🚀 3. Funcionalidades Implementadas

La aplicación cubre el ciclo funcional completo, desde el catálogo hasta el carrito y la administración (CRUD).

### 3.1. Catálogo, Filtros y Optimización
* **Listado Reactivo:** Consumo de `GET /api/products` y `GET /api/categories` en `HomeView.vue`.
* **Búsqueda y Filtro:** Uso de **Propiedades Computadas** (`filteredProducts`) para filtrar el catálogo por **nombre/descripción** y **Categoría** simultáneamente.
* **Detalle de Producto:** Vista dinámica `/product/:id` que consume el *endpoint* individual.
* **Optimización:** **Carga Perezosa (Lazy Loading)** implementada en todas las vistas principales.

### 3.2. Gestión de Datos (CRUD)
* **Semilla de Datos:** Script **`seed.js`** con lógica de **idempotencia** para inicializar la DB.
* **Formulario Unificado:** Vista **`NewProductView.vue`** reutilizada para **Alta (`POST`)** y **Edición (`PUT`/`PATCH`)** de productos.
* **Eliminación:** Funcionalidad de **`DELETE /api/products/:id`** con **confirmación previa** (`window.confirm`) para seguridad de datos.
* **Comunicación Componente:** **`ProductCard.vue`** utiliza **Props** y un **Evento Personalizado** (`@added-to-cart`) para la comunicación.

### 3.3. Carrito de Compras
* **Estado Centralizado:** **Composable `useCart.js`** que centraliza la lógica del carrito.
* **Persistencia:** El estado del carrito se mantiene entre sesiones gracias a la integración con **`localStorage`**.
* **Manipulación:** **`CartView.vue`** permite **incrementar/decrementar** la cantidad, **eliminar** ítems y muestra el **Total General** de manera reactiva.

***

## ⚙️ 4. Instrucciones de Uso e Instalación

### 4.1. Pre-requisitos
* **Node.js** (versión 16 o superior).
* **MongoDB** instalado y corriendo (en `mongodb://localhost:27017` por defecto).

### 4.2. Instalación y Configuración

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://aws.amazon.com/es/what-is/repo/](https://aws.amazon.com/es/what-is/repo/)
    cd mercapp
    ```

2.  **Instalar dependencias del Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Instalar dependencias del Frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

### 4.3. Inicialización de la Base de Datos

* Desde la carpeta **`backend`**, ejecutar el script de semilla para poblar la base de datos:
    ```bash
    npm run seed
    ```

### 4.4. Ejecución del Proyecto

1.  **Iniciar el Backend:**
    * Abrir una terminal en la carpeta **`backend`**:
        ```bash
        npm run dev
        ```
    *(Servidor escuchando en `http://localhost:3000`)*

2.  **Iniciar el Frontend (SPA):**
    * Abrir una **segunda terminal** en la carpeta **`frontend`**:
        ```bash
        npm run dev
        ```
    *(Aplicación disponible en el navegador, generalmente en `http://localhost:5173`)*

### 4.5. Rutas Clave
| Ruta | Propósito |
| :--- | :--- |
| `/` | Catálogo de Productos (Home). |
| `/product/:id` | Visualización del Detalle completo de un producto. |
| `/cart` | Vista de manipulación del Carrito de Compras. |
| `/create` | Formulario para Alta de un nuevo producto. |
| `/edit/:id` | Formulario para Edición y Eliminación. |


## Organizacion de directorios del programa
mercapp/
├── backend/ # Servidor (Node.js/Express)
│ ├── config/ # Configuración de DB.
│ ├── controllers/ # Lógica de la API (CRUD, Funciones).
│ ├── models/ # Esquemas de Mongoose (Product.js, Category.js).
│ ├── routes/ # Rutas de la API (productRoutes.js).
│ ├── seed.js # Script para inicialización de la DB (Idempotencia).
│ └── server.js # Punto de entrada del servidor.
│
└── frontend/ # Cliente (Vue 3/Vite SPA)
├── public/ # Assets estáticos.
└── src/
├── assets/ # Estilos y recursos gráficos.
├── components/ # Componentes reutilizables (ProductCard.vue).
├── composables/ # Lógica de estado compartido (useCart.js, useApi.js).
├── router/ # Configuración de Vue Router (Lazy Loading).
├── views/ # Vistas/Páginas completas (HomeView.vue, CartView.vue).
└── main.js # Punto de entrada de la aplicación Vue.
