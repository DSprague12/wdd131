const menuButton = document.querySelector("#menu-btn");
const navigation = document.querySelector(".primary-nav");
const gallery = document.querySelector(".gallery");
const overlay = document.querySelector("#image-modal");
const modalImage = overlay.querySelector(".modal-image");
const closeOverlayButton = document.querySelector("#close-overlay-btn");

const openModal = (picture) => {
  modalImage.src = picture.src;
  modalImage.alt = picture.alt;
  overlay.hidden = false;
};

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("is-open");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navigation.classList.remove("is-open");
  }
});

gallery.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const picture = event.target.closest(".picture");
  if (picture && gallery.contains(picture)) {
    openModal(picture);
  }
});

const closeModal = () => {
  overlay.hidden = true;
  modalImage.removeAttribute("src");
};

closeOverlayButton.addEventListener("click", closeModal);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) {
    closeModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) {
    closeModal();
  }
});