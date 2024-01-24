// 首頁視差 ----------------------------------------------------------------------------------------------
const scene = document.querySelector('#scene')
var parallaxInstance = new Parallax(scene, {
  // 位移量
  scalarX: 5,
  scalarY: 6,

  // 摩擦力
  frictionX: 0.1,
  frictionY: 0.1
})

// title
gsap.set('.title', {
  perspective: 300 // 透視效果
})

const t1 = gsap.timeline({
  repeatDelay: 0
})

let staggerTime = 1

t1.from('.title', {
  y: 60,
  rotationX: -90,
  autoAlpha: 0,
  stagger: staggerTime
})

// swiper----------------------------------------------------------------------------------------------
new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  speed: 1000,
  spaceBetween: 15,
  centeredSlide: true,
  effect: 'coverflow',
  slidesPerView: 1,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  breakpoints: {
    576: {
      slidesPerView: 3
    },
    786: {
      slidesPerView: 3
    },
    920: {
      slidesPerView: 4
    },
    1200: {
      slidesPerView: 4
    }
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next'
  }
})

// swiper gsap
gsap.registerPlugin(ScrollTrigger)

const tl3 = gsap.timeline({
  paused: true
})

tl3.from('.swiper', { yPercent: 100, opacity: 0 })

tl3.to('.swiper', {
  yPercent: 0,
  opacity: 1,
  duration: 1.5,
  ease: 'power2.inOut'
})

gsap.to('.swiper', {
  scrollTrigger: {
    trigger: '#section02',
    start: '40% center',
    end: '40% center',
    scrub: true,
    onEnter: () => tl3.play()
    // markers: true
  }
})

// service ----------------------------------------------------------------------------------------------------
const services = document.querySelectorAll('.service')

services.forEach((service) => {
  gsap.fromTo(
    service,
    {
      opacity: 0,
      rotation: 90
    },
    {
      scrollTrigger: {
        trigger: '#section03',
        start: '25% center',
        end: '25% center',
        // markers: true,
        onEnter: () => gsap.to(service, { opacity: 1, rotation: 0, duration: 1, ease: 'power2.inOut' })
      },
      opacity: 1,
      rotation: 0,
      duration: 1,
      ease: 'power2.inOut'
    }
  )
})

// 大螢幕時自動換頁 ----------------------------------------------------------------------------------------------
document.addEventListener('wheel', function (event) {
  // 检查当前窗口宽度是否小于 800px
  if (window.innerWidth >= 800) {
    // 获取当前窗口的垂直滚动位置
    const currentScroll = window.scrollY

    // 计算下一个目标位置（100vh的倍数）
    let nextScroll
    if (event.deltaY > 0) {
      // 向下滚动
      nextScroll = Math.ceil(currentScroll / window.innerHeight) * window.innerHeight
    } else {
      // 向上滚动
      nextScroll = Math.floor(currentScroll / window.innerHeight) * window.innerHeight
    }

    // 使用 window.scrollTo 将页面滑动到下一个目标位置
    window.scrollTo({
      top: nextScroll,
      behavior: 'smooth' // 使用平滑的滑动效果
    })

    // 防止事件继续传播（停止滚动）
    event.preventDefault()
  }
})
