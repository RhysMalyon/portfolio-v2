// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
    routeRules: {
        '/': { prerender: true },
        '/admin/**': { ssr: false }
    },
    build: {
        transpile: ['gsap']
    },
    css: [
        "~/assets/css/main.scss"
    ],
    runtimeConfig: {
        gsapToken: process.env.NUXT_GSAP_TOKEN
    },
    typescript: {
        strict: true
    },
    image: {
        dir: 'public'
    }
})
