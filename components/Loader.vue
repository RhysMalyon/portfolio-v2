<template>
    <div v-if="isLoading" class="loader--text">
        <div class="quote" ref="loaderText">Loading...</div>
    </div>
    <div v-if="isLoading" class="loader place-content-center" ref="loader">
        <div class="loader--column"></div>
        <div class="loader--column"></div>
        <div class="loader--column"></div>
    </div>
</template>

<script setup lang="ts">
const { $gsap: gsap, $CustomEase: CustomEase, $SplitText: SplitText } = useNuxtApp()

const loaderText = ref()
const loader: Ref<HTMLDivElement | null> = ref(null)

let isLoading = ref(true)

let ctx: gsap.Context

const initLoadingAnim = () => {
    ctx = gsap.context((self) => {
        const tl = gsap.timeline()

        if (!loaderText.value) return

        loaderText.value.split = new SplitText(loaderText.value, {
            type: 'lines,words,chars',
            linesClass: 'split-line'
        })

        tl.to(loaderText.value.split.chars, {
            keyframes: [
                {
                    y: -5,
                    duration: 1.5
                },
                {
                    y: 0,
                    duration: 1.5
                }
            ],
            stagger: 0.1,
            ease: 'power4.out'
        })

        tl.to(loaderText.value.split.chars, {
            delay: 0.5,
            duration: 1.5,
            ease: 'power4.out',
            y: 100,
            stagger: 0.02
        })

        if (!self.selector) return
        const columns = self.selector('.loader--column')

        columns.forEach((column: HTMLDivElement) => {
            tl.to(
                column,
                {
                    y: '100%',
                    duration: 0.5,
                    ease: CustomEase.create(
                        'custom',
                        'M0,0 C0.266,0.412 0.143,0.421 0.272,0.542 0.316,0.583 0.78,1 1,1 '
                    )
                },
                '-=0.25'
            )
        })

        tl.eventCallback('onComplete', () => {
            isLoading.value = false
        })
    }, loader.value as HTMLDivElement)
}

onMounted(() => {
    if (!import.meta.env.SSR) {
        window.addEventListener('load', initLoadingAnim)
    }
})

onUnmounted(() => {
    ctx.revert()
})
</script>

<style lang="scss">
.loader {
    height: 100vh;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    overflow: hidden;

    @supports (height: 100lvh) {
        height: 100lvh;
    }

    &--text {
        height: fit-content;
        z-index: 1000;

        position: absolute;
        top: 50%;
        left: 50%;

        transform: translateX(-50%) translateY(-50%);
        -webkit-transform: translateX(-50%) translateY(-50%);
        -moz-transform: translateX(-50%) translateY(-50%);
        -o-transform: translateX(-50%) translateY(-50%);
        transform: translateX(-50%) translateY(-50%);

        font-size: calc(1rem * (1.618 * 3));
        color: #fff;

        overflow: hidden;
    }

    &--column {
        width: calc(100vw / 3);
        height: 100%;

        background: #ff5200;
    }
}

.quote {
    width: 100vw;

    margin-top: 0px;

    font-family: 'PTSerif', serif;
    font-size: 60px;
    text-align: center;
    line-height: 76px;

    overflow: hidden;
}

.split-line {
    overflow: hidden;
}
</style>
