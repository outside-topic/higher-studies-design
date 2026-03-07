
document.addEventListener('DOMContentLoaded', () => {
    

    const navbar = document.querySelector('.premium-navbar');
    const searchInput = document.querySelector('.unique-search');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 2rem';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.padding = '1rem 2rem';
            navbar.style.background = 'var(--white)';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Search bar focus interaction
    searchInput.addEventListener('focus', () => {
        console.log('Search focused - implementing any specific active states if needed');
    });

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
                        duration: { min: 0.2, max: 0.8 },
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
    
});
