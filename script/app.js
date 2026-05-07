const loadNavigationBar = function (htmlFile, elementName) {
  fetch(htmlFile)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load nav: ${response.status}`);
      }
      return response.text();
    })
    .then((HTML) => {
      const Element = document.getElementById(elementName);
      if (Element) {
        document.getElementById(elementName).innerHTML = HTML;
        // Initialize navbar functionality AFTER it's loaded
        initializeNavbar();
      }
    })
    .catch((error) => {
      console.error("Error loading navigation:", error);
    });
};

loadNavigationBar(
  "https://justincoding618.github.io/justincoding.github.io/reusable/navbar.html",
  "navbar-holder",
);

const loadHeadFeature = function (rel, File, type = "") {
  const link = document.createElement("link");
  link.rel = rel;
  link.href = File;
  link.type = type;
  document.head.appendChild(link);
};

loadHeadFeature(
  "stylesheet",
  "https://justincoding618.github.io/justincoding.github.io/css/style.css",
);
loadHeadFeature(
  "icon",
  "https://justincoding618.github.io/justincoding.github.io/images/red-circle-j.png",
  "x/image",
);

function initializeNavbar() {
  console.log("Initializing navbar...");

  const hamburger = document.querySelector(".navbar .icon");
  const navbarLinks = document.getElementById("navbarLinks");
  const subnavButtons = document.querySelectorAll(".subnavbtn");
  const navbar = document.querySelector(".navbar");

  // DEFINE toggleMenu function HERE
  function toggleMenu() {
    console.log("toggleMenu called");
    const navbarLinks = document.getElementById("navbarLinks");
    if (!navbarLinks) {
      console.error("navbarLinks not found!");
      return;
    }

    if (navbarLinks.classList.contains("responsive")) {
      navbarLinks.classList.remove("responsive");
      // Close all dropdowns when closing menu
      const dropdowns = document.querySelectorAll(".subnav-content");
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("show");
      });
      const buttons = document.querySelectorAll(".subnavbtn");
      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });
    } else {
      navbarLinks.classList.add("responsive");
    }
  }

  // DEFINE toggleDropdown function HERE with detailed logging
  function toggleDropdown(button) {
    console.log("toggleDropdown called");

    // Only toggle on mobile
    if (window.innerWidth <= 768) {
      const subnav = button.parentElement;
      const subnavContent = subnav.querySelector(".subnav-content");

      if (!subnavContent) {
        console.error("subnavContent not found!");
        return;
      }

      const isShown = subnavContent.classList.contains("show");
      console.log("Current state - isShown:", isShown);
      console.log("Classes before toggle:", subnavContent.classList.toString());

      if (isShown) {
        console.log("Removing 'show' class");
        subnavContent.classList.remove("show");
        button.classList.remove("active");
      } else {
        console.log("Adding 'show' class");
        subnavContent.classList.add("show");
        button.classList.add("active");
      }

      console.log("Classes after toggle:", subnavContent.classList.toString());

      // Check again after a short delay to see if something changed it
      setTimeout(function () {
        console.log("Classes 100ms later:", subnavContent.classList.toString());
      }, 100);
    }
  }

  // Hamburger menu toggle
  if (hamburger) {
    hamburger.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Hamburger clicked");
      toggleMenu();
    });
  }

  // Dropdown toggle for each subnav button
  subnavButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Dropdown button clicked");
      toggleDropdown(button);
    });
  });

  // ONLY listen for clicks OUTSIDE on desktop
  if (window.innerWidth > 768) {
    document.addEventListener("click", function (event) {
      if (navbar && !navbar.contains(event.target)) {
        const dropdowns = document.querySelectorAll(".subnav-content");
        dropdowns.forEach(function (dropdown) {
          dropdown.classList.remove("show");
        });
      }
    });
  }

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navbarLinks) {
      navbarLinks.classList.remove("responsive");
      const dropdowns = document.querySelectorAll(".subnav-content");
      dropdowns.forEach(function (dropdown) {
        dropdown.classList.remove("show");
      });
      const buttons = document.querySelectorAll(".subnavbtn");
      buttons.forEach(function (btn) {
        btn.classList.remove("active");
      });
    }
  });
}
