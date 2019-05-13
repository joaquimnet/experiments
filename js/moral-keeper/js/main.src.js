// DOM
const add = document.querySelector(".add");
const remove = document.querySelector(".remove");
const dom_score = document.querySelector(".score");

let score = 0;

const storageAvailable = (type) => {
  try {
    const storage = window[type];
    const x = "__storage_test__";

    storage.setItem(x, x);
    storage.removeItem(x);

    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      window[type].length !== 0
    );
  }
};

if (storageAvailable("localStorage") && localStorage.getItem("moral_score")) {
  score = JSON.parse(localStorage.getItem("moral_score"));
} else {
  score = 0;
}

const populateStorage = () => {
  localStorage.setItem("moral_score", JSON.stringify(score));
};

const increase = () => {
  score++;
  populateStorage();
  updateDOM();
};

const decrease = () => {
  score--;
  populateStorage();
  updateDOM();
};

const updateDOM = () => {
  if (score >= 0) {
    dom_score.innerHTML = `<span>${score}</span>`;
  } else {
    dom_score.innerHTML = `<span style="color:red">${score}</span>`;
  }
};

updateDOM();
add.addEventListener("click", increase);
remove.addEventListener("click", decrease);
