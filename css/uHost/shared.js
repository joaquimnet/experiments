const backdrop = document.querySelector(".backdrop");
const selectPlanButtons = document.querySelectorAll(".plan button");
const modal = document.querySelector(".modal");
const modalAction = document.querySelectorAll(".modal__action");
const toggleButton = document.querySelector(".toggle-button");
const mobileNav = document.querySelector(".mobile-nav");
const ctaButton = document.querySelector(".main-nav__item--cta");

/* open modal by clicking in the plans buttons */
for (var i = 0; i < selectPlanButtons.length; i++) {
  selectPlanButtons[i].addEventListener("click", () => {
    modal.style.display = "block";
    backdrop.style.display = "block";
    setTimeout(() => {
      modal.classList.add("open");
      backdrop.classList.add("open")
    }, 10);
  });
}

/* Click button to open mobile nav */
toggleButton.addEventListener("click", () => {
  mobileNav.style.display = "block";
  backdrop.style.display = "block";
  setTimeout(() => {
    backdrop.classList.add("open");
    mobileNav.classList.add("open");
  }, 10);
});

/* Click backdrop to close everything */
backdrop.addEventListener("click", () => {
  backdrop.classList.remove("open");
  mobileNav.classList.remove("open");
  modal.classList.remove("open");
  setTimeout(() => {
    backdrop.style.display = "none";
    mobileNav.style.display = "none";
    modal.style.display = "none";
  }, 200);
});

/* add close event to the modal buttons */
for (var i = 0; i < modalAction.length; i++) {
  modalAction[i].addEventListener("click", () => {
    modal.classList.remove("open");
    backdrop.classList.remove("open");
    setTimeout(() => {
      backdrop.style.display = "none";
      modal.style.display = "none";
    }, 200);
  });
}

ctaButton.addEventListener('animationstart', (e) => {
  console.log('Animtion Started');
});
ctaButton.addEventListener('animationiteration', (e) => {
  console.log('Animtion Iteration');
});
ctaButton.addEventListener('animationend', (e) => {
  console.log('Animtion Ended');
});