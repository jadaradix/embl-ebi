"use strict";

const Article = function Article (title) {
  this.title = title;
  this.authors = [];
};

Article.prototype.addAuthor = function addAuthor (forename, lastname, initials) {
  this.authors.push({
    forename,
    lastname,
    initials
  });
};

// Dependencies
const fs = require("fs");
const libxmljs = require("libxmljs");

// XML -> String
const xml = fs.readFileSync("./data.xml").toString();

// XML -> DOM
const doc = libxmljs.parseXml(xml);

// DOM -> Article objects
const articles = doc.find("//Article").map(domElement => {
  const articleTitleElement = domElement.get("ArticleTitle");
  const articleAuthorElements = domElement.find("AuthorList/Author");
  const article = new Article(articleTitleElement.text());
  articleAuthorElements.forEach(articleAuthorElement => {
    article.addAuthor(
      articleAuthorElement.get("ForeName").text(),
      articleAuthorElement.get("LastName").text(),
      articleAuthorElement.get("Initials").text()
    );
  });
  return article;
});
console.log(articles);