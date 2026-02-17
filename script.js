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

  byId("education-text").textContent = data.education;
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
  menuToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navList.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
})();
