'use strict';
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

const titleClickHandler = function(event){
    console.log('Link was clicked!');
    console.log(event);
    event.preventDefault();

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const selectedArticle = clickedElement.getAttribute('href');
    console.log(selectedArticle);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const findArticle = document.querySelector(selectedArticle);
    console.log(findArticle);

    /* [DONE] add class 'active' to the correct article */

    findArticle.classList.add('active');
}
function generateTitleLinks(){

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector)
    let html = '';
        
    for(let article of articles){

    /* [DONE] get the article id */
        const articleId = article.getAttribute("id");

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML)

    /* insert link into titleList */
           
        html = html + linkHTML;
    }
    titleList.innerHTML = html;

    
}
generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links)
  
for(let link of links){
    link.addEventListener('click', titleClickHandler);
}