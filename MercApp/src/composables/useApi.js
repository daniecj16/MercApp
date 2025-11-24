import { ref } from 'vue';

// URL base de tu API REST del backend (Asegúrate de que el puerto sea correcto)
const API_BASE_URL = 'http://localhost:3000/api'; 

/**
 * Composable genérico para realizar peticiones HTTP a la API.
 * @param {string} endpoint - La ruta específica de la API (ej: '/products').
 * @returns {object} Un objeto con estados reactivos y la función para hacer la petición.
 */
export function useApi(endpoint) {
  // Tarea 8: Estados reactivos
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /**
   * Ejecuta la petición GET o cualquier otra petición HTTP.
   * @param {object} options - Opciones adicionales para la petición (method, headers, body, etc.).
   */
  const fetchData = async (options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const response = await fetch(url, options);

      // Manejo de errores HTTP (4xx, 5xx)
      if (!response.ok) {
        let errorMsg = `HTTP Error: ${response.status} ${response.statusText}`;
        try {
            // Intentar leer el mensaje de error del cuerpo de la respuesta del backend
            const errorBody = await response.json();
            if (errorBody && errorBody.msg) {
                errorMsg = errorBody.msg;
            }
        } catch (e) {
            // Si no es JSON, usamos el error genérico
        }
        throw new Error(errorMsg);
      }

      // El backend devuelve JSON, lo parseamos
      const result = await response.json();
      data.value = result;

    } catch (err) {
      console.error("Fetch API Error:", err);
      error.value = err.message || 'Error de red desconocido.';
      data.value = null; // Limpiar datos en caso de error
    } finally {
      loading.value = false;
    }
  };

  // Tarea 8: Retornar los estados reactivos y la función de fetching
  return {
    data,
    loading,
    error,
    fetchData
  };
}