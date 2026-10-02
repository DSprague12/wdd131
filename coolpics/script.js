const menuButton = document.querySelector("#menu-btn");
const navigation = document.querySelector(".primary-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});