const $ = (el) => document.querySelector(el);
const $c = (el) => document.createElement(el);
const $a = (a, b) => a.appendChild(b);

const create = (name, category, uri) => {
  const aTag = $c('a');
  aTag.setAttribute('href', uri);

  const liTag = $c('li');
  aTag.textContent = name;

  const spanTag = $c('span');
  spanTag.textContent = category;

  $a(aTag, spanTag);
  $a(liTag, aTag);
  return liTag;
};

const clearList = () => {
  $('.projects').innerHTML = '';
};

function renderProjects(projects) {
  // Remove loading text
  if ($('.loading')) {
    $('.loading').remove();
  }

  clearList();

  // Render links
  projects.forEach((project) => {
    const { name, category, uri } = project;
    $('.projects').appendChild(create(name, category, uri));
  });

  console.log(`💡 Rendering ${projects.length} projects.`);
}

fetch('./projects.json')
  .then((res) => res.json())
  .then((projects) => {
    window.projectList = projects.sort((a, b) => a.category.localeCompare(b.category));
    renderProjects(projects);
  })
  .catch(console.error);
