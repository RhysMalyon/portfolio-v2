// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
    routeRules: {
        '/': { prerender: true },
    },
    build: {
        transpile: ['gsap']
    },
    runtimeConfig: {
        gsapToken: process.env.NUXT_GSAP_TOKEN
    },
    typescript: {
        strict: true
    },
    image: {
        dir: 'public'
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@import "~/assets/css/main.scss";'
                }
            }
        }
    }
})
