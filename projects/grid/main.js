const links = document.querySelectorAll('li');
const brand = document.querySelector('.brand');
let currentArticle = 0;

const showArticle = (article) => {
  // remove animation classes on previous
  let oldArticle = document.querySelector('.article-' + currentArticle);
  oldArticle.classList.remove('animated');
  oldArticle.classList.remove('slideInLeft');
  oldArticle.classList.remove('fast');
  // display none on previous
  oldArticle.style.display = 'none';

  // add animation classes
  let newArticle = document.querySelector('.article-' + article);
  newArticle.classList.add('animated');
  newArticle.classList.add('slideInLeft');
  newArticle.classList.add('fast');
  // display block on new
  newArticle.style.display = 'block';

  currentArticle = article;
}

brand.addEventListener('click', () => showArticle(0));
links.forEach((link, i) => {
  link.addEventListener('click', () => showArticle(i+1));
});