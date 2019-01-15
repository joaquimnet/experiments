const parser = new DOMParser();
const state = { route: "history" };
let menuOpen = false;

const getContent = r => {
  document.querySelector(".main-content").innerHTML = "Loading...";
  fetch(`/projects/coffee/${r}.html`)
    .then(e => {
      if (e.status.toString().includes("40")) {
        throw new Error("File not found");
      }
      return e.text();
    })
    .then(s => {
      state.route = r;
      state.content = s;
      render();
    })
    .catch(e => {
      console.log(e);
      state.route = "error";
      render();
    });
};

const render = () => {
  const article = document.querySelector(".main-content");
  if (state.route === "error") {
    const err = "An error has ocurred, please reload the page.";
    article.innerHTML = err;
  } else {
    article.innerHTML = state.content;
  }

  document.querySelectorAll(".sidebar__item").forEach(item => {
    if (item.title === state.route) {
      item.classList.add("sidebar__item--selected");
    } else {
      item.classList.remove("sidebar__item--selected");
    }
  });
};

// Toggle mobile menu
const toggleMobile = () => {
  const menu = document.querySelector(".sidebar");
  menuOpen ? menu.classList.remove("open") : menu.classList.add("open");
  menuOpen = !menuOpen;
  menuOpen ? window.scrollTo(0, 0) : null;
};

document.querySelectorAll(".sidebar__item").forEach(item => {
  item.addEventListener("click", () => getContent(item.title));
});
document
  .querySelector(".main-header__toggle-button")
  .addEventListener("click", toggleMobile);
// Initial render
getContent("history");
