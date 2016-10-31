"use strict";

// Configuration
const ARTICLES_PATH = "./data/articles.xml";

// Dependencies
const getXmlDocument = require("./getXmlDocument");
const getTable = require("./getTable");
const getExistingAuthor = require("./getExistingAuthor");

// Types
const Article = require("./types/Article");
const Author = require("./types/Author");

// Containers
let authors = [];
let articles = [];

// DOM -> Article objects
const doc = getXmlDocument(ARTICLES_PATH);
articles = doc.find("//Article").map(domElement => {
  const article = new Article();
  const articleTitleElement = domElement.get("ArticleTitle");
  const articleAuthorElements = domElement.find("AuthorList/Author");
  article.setTitle(articleTitleElement.text());
  articleAuthorElements.forEach(articleAuthorElement => {
    const author = new Author(
      articleAuthorElement.get("ForeName").text(),
      articleAuthorElement.get("LastName").text(),
      articleAuthorElement.get("Initials").text()
    );
    const existingAuthor = getExistingAuthor(authors, author);
    if (existingAuthor) {
      article.addAuthor(existingAuthor);
    } else {
      authors.push(author);
      article.addAuthor(author);
    }
  });
  return article;
});

const table = getTable(authors, articles);
console.log(table.toString());