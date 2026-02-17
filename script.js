(function () {
  const data = window.cvContent;

  const byId = (id) => document.getElementById(id);
  const renderList = (target, items) => {
    target.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      target.appendChild(li);
    });
  };

  byId("headline").textContent = data.headline;
  byId("hero-line").textContent = data.heroLine || "";
  byId("work-style").textContent = data.workStyle || "";
  byId("about-text").textContent = data.about;
  byId("cv-link").setAttribute("href", data.cvPdfUrl);

  const experienceList = byId("experience-list");
  data.experience.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "card";

    const title = document.createElement("h3");
    title.className = "role";
    title.textContent = `${entry.role} - ${entry.company}`;

    const meta = document.createElement("p");
    meta.className = "meta";
    meta.textContent = entry.context;

    const details = document.createElement("ul");
    details.className = "bullet-list";
    renderList(details, entry.details);

    card.append(title, meta, details);
    experienceList.appendChild(card);
  });

  renderList(byId("highlights-list"), data.highlights);
  renderList(byId("projects-list"), data.projects);

  const tools = byId("tools-list");
  data.tools.forEach((tool) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.setAttribute("role", "listitem");
    chip.textContent = tool;
    tools.appendChild(chip);
  });

  const educationText = byId("education-text");
  if (Array.isArray(data.education)) {
    educationText.innerHTML = data.education.map((item) => `<span class="edu-item">${item}</span>`).join("");
  } else {
    educationText.textContent = data.education;
  }
  byId("contact-cta").textContent = data.contact.cta;

  const contactList = byId("contact-list");
  const emailItem = document.createElement("li");
  emailItem.innerHTML = `Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a>`;

  const linkedinItem = document.createElement("li");
  linkedinItem.innerHTML = `LinkedIn: <a href="${data.contact.linkedin}">${data.contact.linkedin}</a>`;

  const locationItem = document.createElement("li");
  locationItem.textContent = `Location: ${data.contact.location}`;

  contactList.append(emailItem, linkedinItem, locationItem);

  const menuToggle = document.querySelector(".menu-toggle");
  const navList = byId("nav-list");
  const navLinks = Array.from(navList.querySelectorAll("a"));

  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveLink(visible.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6]
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
