 import axios from 'axios';

    // Vite secara otomatis menyediakan import.meta.env.PROD
    // Ini akan bernilai true di production build (Vercel) dan false di development (lokal)
    const isProduction = import.meta.env.PROD;

    const api = axios.create({
      // Jika di production, gunakan URL API lengkap.
      // Jika di development (lokal), gunakan proxy '/api'.
      baseURL: isProduction
        ? import.meta.env.VITE_API_BASE_URL // Menggunakan variabel lingkungan yang sudah diatur di Vercel
        : '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    export const getIdeas = async (params) => {
      try {
        const response = await api.get('/ideas', { params });
        return response.data;
      } catch (error) {
        console.error('Error fetching ideas:', error);
        throw error;
      }
    };

    export default api;
    