// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  vite: {
    server: {
      hmr: {
        overlay: false,
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/css/global.scss" as *;
          
          `,
        },
      },
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: "./tailwind.config.js",
  },
});
