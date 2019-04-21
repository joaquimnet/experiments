const flexContainer = document.querySelector(".flex-container");
const input = document.querySelector("#player-response");

const addItem = e => {
  let div = document.createElement("DIV");
  let text = document.createTextNode(Math.random().toFixed(2) + " ahoy! " + e);
  div.appendChild(text);
  div.className = "animated fadeIn fastest";
  flexContainer.appendChild(div);
  flexContainer.scrollTop += 1000;
};

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    addItem(input.value);
    input.value = "";
    input.focus();
  }
})

class Adventure {}
