document.addEventListener('DOMContentLoaded', () => {


    const navbar = document.querySelector('.premium-navbar');
    const searchInput = document.querySelector('.unique-search');

    const updateStickyOffset = () => {
        const topNav = document.querySelector('.navbar-top');
        if (!topNav || !navbar) return;

        if (window.innerWidth >= 992) {
            // Push header up by the height of the top navigation + top padding
            const style = window.getComputedStyle(navbar);
            const pt = parseFloat(style.paddingTop) || 0;
            navbar.style.top = `-${topNav.offsetHeight + pt}px`;
        } else {
            // On mobile, the button is in the top nav, so we keep the whole header visible
            navbar.style.top = '0px';
        }
    };

    window.addEventListener('resize', updateStickyOffset);
    // Initialize offset
    setTimeout(updateStickyOffset, 100);

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = '0.5rem 2rem';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
        updateStickyOffset();
    });

    // Search bar focus interaction
    searchInput.addEventListener('focus', () => {
        console.log('Search focused - implementing any specific active states if needed');
    });

    // popular course swiper js
    new Swiper('.hc-swiper', {
        speed: 400,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
        },
        effect: "coverflow",
        grabCursor: true,
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
    })

    // GSAP Horizontal Scroll Logic
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    mm.add("(min-width: 992px)", () => {
        // Only apply horizontal scroll on larger screens
        const horizontalSections = gsap.utils.toArray('.horizontal-scroll-container');

        horizontalSections.forEach((sec) => {
            // Get all items within the container
            const items = sec.querySelectorAll('.horizontal-scroll-item');

            gsap.to(sec, {
                x: () => -(sec.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: ".horizontal-scroll-wrapper",
                    pin: true,
                    scrub: 1,
                    snap: {
                        snapTo: 1 / (items.length - 1),
                        duration: {
                            min: 0.2,
                            max: 0.8
                        },
                        ease: "power1.inOut"
                    },
                    // Scroll distance proportional to the width to scroll
                    end: () => "+=" + (sec.scrollWidth - window.innerWidth)
                }
            });
        });

        return () => {
            // Optional cleanup if necessary when matching media query fails
        };
    });


    // Animate Learning Methods Spread Flow
    const learningSect = document.querySelector('.learning-methods-section');
    if (learningSect) {
        // Title Animation
        gsap.from(learningSect.querySelectorAll('h2, .badge-premium-modern, p.fs-5'), {
            scrollTrigger: {
                trigger: learningSect,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
        });

        // Cards and Chevrons Animation
        const flowCards = learningSect.querySelectorAll('.flow-col');
        gsap.from(flowCards, {
            scrollTrigger: {
                trigger: learningSect,
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)"
        });
    }

    // Animate "How to Apply" Timeline Steps
    const applySect = document.querySelector('.apply-docs-section');
    if (applySect) {
        const timelineSteps = applySect.querySelectorAll('.timeline-step');
        gsap.from(timelineSteps, {
            scrollTrigger: {
                trigger: applySect.querySelector('.apply-timeline'),
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out"
        });

        // Optional: Animate the accordion items on the right side too!
        const accordionItems = applySect.querySelectorAll('.accordion-item');
        if (accordionItems.length > 0) {
            gsap.from(accordionItems, {
                scrollTrigger: {
                    trigger: applySect.querySelector('.required-docs-accordion'),
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
    }

    // Initialize Reviews Swiper
    const reviewsSwiperElement = document.querySelector('.reviewsSwiper');
    if (reviewsSwiperElement) {
        new Swiper('.reviewsSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            grabCursor: true,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
            }
        });

        // GSAP animation for Reviews section entering
        const reviewsSect = document.querySelector('.reviews-section');
        if (reviewsSect) {
            gsap.from(reviewsSect.querySelectorAll('.swiper-slide'), {
                scrollTrigger: {
                    trigger: reviewsSect,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });
        }
    }

});