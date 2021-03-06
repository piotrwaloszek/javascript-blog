'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  //optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

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
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}
function calculateAuthorsParams(authors){
  let max = 0, min = 99999, authorsParams = {min, max};
  console.log(calculateTagsParams);

  for (let author in authors) {
    authorsParams.max = Math.max(authors[author], authorsParams.max);
    authorsParams.min = Math.min(authors[author], authorsParams.min);
  }
  return authorsParams;
}
function calculateTagClass(count,params){
  const normalizedCount = count - params.min,
    normalizedMax = params.max - params.min,
    percentage = normalizedCount / normalizedMax,
    classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}
function generateTags(){
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles){
    const taglist = article.querySelector(optArticleTagSelector);
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');

    for (let tag of articleTagsArray){
      const linkTagData = {tag: tag};
      const tagHTML = templates.articleTag(linkTagData);
      html = html + tagHTML;
      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    taglist.innerHTML = html;
  }
  const taglist = document.querySelector('.tags'),
    tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  const allTagsData = {tags: []};

  for (let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    //old HTML code: allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a></li>';
  }
  taglist.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
}
generateTags();

function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    tag = href.replace('#tag-', ''),
    activeTags = document.querySelectorAll('a.active[href^="#tag-"]');


  for (let activeTag of activeTags){
    activeTag.classList.remove('active');
  }

  const clickedTags = document.querySelectorAll('a[href="' + href + '"]');

  for (let clickedTag of clickedTags){
    clickedTag.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const tags = document.querySelectorAll('a[href^="#tag-"]');

  for (let tag of tags){
    tag.addEventListener('click',tagClickHandler);
  }
}
addClickListenersToTags();

function generateAuthors(){
  let allAuthors = {};
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles){
    const authorList = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author'),
      linkAuthorData = {author: articleAuthor},
      authorHTML = templates.articleAuthor(linkAuthorData);
    html = html + authorHTML;
    if(!allAuthors[articleAuthor]){
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    authorList.innerHTML = html;
  }
  const authorList = document.querySelector('.authors'),
    authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorParams:', authorsParams);
  let allAuthorsHTML = {allAuthors: []};

  for (let author in allAuthors){
    allAuthorsHTML.allAuthors.push({
      author: author,
      count: allAuthors[author]
    });
    //old HTML code allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + (allAuthors[author]) + ')</a></li>';
  }
  authorList.innerHTML = templates.authorCloudLink(allAuthorsHTML);
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this,
    href = clickedElement.getAttribute('href'),
    author = href.replace('#author-', ''),
    activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors){
    activeAuthor.classList.remove('active');
  }
  const clickedAuthors = document.querySelectorAll('a[href="' + href + '"]');

  for (let clickedAuthor of clickedAuthors){
    clickedAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  const authors = document.querySelectorAll('a[href^="#author-"]');

  for (let author of authors){
    author.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();
