document.addEventListener("DOMContentLoaded", () => {
    const page = document.querySelector(".contact-page");
    if (!page) return;

    /* ================================
       ACTIVE NAV
    ================================= */

    const currentPage = "contact.html";

    document.querySelectorAll(".site-nav a").forEach(link => {
        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }
    });


    /* ================================
       HERO ENTRANCE
    ================================= */

    const heroItems = page.querySelectorAll(
        ".contact-hero-copy > *, .contact-object, .contact-hero-bottom"
    );

    heroItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(24px)";

        setTimeout(() => {
            item.style.transition =
                "opacity 700ms ease, transform 700ms cubic-bezier(.2,.7,.2,1)";

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 120 + index * 100);
    });


    /* ================================
       HERO OBJECT PARALLAX
    ================================= */

    const contactObject = page.querySelector(".contact-object");

    if (contactObject && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        page.addEventListener("pointermove", event => {
            const rect = page.getBoundingClientRect();

            const x = (event.clientX / window.innerWidth - 0.5) * 2;
            const y = (event.clientY / window.innerHeight - 0.5) * 2;

            contactObject.style.transform =
                `translate(${x * 10}px, ${y * 10}px)`;
        });
    }


    /* ================================
       ORBIT ROTATION
    ================================= */

    const orbit = page.querySelector(".contact-orbit");

    if (
        orbit &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        let rotation = 0;

        const rotateOrbit = () => {
            rotation += 0.08;
            orbit.style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(rotateOrbit);
        };

        requestAnimationFrame(rotateOrbit);
    }


    /* ================================
       SCROLL REVEAL
    ================================= */

    const revealItems = page.querySelectorAll(
        ".contact-section, .contact-detail-panel, .contact-form-panel, .network-link, .contact-final-content"
    );

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!reducedMotion) {
        revealItems.forEach(item => {
            item.classList.add("contact-motion-ready");
        });

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("contact-motion-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealItems.forEach(item => observer.observe(item));
    }


    /* ================================
       NETWORK LINK HOVER
    ================================= */

    page.querySelectorAll(".network-link").forEach(link => {
        const arrow = link.querySelector(".network-arrow");

        if (!arrow) return;

        link.addEventListener("mouseenter", () => {
            arrow.style.transform = "translate(5px, -5px)";
        });

        link.addEventListener("mouseleave", () => {
            arrow.style.transform = "translate(0, 0)";
        });
    });



    /* ================================
       SMOOTH INTERNAL LINKS
    ================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* ================================
       REDUCED MOTION
    ================================= */

    if (reducedMotion) {
        heroItems.forEach(item => {
            item.style.opacity = "1";
            item.style.transform = "none";
            item.style.transition = "none";
        });
    }
});