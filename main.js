// Register Projects
const projects = [];
const newProject = (name, type, folder) => projects.push({name,type,folder});
const pTypes = {G: "Game", A: "Application"};

newProject("Bets",pTypes.G, "bets");
newProject("Brick Break", pTypes.G, "brick-break");
newProject("Collector", pTypes.G, "collector");
newProject("Text Adventure", pTypes.G, "text-adventure");
newProject("Tiles", pTypes.G, "tiles");
newProject("Clock", pTypes.A, "clock");
newProject("Rainbow Writer", pTypes.A, "rainbow-writer");
newProject("Taskr", pTypes.A, "taskr");

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