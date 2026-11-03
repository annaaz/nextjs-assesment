import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: { "@": path.resolve(__dirname, ".") },
        dedupe: ["react", "react-dom"],
    },
    test: {
        environment: "jsdom",
        globals: true,
        server: {
            deps: {
                inline: [/@testing-library/, "react", "react-dom"],
            },
        },
    },
});
