import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),

		VitePWA({
			registerType: "autoUpdate",

			includeAssets: ["qtracker.svg"],

			// https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html#web-app-manifest
			manifest: {
				name: "qTracker",
				short_name: "qTracker",
				description:
					"Simple app for tracking various types of discomfort, including headaches and other issues",

				// Also set in index.html
				theme_color: "#eeeeee",
				background_color: "#eeeeee",

				icons: [
					{
						src: "qtracker.svg",
						sizes: "any",
						type: "image/svg+xml",
					},
				],
			},
		}),
	],
});
