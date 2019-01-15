// Register Projects
const projects = [];
const newProject = (name, type, folder) => projects.push({name,type,folder});
const pTypes = {Lay: "Layout", Ani: "Animation", Art: "Artistic"};

newProject("Coffee",pTypes.Lay,"coffee");
newProject("Penguins",pTypes.Lay,"penguins");
newProject("Grid", pTypes.Lay, "grid");
newProject("Inventory", pTypes.Lay, "inventory");
newProject("Leaf", pTypes.Ani, "leaf");
newProject("Moving Squares", pTypes.Ani, "moving-squares");
newProject("Rotating Squares", pTypes.Ani, "rotating-squares");
newProject("Quotes", pTypes.Art, "quotes");
newProject("Reveal The Message", pTypes.Art, "reveal-the-message");

// DOM Selection
const links = document.querySelector("#links");

// Insert links
projects.forEach(project => {
  // Create the Anchor Tag
  const link = document.createElement("A");
  link.setAttribute("href", project.folder);
  link.className = "collection-item blue-grey-text";
  link.innerHTML = project.name;

  // Append badge
  const badge = document.createElement("SPAN");
  badge.className = "new badge blue lighten-2";
  badge.setAttribute("data-badge-caption", project.type);
  link.appendChild(badge);

  // Insert into the collection
  links.appendChild(link);
})