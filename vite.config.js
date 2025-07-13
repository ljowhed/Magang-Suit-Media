import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Memuat variabel lingkungan dari file .env
  const env = loadEnv(mode, process.cwd(), '');

  // --- DEBUGGING: Pastikan variabel lingkungan terbaca ---
  console.log('--- Vite Config Debug ---');
  console.log('Current Mode:', mode);
  console.log('VITE_API_BASE_URL from .env (new):', env.VITE_API_BASE_URL);
  console.log('-------------------------');
  // --- END DEBUGGING ---

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': { // Ini adalah path yang akan Anda panggil dari frontend (e.g., /api/ideas)
          target: env.VITE_API_BASE_URL, // Target sebenarnya: https://suitmedia-backend.suitdev.com
          changeOrigin: true, // Penting untuk mengubah header Origin
          // Aturan rewrite:
          // Jika frontend memanggil: http://localhost:5173/api/ideas
          // `path.replace(/^\/api/, '')` akan mengubahnya menjadi `/ideas`
          // Lalu kita tambahkan `/api` di depannya, sehingga menjadi `/api/ideas`
          // Ini memastikan URL yang dikirim ke backend adalah https://suitmedia-backend.suitdev.com/api/ideas
          rewrite: (path) => `/api${path.replace(/^\/api/, '')}`,
          // Menambahkan header secara eksplisit di proxy
          headers: {
            'Content-Type': 'application/json',
          },
        },
      },
    },
  };
});
