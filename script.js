// Decorative search
const search = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const q = (search.value || "").trim();
    if (!q) return;
    alert("Search is decorative for this assignment.\nYou typed: " + q);
  });
}

// Last edited
const lastEdited = document.getElementById("lastEdited");
if (lastEdited) {
  const d = new Date();
  lastEdited.textContent = d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

// Nav logic (stable, no skipping)
const navLinks = Array.from(document.querySelectorAll("#sideNav a"));
const sections = navLinks
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setActive(id) {
  navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
}

// Click: always scroll + always set active to clicked
navLinks.forEach(a => {
  a.addEventListener("click", (e) => {
    const hash = a.getAttribute("href");
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    setActive(hash.slice(1));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", hash);
  });
});

// Scroll: section whose top is last passed = active
function updateActiveOnScroll() {
  const y = window.scrollY;
  const offset = 110; // topbar + padding
  let current = sections[0]?.id || "intro";

  for (const sec of sections) {
    const top = sec.getBoundingClientRect().top + window.scrollY;
    if (y + offset >= top) current = sec.id;
  }

  setActive(current);
}

window.addEventListener("scroll", () => requestAnimationFrame(updateActiveOnScroll));
window.addEventListener("load", updateActiveOnScroll);
window.addEventListener("resize", updateActiveOnScroll);
