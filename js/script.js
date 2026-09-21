document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = mainNav.classList.toggle("mobile-open");

        menuToggle.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

        document.body.classList.toggle("nav-is-open", isOpen);
    });

    mainNav.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("mobile-open");
            menuToggle.classList.remove("menu-open");

            menuToggle.setAttribute("aria-expanded", "false");

            document.body.classList.remove("nav-is-open");
        });

    });
}


    /* =========================================================
       CURRENT PAGE NAVIGATION
    ========================================================= */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".main-nav a").forEach((link) => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });


    /* =========================================================
       SCROLL REVEAL
    ========================================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".tool-card, " +
        ".project-card, " +
        ".certificate-card, " +
        ".experience-item, " +
        ".about-introduction-grid, " +
        ".approach-card, " +
        ".about-tool, " +
        ".focus-item, " +
        ".project-detail, " +
        ".experience-detail-item, " +
        ".certification-detail, " +
        ".contact-page-grid, " +
        ".contact-link, " +
        ".contact-final-content"
    );

    revealElements.forEach((element, index) => {
        element.classList.add("motion-reveal");
        element.style.setProperty(
            "--reveal-delay",
            `${Math.min(index * 45, 280)}ms`
        );
    });

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("motion-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -70px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });


    /* =========================================================
       HERO INTRO
    ========================================================= */

    const heroParts = document.querySelectorAll(
        ".hero-label, " +
        ".hero-title, " +
        ".hero-description, " +
        ".hero-actions, " +
        ".hero-meta, " +
        ".hero-visual"
    );

    heroParts.forEach((element, index) => {
        element.classList.add("hero-motion");

        element.style.setProperty(
            "--hero-delay",
            `${150 + index * 110}ms`
        );
    });


    /* =========================================================
       NAVBAR SCROLL RESPONSE
    ========================================================= */

    const header = document.querySelector(".site-header");

    if (header) {
        let lastScroll = 0;

        window.addEventListener(
            "scroll",
            () => {
                const currentScroll = window.scrollY;

                if (currentScroll > 40) {
                    header.classList.add("scrolled");
                } else {
                    header.classList.remove("scrolled");
                }

                if (currentScroll > lastScroll && currentScroll > 180) {
                    header.classList.add("nav-hidden");
                } else {
                    header.classList.remove("nav-hidden");
                }

                lastScroll = currentScroll;
            },
            { passive: true }
        );
    }


    /* =========================================================
       HERO MOUSE PARALLAX
    ========================================================= */

    const hero = document.querySelector(".hero");
    const heroVisual = document.querySelector(".hero-visual");

    if (
        hero &&
        heroVisual &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        let targetX = 0;
        let targetY = 0;
        let currentX = 0;
        let currentY = 0;

        hero.addEventListener("mousemove", (event) => {
            const rect = hero.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width - 0.5;

            const y =
                (event.clientY - rect.top) / rect.height - 0.5;

            targetX = x * 18;
            targetY = y * 14;
        });

        hero.addEventListener("mouseleave", () => {
            targetX = 0;
            targetY = 0;
        });

        const animateHero = () => {
            currentX += (targetX - currentX) * 0.08;
            currentY += (targetY - currentY) * 0.08;

            heroVisual.style.setProperty(
                "--hero-mouse-x",
                `${currentX}px`
            );

            heroVisual.style.setProperty(
                "--hero-mouse-y",
                `${currentY}px`
            );

            requestAnimationFrame(animateHero);
        };

        animateHero();
    }


    /* =========================================================
       PROJECT CARD 3D TILT
    ========================================================= */

    const interactiveCards = document.querySelectorAll(
        ".project-card"
    );

    if (
        interactiveCards.length &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        interactiveCards.forEach((card) => {

            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width;

                const y =
                    (event.clientY - rect.top) / rect.height;

                const rotateY = (x - 0.5) * 8;
                const rotateX = (0.5 - y) * 8;

                card.style.setProperty(
                    "--card-rotate-x",
                    `${rotateX}deg`
                );

                card.style.setProperty(
                    "--card-rotate-y",
                    `${rotateY}deg`
                );

                card.style.setProperty(
                    "--card-glow-x",
                    `${x * 100}%`
                );

                card.style.setProperty(
                    "--card-glow-y",
                    `${y * 100}%`
                );
            });

            card.addEventListener("mouseleave", () => {
                card.style.setProperty(
                    "--card-rotate-x",
                    "0deg"
                );

                card.style.setProperty(
                    "--card-rotate-y",
                    "0deg"
                );

                card.style.setProperty(
                    "--card-glow-x",
                    "50%"
                );

                card.style.setProperty(
                    "--card-glow-y",
                    "50%"
                );
            });
        });
    }


    /* =========================================================
       MAGNETIC BUTTONS
    ========================================================= */

    const magneticElements = document.querySelectorAll(
        ".hero-actions .btn, " +
        ".contact-content .btn, " +
        ".about-cta .btn, " +
        ".projects-cta .btn, " +
        ".experience-cta .btn, " +
        ".certification-statement .btn"
    );

    if (
        magneticElements.length &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        magneticElements.forEach((element) => {

            element.addEventListener("mousemove", (event) => {
                const rect = element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;
            });

            element.addEventListener("mouseleave", () => {
                element.style.transform = "";
            });
        });
    }


    /* =========================================================
       TOOL ICON INTERACTION
    ========================================================= */

    document.querySelectorAll(".tool-card").forEach((card) => {

        card.addEventListener("mouseenter", () => {
            card.classList.add("tool-active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("tool-active");
        });

    });


    /* =========================================================
       IMAGE PARALLAX ON PROJECTS
    ========================================================= */

    if (
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        document.querySelectorAll(".project-card").forEach((card) => {

            const image = card.querySelector(".project-image img");

            if (!image) return;

            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width - 0.5;

                const y =
                    (event.clientY - rect.top) / rect.height - 0.5;

                image.style.transform =
                    `scale(1.08) translate(${x * 10}px, ${y * 10}px)`;
            });

            card.addEventListener("mouseleave", () => {
                image.style.transform = "";
            });
        });
    }


    /* =========================================================
       SMOOTH INTERNAL LINKS
    ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

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


    /* =========================================================
       REDUCED MOTION
    ========================================================= */

    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        document.documentElement.classList.add("reduce-motion");
    }

});
/* =========================================================
PROJECTS PAGE INTERACTIONS
========================================================= */

const projectPageElements = document.querySelectorAll(
".projects-page .project-showcase, " +
".projects-page .project-philosophy, " +
".projects-page .projects-cta"
);

if (projectPageElements.length && "IntersectionObserver" in window) {

```
projectPageElements.forEach(element => {
    element.classList.add("reveal");
});

const projectObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("motion-visible");

                projectObserver.unobserve(entry.target);

            }

        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px"
    }
);

projectPageElements.forEach(element => {
    projectObserver.observe(element);
});
```

}

/* ---------------------------------------------------------
PROJECT IMAGE PARALLAX
--------------------------------------------------------- */

const projectVisuals = document.querySelectorAll(
".projects-page .project-visual"
);

if (
projectVisuals.length &&
window.matchMedia("(pointer: fine)").matches &&
!window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {

```
projectVisuals.forEach(visual => {

    const image = visual.querySelector("img");

    if (!image) return;

    visual.addEventListener("mousemove", event => {

        const rect = visual.getBoundingClientRect();

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        image.style.transform =
            `scale(1.045) translate(${x * 10}px, ${y * 10}px)`;

    });

    visual.addEventListener("mouseleave", () => {

        image.style.transform = "";

    });

});
```

}

/* ---------------------------------------------------------
PROJECT TOOL TAG INTERACTION
--------------------------------------------------------- */

const projectTags = document.querySelectorAll(
".projects-page .project-tools-large span"
);

projectTags.forEach(tag => {

```
tag.addEventListener("mouseenter", () => {
    tag.style.transform = "translateY(-3px)";
});

tag.addEventListener("mouseleave", () => {
    tag.style.transform = "";
});
```

});

/* =========================================================
   ABOUT — JOURNEY TIMELINE
   ========================================================= */

const journeySection = document.querySelector(".about-journey");

if (journeySection) {

    const journeySteps = journeySection.querySelectorAll(".journey-step");
    const journeyFill = journeySection.querySelector(".journey-line-fill");
    const journeyProgressText = document.querySelector("#journeyProgressText");

    if (journeySteps.length) {

        const updateJourney = () => {

            const viewportCenter = window.innerHeight * 0.48;

            let activeIndex = 0;

            journeySteps.forEach((step, index) => {

                const rect = step.getBoundingClientRect();

                const distance =
                    Math.abs(rect.top + rect.height / 2 - viewportCenter);

                if (
                    index === 0 ||
                    distance <
                    Math.abs(
                        journeySteps[activeIndex].getBoundingClientRect().top +
                        journeySteps[activeIndex].getBoundingClientRect().height / 2 -
                        viewportCenter
                    )
                ) {
                    activeIndex = index;
                }

            });


            journeySteps.forEach((step, index) => {

                step.classList.toggle(
                    "is-active",
                    index === activeIndex
                );

            });


            const progress =
                ((activeIndex + 1) / journeySteps.length) * 100;

            if (journeyFill) {
                journeyFill.style.height = `${progress}%`;
            }

            if (journeyProgressText) {
                journeyProgressText.textContent =
                    `${String(activeIndex + 1).padStart(2, "0")} / ${String(journeySteps.length).padStart(2, "0")}`;
            }
        };


        window.addEventListener("scroll", updateJourney, {
            passive: true
        });

        window.addEventListener("resize", updateJourney);

        updateJourney();
    }
}