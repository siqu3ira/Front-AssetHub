import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Caminho base (deixe como '/' se estiver implantando na raiz)
  server: {
    host: '0.0.0.0', // Escutar em todas as interfaces de rede
  },
  build: {
    outDir: 'dist', // Diretório de saída para o build (padrão do Vite)
  },
});
