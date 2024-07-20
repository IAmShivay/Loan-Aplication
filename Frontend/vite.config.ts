import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // This exposes the server to the network
    port: 5173,  // You can specify a port, default is 5173
  },
});
