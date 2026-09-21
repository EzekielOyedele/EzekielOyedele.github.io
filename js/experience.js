document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       EXPERIENCE PAGE INTERACTIONS
    ====================================================== */

    const page = document.querySelector(".experience-page");

    if (!page) return;


    /* =====================================================
       1. SCROLL REVEALS
       Content remains visible if JS fails.
    ====================================================== */

    const revealElements = page.querySelectorAll(
        ".experience-intro-heading, " +
        ".experience-intro-copy, " +
        ".experience-card, " +
        ".lesson-card, " +
        ".direction-content, " +
        ".experience-final-content"
    );

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {

        revealElements.forEach((element) => {
            element.classList.add("exp-motion-ready");
        });

        const revealObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "exp-motion-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    }


    /* =====================================================
       2. EXPERIENCE TIMELINE
    ====================================================== */

    const experienceCards =
        page.querySelectorAll(".experience-card");

    const timelineCurrent =
        page.querySelector("#timelineCurrent");

    const timelineProgress =
        page.querySelector(".timeline-line-progress");

    if (
        experienceCards.length &&
        "IntersectionObserver" in window
    ) {

        const timelineObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;

                        experienceCards.forEach((card) => {
                            card.classList.remove("is-active");
                        });

                        entry.target.classList.add("is-active");

                        const index =
                            Number(
                                entry.target.dataset.experience
                            );

                        if (timelineCurrent) {
                            timelineCurrent.textContent =
                                String(index).padStart(2, "0");
                        }

                        if (timelineProgress) {

                            const progress =
                                (index /
                                    experienceCards.length) *
                                100;

                            timelineProgress.style.height =
                                `${progress}%`;
                        }

                    });

                },
                {
                    threshold: 0.45
                }
            );

        experienceCards.forEach((card) => {
            timelineObserver.observe(card);
        });
    }


    /* =====================================================
       3. CARD HOVER DEPTH
    ====================================================== */

    experienceCards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {
                return;
            }

            const rect =
                card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            const rotateX = y * -1.8;
            const rotateY = x * 2.2;

            card.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       4. HERO ORBIT PARALLAX
    ====================================================== */

    const orbit =
        page.querySelector(".experience-orbit");

    const orbitCenter =
        page.querySelector(".orbit-center");

    if (
        orbit &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        orbit.addEventListener("mousemove", (event) => {

            const rect =
                orbit.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) /
                rect.width -
                0.5;

            const y =
                (event.clientY - rect.top) /
                rect.height -
                0.5;

            if (orbitCenter) {

                orbitCenter.style.transform =
                    `translate(
                        ${x * 10}px,
                        ${y * 10}px
                    )
                    rotate(-8deg)`;
            }

            const dots =
                orbit.querySelectorAll(".orbit-dot");

            dots.forEach((dot, index) => {

                const multiplier =
                    (index + 1) * 5;

                dot.style.transform =
                    `translate(
                        ${x * multiplier}px,
                        ${y * multiplier}px
                    )`;
            });

        });

        orbit.addEventListener("mouseleave", () => {

            if (orbitCenter) {
                orbitCenter.style.transform =
                    "translate(0, 0) rotate(-8deg)";
            }

            const dots =
                orbit.querySelectorAll(".orbit-dot");

            dots.forEach((dot) => {
                dot.style.transform =
                    "translate(0, 0)";
            });

        });

    }


    /* =====================================================
       5. LESSON CARD INTERACTION
    ====================================================== */

    const lessonCards =
        page.querySelectorAll(".lesson-card");

    lessonCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            lessonCards.forEach((otherCard) => {

                if (otherCard !== card) {
                    otherCard.style.opacity = "0.55";
                }

            });

        });

        card.addEventListener("mouseleave", () => {

            lessonCards.forEach((otherCard) => {
                otherCard.style.opacity = "";
            });

        });

    });


    /* =====================================================
       6. DIRECTION TOOL MICRO-INTERACTION
    ====================================================== */

    const directionTools =
        page.querySelectorAll(".direction-tool");

    directionTools.forEach((tool) => {

        tool.addEventListener("mouseenter", () => {

            const number =
                tool.querySelector("span");

            if (number) {
                number.style.transform =
                    "translateX(5px)";
            }

        });

        tool.addEventListener("mouseleave", () => {

            const number =
                tool.querySelector("span");

            if (number) {
                number.style.transform =
                    "";
            }

        });

    });


    /* =====================================================
       7. HERO MOUSE MOVEMENT
    ====================================================== */

    const hero =
        page.querySelector(".experience-hero");

    const heroCopy =
        page.querySelector(".experience-hero-copy");

    if (
        hero &&
        heroCopy &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        hero.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5);

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5);

            heroCopy.style.transform =
                `translate(
                    ${x * -5}px,
                    ${y * -3}px
                )`;
        });

        hero.addEventListener("mouseleave", () => {

            heroCopy.style.transform =
                "translate(0, 0)";
        });

    }


    /* =====================================================
       8. SMOOTH INTERNAL NAVIGATION
    ====================================================== */

    const internalLinks =
        page.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       9. DIRECTION TOOL TEXT MOTION
    ====================================================== */

    directionTools.forEach((tool) => {

        const number =
            tool.querySelector("span");

        if (number) {

            number.style.transition =
                "transform .3s ease";
        }

    });


    /* =====================================================
       10. HERO INTRO SEQUENCE
    ====================================================== */

    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const heroElements = [
            page.querySelector(".experience-hero-meta"),
            page.querySelector(".experience-eyebrow"),
            page.querySelector(".experience-hero h1"),
            page.querySelector(".experience-hero-description"),
            page.querySelector(".hero-scroll-button")
        ];

        heroElements.forEach((element, index) => {

            if (!element) return;

            element.style.opacity = "0";
            element.style.transform =
                "translateY(22px)";

            element.style.transition =
                `opacity .8s ease ${index * 100}ms,
                 transform .9s cubic-bezier(.16,1,.3,1)
                 ${index * 100}ms`;

            requestAnimationFrame(() => {

                setTimeout(() => {

                    element.style.opacity = "1";
                    element.style.transform =
                        "translateY(0)";

                }, 120);

            });

        });

    }

});