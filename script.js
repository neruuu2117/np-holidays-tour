// Add real business details here before launch. Keep blank settings blank rather than
// showing customers an unverified phone number, address, or social profile.
const NP_HOLIDAYS_CONFIG = {
  phone: "",
  email: "",
  address: "",
  whatsappNumber: "",
  mapsQuery: "",
  social: {
    instagram: "",
    facebook: "",
    youtube: ""
  }
};

const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("#primary-menu");

function closeMenu() {
  if (!menuButton || !navMenu) return;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
  navMenu.classList.remove("open");
  document.body.classList.remove("menu-open");
}

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navMenu.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });
  navMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const navAnchors = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const navSections = navAnchors
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navAnchors.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
        link.classList.toggle("active", active);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  navSections.forEach((section) => sectionObserver.observe(section));
}

document.querySelectorAll("[data-destination]").forEach((link) => {
  link.addEventListener("click", () => {
    const destination = document.querySelector('[name="destination"]');
    if (!destination) return;
    const option = [...destination.options].find((item) => item.text === link.dataset.destination);
    if (option) destination.value = option.value;
  });
});

function setContactText(selector, value, fallback) {
  document.querySelectorAll(selector).forEach((element) => {
    element.textContent = value || fallback;
  });
}

const phoneDigits = NP_HOLIDAYS_CONFIG.phone.replace(/[^\d+]/g, "");
const phoneLink = document.querySelector('[data-contact="phone"]');
const footerPhone = document.querySelector('[data-contact="footer-phone"]');
setContactText('[data-contact="phone"]', NP_HOLIDAYS_CONFIG.phone, "Add your phone number");
setContactText('[data-contact="footer-phone"]', NP_HOLIDAYS_CONFIG.phone, "Phone details coming soon");
if (phoneDigits) {
  phoneLink.href = `tel:${phoneDigits}`;
  footerPhone.href = `tel:${phoneDigits}`;
} else {
  phoneLink.href = "#booking";
  footerPhone.href = "#booking";
}

setContactText('[data-contact="email"]', NP_HOLIDAYS_CONFIG.email, "Add your email address");
setContactText('[data-contact="footer-email"]', NP_HOLIDAYS_CONFIG.email, "Email details coming soon");
if (NP_HOLIDAYS_CONFIG.email) {
  document.querySelector('[data-contact="email"]').href = `mailto:${NP_HOLIDAYS_CONFIG.email}`;
  document.querySelector('[data-contact="footer-email"]').href = `mailto:${NP_HOLIDAYS_CONFIG.email}`;
}

setContactText('[data-contact="address"]', NP_HOLIDAYS_CONFIG.address, "Add your office address");
setContactText('[data-contact="map-label"]', NP_HOLIDAYS_CONFIG.address, "Our office location will appear here");
const mapLink = document.querySelector('[data-contact="maps"]');
if (NP_HOLIDAYS_CONFIG.mapsQuery) {
  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(NP_HOLIDAYS_CONFIG.mapsQuery)}`;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
  mapLink.removeAttribute("aria-disabled");
  mapLink.innerHTML = 'Get directions <span aria-hidden="true">↗</span>';
}

const whatsappNumber = NP_HOLIDAYS_CONFIG.whatsappNumber.replace(/\D/g, "");
const whatsappLink = document.querySelector('[data-contact="whatsapp"]');
if (whatsappNumber) {
  whatsappLink.href = `https://wa.me/${whatsappNumber}`;
  whatsappLink.target = "_blank";
  whatsappLink.rel = "noopener noreferrer";
} else {
  whatsappLink.href = "#booking";
  whatsappLink.setAttribute("aria-label", "WhatsApp contact not configured. Go to the booking enquiry form.");
}

const socialLinks = [
  ["Instagram", NP_HOLIDAYS_CONFIG.social.instagram],
  ["Facebook", NP_HOLIDAYS_CONFIG.social.facebook],
  ["YouTube", NP_HOLIDAYS_CONFIG.social.youtube]
];
const socialContainer = document.querySelector("[data-social-links]");
socialContainer.replaceChildren(...socialLinks.map(([label, url]) => {
  if (!url) {
    const placeholder = document.createElement("span");
    placeholder.textContent = `${label} · add your link`;
    return placeholder;
  }
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  return link;
}));

document.querySelector("#current-year").textContent = new Date().getFullYear();

const bookingForm = document.querySelector("#booking-form");
const formResult = document.querySelector("#form-result");
const enquiryPreview = document.querySelector("#enquiry-preview");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const values = new FormData(bookingForm);
  const date = values.get("date");
  const enquiry = [
    "Hello NP HOLIDAYS TOUR, I'd like to enquire about a trip.",
    "",
    `Name: ${values.get("name")}`,
    `Email: ${values.get("email")}`,
    `Phone: ${values.get("phone") || "Not provided"}`,
    `Destination: ${values.get("destination")}`,
    `Travel date: ${date || "Flexible"}`,
    `Travellers: ${values.get("travellers")}`,
    `Message: ${values.get("message") || "Please share some options."}`
  ].join("\n");

  enquiryPreview.value = enquiry;
  formResult.hidden = false;
  if (whatsappNumber) {
    resultTitle.textContent = "Your enquiry is ready to send.";
    resultMessage.textContent = "We’ve opened WhatsApp with your trip details. Review the message and send it when you’re ready.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(enquiry)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  } else {
    resultTitle.textContent = "Your enquiry is ready.";
    resultMessage.textContent = "WhatsApp contact isn’t configured yet. Copy this message to keep it, or add your number in script.js to send enquiries directly.";
  }
  formResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

document.querySelector("#copy-enquiry").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(enquiryPreview.value);
    button.textContent = "Copied to clipboard";
  } catch {
    enquiryPreview.focus();
    enquiryPreview.select();
    const copied = document.execCommand("copy");
    button.textContent = copied ? "Copied to clipboard" : "Select and copy the message";
  }
});
