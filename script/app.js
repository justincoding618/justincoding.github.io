// Define all the functions first
const loadHeadFeature = function (rel, File, type = "") {
  const link = document.createElement("link");
  link.rel = rel;
  link.href = File;
  link.type = type;
  document.head.appendChild(link);
};

const showSideBar = function () {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
};
const hideSideBar = function () {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
};

function toggleSubMenu(button) {
  if (!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }

  button.nextElementSibling.classList.toggle("show");
  button.classList.toggle("rotate");

  if (sidebar.classList.contains("close")) {
    sidebar.classList.toggle("close");
    toggleButton.classList.toggle("rotate");
  }
}

function closeAllSubMenus() {
  Array.from(sidebar.getElementsByClassName("show")).forEach((ul) => {
    ul.classList.remove("show");
    ul.previousElementSibling.classList.remove("rotate");
  });
}

$(function () {
  $("#navbar-holder").load("/reusable/navbar.html");
});

const base = "/justincoding.github.io";

loadHeadFeature("stylesheet", `${base}/css/style.css`);
loadHeadFeature("icon", `${base}/images/red-circle-j.png`, "x/image");
loadHeadFeature(
  "stylesheet",
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
);
