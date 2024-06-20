import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src",
      "source-map-js": "source-map"
     }
    ],
  },

  extensions: ['.js', '.jsx', '.json'],

});
