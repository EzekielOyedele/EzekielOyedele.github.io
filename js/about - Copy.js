/* =========================================================
   EZEKIEL OYEDELE
   ABOUT PAGE — V2 MOTION CONTROLLER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const page = document.querySelector(".about-page");

    if (!page) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================================
       MOTION ENABLED
       Content remains visible if JavaScript fails.
    ====================================================== */

    page.classList.add("motion-enhanced");


    /* =====================================================
       HERO — POINTER DEPTH
    ====================================================== */

    const hero = document.querySelector(".about-hero");
    const heroGrid = document.querySelector(".hero-grid");
    const orbOne = document.querySelector(".orb-one");
    const orbTwo = document.querySelector(".orb-two");
    const heroInner = document.querySelector(".about-hero-inner");

    let pointerX = 0;
    let pointerY = 0;

    let currentX = 0;
    let currentY = 0;

    let animationFrame = null;

    function animateHeroMotion() {

        currentX += (pointerX - currentX) * 0.08;
        currentY += (pointerY - currentY) * 0.08;

        const gridX = currentX * 18;
        const gridY = currentY * 14;

        const orbOneX = currentX * 28;
        const orbOneY = currentY * 20;

        const orbTwoX = currentX * -18;
        const orbTwoY = currentY * -14;

        if (heroGrid) {
            heroGrid.style.transform =
                `translate3d(${gridX}px, ${gridY}px, 0)`;
        }

        if (orbOne) {
            orbOne.style.transform =
                `translate3d(${orbOneX}px, ${orbOneY}px, 0)`;
        }

        if (orbTwo) {
            orbTwo.style.transform =
                `translate3d(${orbTwoX}px, ${orbTwoY}px, 0)`;
        }

        if (heroInner) {
            heroInner.style.transform =
                `translate3d(${currentX * 5}px, ${currentY * 3}px, 0)`;
        }

        animationFrame =
            requestAnimationFrame(animateHeroMotion);
    }


    if (
        hero &&
        !reduceMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        hero.addEventListener("pointermove", (event) => {

            const rect = hero.getBoundingClientRect();

            pointerX =
                (event.clientX - rect.left) / rect.width - 0.5;

            pointerY =
                (event.clientY - rect.top) / rect.height - 0.5;

            if (!animationFrame) {
                animationFrame =
                    requestAnimationFrame(animateHeroMotion);
            }

        });

        hero.addEventListener("pointerleave", () => {

            pointerX = 0;
            pointerY = 0;

        });

    }


    /* =====================================================
       PROFILE FRAME — MOUSE DEPTH
    ====================================================== */

    const profileStage =
        document.querySelector(".profile-stage");

    const profileFrame =
        document.querySelector(".profile-frame");

    if (
        profileStage &&
        profileFrame &&
        !reduceMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        profileStage.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    profileStage.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                const rotateX = y * -7;
                const rotateY = x * 9;

                profileFrame.style.transform =
                    `rotate(2deg)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );

        profileStage.addEventListener(
            "pointerleave",
            () => {

                profileFrame.style.transform =
                    "rotate(2deg) rotateX(0deg) rotateY(0deg)";

            }
        );

    }


    /* =====================================================
       HERO — ENTRANCE SEQUENCE
    ====================================================== */

    if (!reduceMotion) {

        const heroElements = [
            document.querySelector(".about-kicker"),
            document.querySelector(".about-hero h1"),
            document.querySelector(".hero-intro"),
            document.querySelector(".hero-actions"),
            document.querySelector(".profile-stage"),
            document.querySelector(".hero-bottom-bar")
        ].filter(Boolean);

        heroElements.forEach((element, index) => {

            element.style.setProperty(
                "--hero-delay",
                `${index * 110}ms`
            );

            element.classList.add("hero-motion-item");

        });

    }


    /* =====================================================
       STORY — ACTIVE SECTION
    ====================================================== */

    const storyCards =
        document.querySelectorAll(".story-card");

    const storyProgress =
        document.querySelector(".story-progress span");

    if (
        storyCards.length &&
        storyProgress &&
        "IntersectionObserver" in window
    ) {

        const storyObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;

                        storyCards.forEach(card => {
                            card.classList.remove("story-active");
                        });

                        entry.target.classList.add("story-active");

                        const index =
                            [...storyCards].indexOf(entry.target);

                        const progress =
                            ((index + 1) / storyCards.length) * 100;

                        storyProgress.style.width =
                            `${progress}%`;

                    });

                },
                {
                    threshold: 0.55
                }
            );

        storyCards.forEach(card => {
            storyObserver.observe(card);
        });

    }


    /* =====================================================
       STORY — CARD HOVER DEPTH
    ====================================================== */

    if (
        !reduceMotion &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        storyCards.forEach(card => {

            card.addEventListener("pointermove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                card.style.setProperty(
                    "--card-x",
                    `${x * 5}px`
                );

                card.style.setProperty(
                    "--card-y",
                    `${y * 4}px`
                );

            });

            card.addEventListener("pointerleave", () => {

                card.style.setProperty(
                    "--card-x",
                    "0px"
                );

                card.style.setProperty(
                    "--card-y",
                    "0px"
                );

            });

        });

    }


    /* =====================================================
       ANALYSIS NODES
    ====================================================== */

    const analysisNodes =
        document.querySelectorAll(".analysis-node");

    const analysisLine =
        document.querySelector(".machine-line");

    if (
        analysisNodes.length &&
        "IntersectionObserver" in window
    ) {

        const analysisObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) return;

                        analysisNodes.forEach(node => {
                            node.classList.remove("node-active");
                        });

                        entry.target.classList.add("node-active");

                        const index =
                            [...analysisNodes]
                                .indexOf(entry.target);

                        if (analysisLine) {

                            const progress =
                                ((index + 1) /
                                    analysisNodes.length) * 100;

                            analysisLine.style.setProperty(
                                "--line-progress",
                                `${progress}%`
                            );

                        }

                    });

                },
                {
                    threshold: 0.65
                }
            );

        analysisNodes.forEach(node => {
            analysisObserver.observe(node);
        });

    }


    /* =====================================================
       TOOL INTERFACE
    ====================================================== */

    const toolTabs =
        document.querySelectorAll(".tool-tab");

    const toolName =
        document.querySelector("#toolName");

    const toolDescription =
        document.querySelector("#toolDescription");

    const toolCategory =
        document.querySelector("#toolCategory");

    const toolTags =
        document.querySelector("#toolTags");


    const toolData = {

        excel: {
            name: "EXCEL",
            category: "DATA ANALYSIS",
            description:
                "Cleaning, formulas, PivotTables, dashboards, reporting and exploratory analysis.",
            tags: [
                "DATA CLEANING",
                "PIVOTTABLES",
                "DASHBOARDS"
            ]
        },

        sql: {
            name: "SQL",
            category: "DATABASE ANALYSIS",
            description:
                "Querying, joining, aggregating and analyzing relational data to uncover useful business insights.",
            tags: [
                "MYSQL",
                "JOINS",
                "CTEs"
            ]
        },

        powerbi: {
            name: "POWER BI",
            category: "BUSINESS INTELLIGENCE",
            description:
                "Interactive dashboards, Power Query, DAX and data modeling for business-focused analysis.",
            tags: [
                "POWER QUERY",
                "DAX",
                "DATA MODELING"
            ]
        },

        tableau: {
            name: "TABLEAU",
            category: "DATA VISUALIZATION",
            description:
                "Interactive visualizations and dashboards designed to communicate patterns, trends and insights clearly.",
            tags: [
                "VISUALIZATION",
                "DASHBOARDS",
                "ANALYTICS"
            ]
        }

    };


    function updateTool(toolKey) {

        const data = toolData[toolKey];

        if (!data) return;

        if (toolName) {
            toolName.classList.add("tool-changing");
        }

        if (toolDescription) {
            toolDescription.classList.add(
                "tool-description-changing"
            );
        }

        setTimeout(() => {

            if (toolName) {
                toolName.textContent =
                    data.name;
            }

            if (toolCategory) {
                toolCategory.textContent =
                    data.category;
            }

            if (toolDescription) {
                toolDescription.textContent =
                    data.description;
            }

            if (toolTags) {

                toolTags.innerHTML = "";

                data.tags.forEach(
                    (tag, index) => {

                        const span =
                            document.createElement("span");

                        span.textContent = tag;

                        span.style.setProperty(
                            "--tag-delay",
                            `${index * 70}ms`
                        );

                        toolTags.appendChild(span);

                    }
                );

            }

        }, 180);

        setTimeout(() => {

            if (toolName) {
                toolName.classList.remove(
                    "tool-changing"
                );
            }

            if (toolDescription) {
                toolDescription.classList.remove(
                    "tool-description-changing"
                );
            }

        }, 220);

    }


    toolTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            toolTabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            updateTool(
                tab.dataset.tool
            );

        });

        tab.addEventListener("keydown", (event) => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                tab.click();

            }

        });

    });


    /* =====================================================
       SECTION SCROLL REVEAL
       Content remains visible without JS.
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".about-identity, " +
            ".about-story, " +
            ".thinking-section, " +
            ".about-toolkit-new, " +
            ".about-final, " +
            ".about-closing"
        );


    if (
        !reduceMotion &&
        "IntersectionObserver" in window
    ) {

        revealElements.forEach(section => {

            section.classList.add(
                "about-motion-ready"
            );

        });

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) return;

                        entry.target.classList.add(
                            "about-motion-visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -80px 0px"
                }
            );

        revealElements.forEach(section => {
            revealObserver.observe(section);
        });

    } else {

        revealElements.forEach(section => {

            section.classList.add(
                "about-motion-visible"
            );

        });

    }


    /* =====================================================
       FINAL SECTION — IMAGE DEPTH
    ====================================================== */

    const finalSection =
        document.querySelector(".about-final");

    const finalPhoto =
        document.querySelector(".final-photo");

    if (
        finalSection &&
        finalPhoto &&
        !reduceMotion
    ) {

        finalSection.addEventListener(
            "pointermove",
            (event) => {

                if (
                    !window.matchMedia(
                        "(pointer: fine)"
                    ).matches
                ) return;

                const rect =
                    finalSection.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) /
                    rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) /
                    rect.height - 0.5;

                finalPhoto.style.transform =
                    `translate3d(${x * 7}px, ${y * 5}px, 0)`;

            }
        );

        finalSection.addEventListener(
            "pointerleave",
            () => {

                finalPhoto.style.transform =
                    "translate3d(0, 0, 0)";

            }
        );

    }


    /* =====================================================
       SCROLL PARALLAX
    ====================================================== */

    const finalBackground =
        document.querySelector(".final-background-text");

    let ticking = false;

    function updateScrollMotion() {

        const scrollY = window.scrollY;

        if (
            finalBackground &&
            !reduceMotion
        ) {

            const rect =
                finalBackground.getBoundingClientRect();

            const viewport =
                window.innerHeight;

            if (
                rect.top < viewport &&
                rect.bottom > 0
            ) {

                const offset =
                    (viewport - rect.top) * 0.035;

                finalBackground.style.transform =
                    `translate3d(0, ${offset}px, 0)`;

            }

        }

        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateScrollMotion
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       CLEANUP
    ====================================================== */

    window.addEventListener(
        "beforeunload",
        () => {

            if (animationFrame) {
                cancelAnimationFrame(
                    animationFrame
                );
            }

        }
    );

});