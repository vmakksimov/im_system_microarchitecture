import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import dotenv from 'dotenv';

// Load .env variables
dotenv.config();

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env': process.env
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      
     
    ],
  },
  server: {
    host: '0.0.0.0',  // Bind to all network interfaces
    port: 5173,        // Ensure this port is exposed in the container
  }

  

});
