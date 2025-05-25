import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// path modülü 
import path from "path";

// export edilen yapı içindeki alias 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
