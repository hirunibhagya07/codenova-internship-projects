/* Petal & Paper — interactive features */

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

// Close the mobile menu using the Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Monthly and yearly subscription prices
const monthlyButton = document.getElementById("monthly-button");
const yearlyButton = document.getElementById("yearly-button");

const priceAmounts = document.querySelectorAll(".price-amount");

const billingNotes = {
    "paper-note": {
        monthly: "Billed monthly",
        yearly: "LKR 18,360 billed yearly"
    },
    "party-note": {
        monthly: "Billed monthly",
        yearly: "LKR 32,640 billed yearly"
    },
    "bloom-note": {
        monthly: "Billed monthly",
        yearly: "LKR 48,960 billed yearly"
    }
};

function updatePricing(period) {
    const isYearly = period === "yearly";

    // Update the price displayed on each subscription card
    priceAmounts.forEach(function (price) {
        const monthlyPrice = Number(price.dataset.monthly);
        const yearlyPrice = Number(price.dataset.yearly);

        const displayedPrice = isYearly ? yearlyPrice : monthlyPrice;

        price.textContent = displayedPrice.toLocaleString("en-US");
    });

    // Update the selected billing button
    monthlyButton.classList.toggle("active", !isYearly);
    yearlyButton.classList.toggle("active", isYearly);

    monthlyButton.setAttribute("aria-pressed", String(!isYearly));
    yearlyButton.setAttribute("aria-pressed", String(isYearly));

    // Update the billing information under each price
    Object.entries(billingNotes).forEach(function ([id, notes]) {
        document.getElementById(id).textContent =
            isYearly ? notes.yearly : notes.monthly;
    });
}

monthlyButton.addEventListener("click", function () {
    updatePricing("monthly");
});

yearlyButton.addEventListener("click", function () {
    updatePricing("yearly");
});

// Display the current year in the footer
document.getElementById("current-year").textContent =
    new Date().getFullYear();

// Set the default billing option
updatePricing("monthly");
