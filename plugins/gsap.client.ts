import { gsap } from 'gsap'
import { CustomEase, ScrollTrigger, SplitText } from 'gsap/all'

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        gsap.registerPlugin(CustomEase)
        gsap.registerPlugin(ScrollTrigger)
        gsap.registerPlugin(SplitText)
    }

    return {
        provide: {
            gsap,
            CustomEase,
            ScrollTrigger,
            SplitText
        }
    }
})
