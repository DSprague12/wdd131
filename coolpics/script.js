const menuButton = document.querySelector(".menu-btn");
const navigation = document.querySelector(".primary-nav");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("is-open");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navigation.classList.remove("is-open");
  }
});