// Helper
const $ = (el) => document.querySelector(el);
const $a = (el) => document.querySelectorAll(el);

// Get the projects from the json file
fetch('./projects.json')
  .then((res) => res.json())
  .then((projects) => {
    window.projectList = projects.sort((a, b) => a.category.localeCompare(b.category));
    console.log(`💡 Rendering ${projects.length} projects.`);
    renderProjects(projects.map(Project));
  })
  .catch(console.error);

function renderProjects(projects) {
  projects.forEach((p) => {
    $('.project-list').appendChild(p);
    p.querySelector('.see-code').addEventListener('click', (e) => {
      window.open(
        'https://github.com/joaquimnet/experiments/tree/master/' + e.target.dataset.uri,
        '_blank',
      );
      e.stopPropagation();
    });
  });
}

function Project({ name, category, uri, featured = false, description }) {
  const LI = document.createElement('LI');
  LI.className = 'project';
  LI.innerHTML = `
  <div class="project-title${featured ? ' featured' : ''}">${name}</div>
  <div class="project-category">${category}</div>
  <div class="project-info">
    <span class="see-code" data-uri="${uri}">See Code 📃</span> ☕
  </div>
  `;
  LI.addEventListener('click', (e) => {
    window.open('./' + uri, '_blank');
  });
  return LI;
}

// Banner spin
$('.banner .logo').addEventListener('click', (e) => {
  e.target.classList.add('animation', 'spin');
  setTimeout(() => e.target.classList.remove('animation', 'spin'), 500);
});
