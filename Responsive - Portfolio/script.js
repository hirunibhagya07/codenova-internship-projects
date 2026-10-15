// Mobile navigation menu
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.textContent = "☰";
        }
    });
}

// Dark and light theme
const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        savedTheme = null;
    }

    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    themeToggle.textContent = document.body.classList.contains("dark-theme")
        ? "☀️"
        : "🌙";

    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-theme");

        const isDark = document.body.classList.contains("dark-theme");

        themeToggle.textContent = isDark ? "☀️" : "🌙";

        try {
            localStorage.setItem(
                "portfolio-theme",
                isDark ? "dark" : "light"
            );
        } catch (error) {
            // The theme still works if storage is unavailable.
        }
    });
}

// Contact form
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all the fields.");
            return;
        }

        // Replace this with your own email address.
        const recipient = "hiruniwijethunge07@gmail.com@gmail.com";

        const subject = encodeURIComponent("Portfolio Contact Message");
        const body = encodeURIComponent(
            "Name: " + name +
            "\nEmail: " + email +
            "\n\nMessage:\n" + message
        );

        window.location.href =
            "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
    });
}
