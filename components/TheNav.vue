<template>
    <header ref="header" class="fixed top-0 left-0">
        <div class="container flex justify-between items-start">
            <div class="header-name" ref="headerName">
                <NuxtImg src="/Rhys.svg" />
            </div>

            <ul ref="menuItems" class="hidden md:block">
                <li>About</li>
                <li>Projects</li>
                <li>Contact</li>
            </ul>
        </div>
    </header>
    <HamburgerMenu />
</template>

<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

const header: Ref<HTMLElement | undefined> = ref()
const headerName: Ref<HTMLDivElement | undefined> = ref()
const menuItems: Ref<HTMLUListElement | undefined> = ref()

const initNavAnim = () => {
    if (!headerName.value) return

    const tl = gsap.timeline()

    tl.to(headerName.value, {
        duration: 1,
        ease: 'power4.out',
        autoAlpha: 1,
        delay: 0.75
    })

    tl.to(headerName.value, {
        duration: 0.5,
        ease: 'power4.out',
        width: 100,
        scrollTrigger: {
            scrub: true
        }
    })

    if (!menuItems.value) return

    tl.to(menuItems.value, {
        duration: 1,
        autoAlpha: 1,
        ease: 'power3.inOut',
        x: 0
    })
}

onMounted(() => {
    initNavAnim()
})
</script>

<style lang="scss">
header {
    z-index: 100;
    min-height: 100px;
    width: 100%;

    position: relative;

    padding: 2rem 0;

    mix-blend-mode: difference;

    ul {
        opacity: 0;
        transform: translateX(100%);

        li {
            font-size: 24px;
        }
    }

    li,
    p {
        color: $neutral-light;
    }

    .header-name {
        height: fit-content;
        max-width: 200px;

        opacity: 0;

        transform: translateY(0);
        overflow: hidden;

        @screen lg {
            max-width: 300px;
        }

        img {
            height: auto !important;
        }
    }
}
</style>
