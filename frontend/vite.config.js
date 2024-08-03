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
  build: {
    // Base path for deployment if your app is served from a subpath or domain
    // Example: If your app is served from `https://example.com/myapp/`, set base to '/myapp/'
    base: '/',
  },
  server: {
    // Server settings for development
    host: '0.0.0.0', // Bind to all network interfaces
    port: 5173, // Port for development server
  },
});
