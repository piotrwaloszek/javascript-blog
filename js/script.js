'use strict';
const titleClickHandler = function(event) {
  event.preventDefault();
  const clickedElement = this;
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const selectedArticle = clickedElement.getAttribute('href');
  const findArticle = document.querySelector(selectedArticle);

  findArticle.classList.add('active');
};

function generateTitleLinks() {
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector ='.post-tags .list';

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  const optArticleSelector = '.post',
    optArticleTagSelector ='.post-tags .list',
    articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles) {
    const taglist = article.querySelector(optArticleTagSelector);
    taglist.innerHTML = '';
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray){
      const tagHTML = '<li><a href="#tag-' + articleTagsArray + '"><span>' + articleTagsArray + '</span></a></li>';
      console.log(tagHTML);
      html = tagHTML;
    }
    taglist.innerHTML = html;
  }
}

generateTags();
