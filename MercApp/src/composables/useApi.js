import { ref } from 'vue';

// URL base de tu API REST del backend
const API_URL = import.meta.env.VITE_API_URL;

export function useApi(endpoint) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const fetchData = async (options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const url = `${API_URL}${endpoint}`;   // ✔ CORREGIDO

      const response = await fetch(url, options);

      if (!response.ok) {
        let errorMsg = `HTTP Error: ${response.status} ${response.statusText}`;
        try {
          const errorBody = await response.json();
          if (errorBody && errorBody.msg) {
            errorMsg = errorBody.msg;
          }
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const result = await response.json();
      data.value = result;

    } catch (err) {
      console.error("Fetch API Error:", err);
      error.value = err.message || 'Error de red desconocido.';
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, fetchData };
}
