

const marqueeTrack = document.querySelector(".marquee-track");

if (marqueeTrack) {

  
    marqueeTrack.innerHTML += marqueeTrack.innerHTML;

}




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
.
        glow1.style.transform =
            `translate(${-x}px, ${-y}px)`;

    }

});



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
