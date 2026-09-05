/* =========================
   MARQUEE SEAMLESS LOOP
========================= */

const marqueeTrack = document.querySelector(".marquee-track");

if (marqueeTrack) {

    // The CSS animation slides the track exactly 50% to the left,
    // then jumps back to 0% to loop. That only looks seamless if
    // the track's content is duplicated (first half === second half).
    // Clone the existing items once so the loop has no visible jump.
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;

}


/* =========================
   REVEAL ON SCROLL
========================= */

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill, .contact-section"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

function updateActiveNav() {

    let current = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 200;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    // Near the bottom of the page the last section's -200px offset
    // may never be reached (its content is shorter than 200px above
    // the fold), leaving no link marked active. Force the last
    // section once the user has effectively scrolled to the bottom.
    const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

    if (scrolledToBottom && sections.length) {

        current = sections[sections.length - 1].getAttribute("id");

    }

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${current}`
        ) {

            link.classList.add("active");

        }

    });

}

// Throttle scroll handling with requestAnimationFrame so the nav
// highlight logic doesn't run on every single scroll event.
let scrollTicking = false;

window.addEventListener("scroll", () => {

    if (!scrollTicking) {

        requestAnimationFrame(() => {

            updateActiveNav();

            scrollTicking = false;

        });

        scrollTicking = true;

    }

});

updateActiveNav();


/* =========================
   HERO PARALLAX
========================= */

const heroImage = document.querySelector(".hero-image");
const glow1 = document.querySelector(".glow-1");

document.addEventListener("mousemove", (event) => {

    const x = (window.innerWidth / 2 - event.clientX) / 40;
    const y = (window.innerHeight / 2 - event.clientY) / 40;

    if (heroImage) {

        heroImage.style.transform =
            `translate(${x}px, ${y}px)`;

    }

    if (glow1) {

        // glow-1's own floatGlow keyframes animate `margin`
        // (not `transform`) specifically so this inline transform
        // isn't fought over/overridden by the CSS animation.
        glow1.style.transform =
            `translate(${-x}px, ${-y}px)`;

    }

});


/* =========================
   ADD REVEAL CSS
========================= */

const style = document.createElement("style");

style.innerHTML = `

.reveal {
    opacity: 0;
    transform: translateY(60px);
    transition:
        opacity 0.8s ease,
        transform 0.8s ease;
}

.reveal.show {
    opacity: 1;
    transform: translateY(0);
}

.project-card.reveal {
    transition:
        opacity 0.8s ease,
        transform 0.8s ease,
        border-color 0.4s ease;
}

`;

document.head.appendChild(style);