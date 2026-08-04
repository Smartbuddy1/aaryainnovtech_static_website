const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const galleryTabs = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll("[data-gallery]");

function setGalleryFilter(filter) {
  if (!galleryItems.length) return;

  galleryTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.filter === filter);
  });

  galleryItems.forEach((item) => {
    const show = filter === "all" || item.dataset.gallery === filter;
    item.hidden = !show;
  });
}

galleryTabs.forEach((tab) => {
  tab.addEventListener("click", () => setGalleryFilter(tab.dataset.filter));
});

if (galleryItems.length) {
  setGalleryFilter("products");
}

document.querySelectorAll("form[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = form.querySelector(".form-note");
    if (!note) return;

    note.textContent =
      form.dataset.form === "login"
        ? "Login demo submitted."
        : "Thank you. Your enquiry has been recorded.";
    form.reset();
  });
});
