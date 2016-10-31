"use strict";

// Dependencies
const getXmlDocument = require("./getXmlDocument");
const getTable = require("./getTable");

// Types
const Article = require("./types/Article");
const Author = require("./types/Author");

// Containers
let authors = [];
let articles = [];

// DOM -> Article objects
const doc = getXmlDocument("./data.xml");
articles = doc.find("//Article").map(domElement => {
  const articleTitleElement = domElement.get("ArticleTitle");
  const articleAuthorElements = domElement.find("AuthorList/Author");
  const article = new Article(articleTitleElement.text());
  articleAuthorElements.forEach(articleAuthorElement => {
    const author = new Author(
      articleAuthorElement.get("ForeName").text(),
      articleAuthorElement.get("LastName").text(),
      articleAuthorElement.get("Initials").text()
    );
    let existingAuthor = authors.find(existingAuthor => {
      return (
        existingAuthor.foreName === author.foreName &&
        existingAuthor.lastName === author.lastName &&
        existingAuthor.initials === author.initials
      );
    });
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