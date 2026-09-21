/* =========================================================
   CERTIFICATIONS PAGE
   Ezekiel Oyedele — Data Analyst
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".certifications-page");

    if (!page) return;


    /* =====================================================
       HERO ORBIT MOTION
    ====================================================== */

    const credentialObject = page.querySelector(".credential-object");

    if (credentialObject) {

        const rings = credentialObject.querySelectorAll(
            ".credential-ring"
        );

        const dots = credentialObject.querySelectorAll(
            ".credential-dot"
        );

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;

        let animationFrame;


        const animateOrbit = () => {

            currentX += (targetX - currentX) * 0.06;
            currentY += (targetY - currentY) * 0.06;

            rings.forEach((ring, index) => {

                const multiplier = (index + 1) * 0.55;

                ring.style.transform = `
                    translate3d(
                        ${currentX * multiplier}px,
                        ${currentY * multiplier}px,
                        0
                    )
                `;

            });


            dots.forEach((dot, index) => {

                const multiplier = (index + 1) * 0.9;

                dot.style.transform = `
                    translate3d(
                        ${currentX * multiplier}px,
                        ${currentY * multiplier}px,
                        0
                    )
                `;

            });


            animationFrame =
                requestAnimationFrame(animateOrbit);

        };


        const handlePointerMove = (event) => {

            const rect =
                credentialObject.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            targetX = x * 18;
            targetY = y * 18;

        };


        const resetOrbit = () => {

            targetX = 0;
            targetY = 0;

        };


        credentialObject.addEventListener(
            "pointermove",
            handlePointerMove
        );

        credentialObject.addEventListener(
            "pointerleave",
            resetOrbit
        );


        animateOrbit();


        window.addEventListener(
            "beforeunload",
            () => cancelAnimationFrame(animationFrame)
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements = page.querySelectorAll(
        [
            ".archive-heading",
            ".credential-row",
            ".featured-heading",
            ".featured-card",
            ".learning-heading",
            ".learning-node",
            ".continuous-copy",
            ".continuous-status",
            ".cert-final-content"
        ].join(",")
    );


    revealElements.forEach((element) => {

        element.classList.add("cert-motion-ready");

    });


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add(
                            "cert-motion-visible"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.remove(
                "cert-motion-ready"
            );

            element.classList.add(
                "cert-motion-visible"
            );

        });

    }


    /* =====================================================
       STAGGER CREDENTIAL ROWS
    ====================================================== */

    const credentialRows =
        page.querySelectorAll(".credential-row");


    credentialRows.forEach((row, index) => {

        row.style.transitionDelay =
            `${index * 100}ms`;

    });


    /* =====================================================
       STAGGER FEATURED CARDS
    ====================================================== */

    const featuredCards =
        page.querySelectorAll(".featured-card");


    featuredCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 140}ms`;

    });


    /* =====================================================
       LEARNING NODE STAGGER
    ====================================================== */

    const learningNodes =
        page.querySelectorAll(".learning-node");


    learningNodes.forEach((node, index) => {

        node.style.transitionDelay =
            `${index * 90}ms`;

    });


    /* =====================================================
       CREDENTIAL ROW HOVER SIGNAL
    ====================================================== */

    credentialRows.forEach((row) => {

        const arrow =
            row.querySelector(".credential-row-arrow");

        if (!arrow) return;


        row.addEventListener("mouseenter", () => {

            arrow.style.transform =
                "rotate(45deg) scale(1.08)";

        });


        row.addEventListener("mouseleave", () => {

            arrow.style.transform =
                "rotate(0deg) scale(1)";

        });

    });


    /* =====================================================
       CERTIFICATE PAPER TILT
    ====================================================== */

    const certificateCards =
        page.querySelectorAll(".featured-card");


    certificateCards.forEach((card) => {

        const paper =
            card.querySelector(".certificate-paper");

        if (!paper) return;


        const handleMove = (event) => {

            if (window.innerWidth <= 720) return;


            const rect =
                card.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width;

            const y =
                (event.clientY - rect.top) / rect.height;

            const rotateY =
                (x - 0.5) * 7;

            const rotateX =
                (0.5 - y) * 7;


            paper.style.transform = `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;

        };


        const resetPaper = () => {

            paper.style.transform = "";

        };


        card.addEventListener(
            "pointermove",
            handleMove
        );

        card.addEventListener(
            "pointerleave",
            resetPaper
        );

    });


    /* =====================================================
       LEARNING NODE POINTER EFFECT
    ====================================================== */

    learningNodes.forEach((node) => {

        node.addEventListener(
            "pointermove",
            (event) => {

                if (window.innerWidth <= 720) return;


                const rect =
                    node.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width -
                    0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height -
                    0.5;


                node.style.transform = `
                    perspective(600px)
                    rotateX(${y * -5}deg)
                    rotateY(${x * 5}deg)
                    translateY(-9px)
                `;

            }
        );


        node.addEventListener(
            "pointerleave",
            () => {

                node.style.transform = "";

            }
        );

    });


    /* =====================================================
       CONTINUOUS LEARNING ORBIT
    ====================================================== */

    const statusOrbit =
        page.querySelector(".status-orbit");


    if (statusOrbit) {

        let orbitRotation = 0;
        let lastTime = performance.now();


        const animateStatusOrbit = (time) => {

            const delta =
                time - lastTime;

            lastTime = time;

            orbitRotation += delta * 0.018;

            statusOrbit.style.transform =
                `rotate(${orbitRotation}deg)`;


            requestAnimationFrame(
                animateStatusOrbit
            );

        };


        requestAnimationFrame(
            animateStatusOrbit
        );

    }


    /* =====================================================
       HERO ENTRANCE SEQUENCE
    ====================================================== */

    const heroCopy =
        page.querySelector(".cert-hero-copy");

    const heroObject =
        page.querySelector(".credential-object");


    if (heroCopy) {

        heroCopy.animate(
            [
                {
                    opacity: 0,
                    transform: "translateY(35px)"
                },
                {
                    opacity: 1,
                    transform: "translateY(0)"
                }
            ],
            {
                duration: 850,
                easing: "cubic-bezier(.2,.7,.2,1)",
                fill: "both"
            }
        );

    }


    if (heroObject) {

        heroObject.animate(
            [
                {
                    opacity: 0,
                    transform: "scale(.88) rotate(-8deg)"
                },
                {
                    opacity: 1,
                    transform: "scale(1) rotate(0deg)"
                }
            ],
            {
                duration: 1100,
                delay: 180,
                easing: "cubic-bezier(.2,.7,.2,1)",
                fill: "both"
            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        page.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

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

            }
        );

    });


    /* =====================================================
       ACTIVE PAGE SAFETY
    ====================================================== */

    const activeNav =
        page.querySelector(
            '.main-nav a[href="certifications.html"]'
        );


    if (activeNav) {

        activeNav.setAttribute(
            "aria-current",
            "page"
        );

    }


    /* =====================================================
       REDUCED MOTION SUPPORT
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (prefersReducedMotion.matches) {

        revealElements.forEach((element) => {

            element.classList.remove(
                "cert-motion-ready"
            );

            element.classList.add(
                "cert-motion-visible"
            );

        });

    }

});