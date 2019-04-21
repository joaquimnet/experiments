const activities = {
  monday: ["Casual Node Practice", "Intensive React Practice"],
  tuesday: ["Intensive Node Practice"],
  wednesday: ["Intensive JS Practice"],
  thursday: ["Casual JS Practice", "Intensive CSS Practice"],
  friday: ["Casual Python Practice", "Casual Node Practice"],
  saturday: ["Cleanup Saturday", "Casual JS Practice", "Casual CSS Practice"],
  sunday: ["Free Sunday"]
}

const keywords = ["JS", "CSS", "Node", "Python", "React"];

const format = text => {
  let formated;
  keywords.forEach(word => {
    if (text.indexOf(word) != -1) {
      index = text.indexOf(word);
      let insert = `<span class="${word}">${word}</span>`.split("");
      formated = text.split("");
      formated.splice(index, word.length, ...insert);
      formated = formated.join("");
    }
  })

  return formated === undefined ? text : formated;
}

document.querySelectorAll("ul").forEach(list => {
  activities[list.id].sort().forEach(activity => {
    const li = document.createElement("LI");
    li.innerHTML = format(activity);
    console.log(activity);
    //li.appendChild(document.createTextNode(activity));
    li.className = "collection-item";
    list.appendChild(li);
  })
})