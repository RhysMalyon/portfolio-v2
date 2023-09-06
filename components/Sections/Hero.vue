<template>
    <div ref="hero" class="hero relative">
        <div class="container">
            <p
                ref="heroTitle"
                class="hero--title opacity-0 text-3xl md:text-4xl lg:text-5xl xl:text-6xl translate-x-4 translate-y-4"
            >
                Front End Developer
                <span ref="heroTitleSecondary" class="opacity-0 translate-x-6">
                    based in Tokyo, Japan.
                </span>
            </p>
        </div>

        <div ref="heroImage" class="px-8">
            <NuxtImg src="/hero-image.jpg" sizes="sm:100vw md:100vw lg:100vw xl:100vw" />
        </div>

        <div class="container">
            <!-- <div class="mt-8">
              <p ref="heroSubtitle" class="text-2xl mt-4 opacity-0">
                  Currently creating/fine-tuning websites and tweaking APIs at
                  <a
                      class="underline hover:text-[#0055FF]"
                      href="https://www.housingjapan.com"
                      target="_blank"
                  >
                      Housing Japan
                  </a>
                  .
              </p>
          </div> -->

            <div ref="scrollIndicator" class="mouse">
                <div class="scroll-wheel"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

const heroImage: Ref<HTMLDivElement | undefined> = ref()
const heroTitle: Ref<HTMLDivElement | undefined> = ref()
const heroTitleSecondary: Ref<HTMLSpanElement | undefined> = ref()
const heroSubtitle: Ref<HTMLParagraphElement | undefined> = ref()
const scrollIndicator: Ref<HTMLDivElement | undefined> = ref()

const initImgAnim = (topMargin: number, timeline: GSAPTimeline) => {
    timeline.to(heroImage.value as HTMLDivElement, {
        height: '60vh',
        duration: 2,
        ease: 'power3.inOut',
        marginTop: topMargin
    })

    timeline.to(
        heroTitle.value as HTMLDivElement,
        {
            autoAlpha: 1,
            x: 0,
            y: 0,
            ease: 'power3.inOut',
            duration: 1
        },
        '-=0.25'
    )

    timeline.to(heroTitleSecondary.value as HTMLSpanElement, {
        autoAlpha: 1,
        x: 0,
        ease: 'power3.inOut',
        duration: 1
    })

    timeline.to(
        heroSubtitle.value as HTMLParagraphElement,
        {
            autoAlpha: 1,
            x: 0,
            ease: 'power3.inOut',
            duration: 1
        },
        '-=1'
    )

    gsap.fromTo(
        scrollIndicator.value as HTMLDivElement,
        {
            y: 0,
            autoAlpha: 1
        },
        {
            keyframes: {
                y: [0, 20, 0],
                autoAlpha: [1, 0.5, 1]
            },
            duration: 3,
            repeat: -1
        }
    )
}

onMounted(() => {
    const smBreakpoint = 640

    const smMargin = 16
    const lgMargin = 32

    const tl = gsap.timeline()
    let mm = gsap.matchMedia()

    mm.add(`(max-width: ${smBreakpoint}px)`, () => {
        initImgAnim(smMargin, tl)
    })

    mm.add(`(min-width: ${smBreakpoint}px)`, () => {
        initImgAnim(lgMargin, tl)
    })
})
</script>

<style lang="scss">
.hero {
    margin-top: 184px;

    @screen md {
        margin-top: 224px;
    }

    img {
        height: 100%;
        width: 100%;

        z-index: 5;

        padding: 2rem 0;

        object-fit: cover;
        object-position: 50% 20%;
    }

    &--title {
        span {
            font-weight: 200;
        }
    }
}

.mouse {
    height: 60px;
    width: 32px;

    position: relative;

    border: 2px solid $neutral-dark;
    border-radius: 32px;

    margin: 2rem auto;

    .scroll-wheel {
        height: 20px;
        width: 2px;

        position: absolute;
        top: 10px;
        left: 0;
        right: 0;

        background: $neutral-dark;
        border-radius: 1px;

        margin: 0 auto;

        transform: scaleY(0);
        animation: scroll 3s linear infinite;
    }
}

@keyframes scroll {
    0% {
        transform: scaleY(0);
        transform-origin: top;
    }
    25% {
        transform: scaleY(1);
        transform-origin: top;
    }
    26% {
        transform-origin: bottom;
    }
    50% {
        transform: scaleY(0);
        transform-origin: bottom;
    }
    100% {
        transform: scaleY(0);
        transform-origin: bottom;
    }
}
</style>
