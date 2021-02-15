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
}

function generateTitleLinks() {
    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(optArticleSelector)
    let html = '';
        
    for (let article of articles) {
        const articleId = article.getAttribute("id");
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