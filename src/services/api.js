    import axios from 'axios';

    // Konfigurasi Axios instance
    const api = axios.create({
      // baseURL harus mengarah ke path proxy lokal Anda
      // Permintaan ke '/api' akan ditangani oleh proxy Vite
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Anda bisa menambahkan interceptors di sini jika perlu (misalnya untuk error handling)

    export const getIdeas = async (params) => {
      try {
        // Pemanggilan ini akan menjadi GET /api/ideas
        // Vite proxy akan meneruskannya ke https://suitmedia-backend.suitdev.com/api/ideas
        const response = await api.get('/ideas', { params });
        return response.data;
      } catch (error) {
        console.error('Error fetching ideas:', error);
        throw error;
      }
    };

    export default api;
    