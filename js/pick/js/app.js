document
  .querySelectorAll('button')
  .forEach(el =>
    el.addEventListener('click', e => setTimeout(() => e.target.blur(), 200))
  );
