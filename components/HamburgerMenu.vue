<template>
    <svg
        ref="hamburger"
        class="mobile-menu menu-rotate menu-bar md:hidden"
        viewBox="0 0 100 100"
        width="80"
        height="80"
        preserveAspectRatio="none"
        @click="handleClick"
    >
        <path
            class="line top"
            d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
        />
        <path class="line middle" d="m 30,50 h 40" />
        <path
            class="line bottom"
            d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
        />
    </svg>

    <div ref="menuOverlay" class="menu-overlay hidden">
        <ul ref="overlayItems" class="text-white">
            <li class="overlay-item">
                <a href="#" @click="handleClick"><span>01.</span> About</a>
            </li>
            <li class="overlay-item">
                <a href="#" @click="handleClick"><span>02.</span> Projects</a>
            </li>
            <li class="overlay-item">
                <a href="#" @click="handleClick"><span>03.</span> Contact</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
const { $gsap: gsap } = useNuxtApp()

const hamburger: Ref<SVGElement | undefined> = ref()
const menuOverlay: Ref<HTMLDivElement | undefined> = ref()
const overlayItems: Ref<HTMLUListElement | undefined> = ref()

const handleClick = () => {
    hamburger.value?.classList.toggle('active')
    menuOverlay.value?.classList.toggle('hidden')
    menuOverlay.value?.classList.toggle('show')

    if (!overlayItems.value) return

    const listItemArray: HTMLLIElement[] = gsap.utils.toArray(overlayItems.value.childNodes)

    let animDelay = 0

    listItemArray.forEach((el: HTMLLIElement) => {
        gsap.fromTo(
            el,
            {
                opacity: 0,
                duration: 1,
                x: 100,
            },
            {
                opacity: 1,
                x: 0,
                delay: animDelay,
                ease: 'power2'
            }
        )

        animDelay += 0.2
    })
}

const initHamburgerAnim = () => {
    if (!hamburger.value) return

    gsap.to(hamburger.value, {
        duration: 1,
        ease: 'power4.out',
        autoAlpha: 1,
        delay: 0.75
    })

    gsap.to(hamburger.value, {
        duration: 0.5,
        ease: 'power4.out',
        marginTop: 14,
        scrollTrigger: {
            scrub: true
        }
    })
}

onMounted(() => {
    initHamburgerAnim()
})
</script>

<style lang="scss">
.menu-overlay {
    z-index: 5000;
    height: 100vh;
    width: 100vw;
    background-color: $neutral-dark;
    position: fixed;
    top: 0;
    left: 0;

    ul {
        margin: auto auto auto auto;
        font-size: 3rem;
        color: $neutral-light;
        line-height: 2;

        span {
            font-weight: 200;
            font-size: 2rem;
        }
    }
}

.show {
    display: flex;
}

.mobile-menu {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: transform 400ms;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: fixed;
    right: 0;
    top: 0;
    margin-top: 32px;
    z-index: 1000000;
    mix-blend-mode: difference;
    opacity: 0;
}

.menu-rotate.active {
    transform: rotate(45deg);
}

.menu-rotate180.active {
    transform: rotate(180deg);
}

.line {
    fill: none;
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
    stroke: $neutral-light;
    stroke-width: 5.5;
    stroke-linecap: round;
}

.menu-bar .top {
    stroke-dasharray: 40 139;
}

.menu-bar .bottom {
    stroke-dasharray: 40 180;
}

.menu-bar.active .top {
    stroke-dashoffset: -98px;
}

.menu-bar.active .bottom {
    stroke-dashoffset: -138px;
}

.menu-bar.active .line {
    stroke: $neutral-light;
}
</style>
